<template>
    <div class="access-my-account">
        <div class="wrap">
            <PageTitle title="Create A New Account">
                {{ $t("createAccount.alreadyHaveOne") }}
                <router-link :to="{ name: 'access-my-account' }">
                    {{ $t("common.accessMyAccount") }}
                </router-link>
            </PageTitle>
            <AccountTileButtons @click="handleClickTiles" />
        </div>

        <FAQs />

        <ModalAccessByHardware
            v-model="state.modalCreateByHardwareState"
            @submit="handleCreateByHardwareSubmit"
        />

        <ModalCreateBySoftware
            v-model="state.modalCreateBySoftwareState.isOpen"
            @submit="handleCreateBySoftwareSubmit"
        />

        <ModalCreateByPhrase
            v-model="state.modalCreateByPhraseState.isOpen"
            @submit="handleCreateByPhraseSubmit"
        />

        <ModalCreateByKeystore
            v-model="state.modalCreateByKeystoreState"
            @submit="handleCreateByKeystoreSubmit"
        />

        <ModalDownloadKeystore
            v-model="state.modalDownloadKeystoreState"
            @continue="handleDownloadKeystoreContinue"
            @submit="handleDownloadKeystoreSubmit"
        />

        <ModalEnterAccountId
            v-model="state.modalEnterAccountIdState"
            @network="handleNetworkChange"
            @noAccount="handleDoesntHaveAccount"
            @submit="handleAccountIdSubmit"
        />

        <ModalRequestToCreateAccount
            v-model="state.modalRequestToCreateAccountState.isOpen"
            :public-key="state.publicKey"
            @hasAccount="handleHasAccount"
        />
    </div>
</template>

<script lang="ts">
import FAQs from "../components/FAQs.vue";
import AccountTileButtons from "../components/AccountTileButtons.vue";
import ModalAccessByHardware, { AccessHardwareOption } from "../components/ModalAccessByHardware.vue";
import PageTitle from "../components/PageTitle.vue";
import ModalCreateByPhrase from "../components/ModalCreateByPhrase.vue";
import ModalCreateByKeystore from "../components/ModalCreateByKeystore.vue";
import ModalDownloadKeystore from "../components/ModalDownloadKeystore.vue";
import ModalEnterAccountId, { ModalEnterAccountIdElement } from "../components/ModalEnterAccountId.vue";
import ModalRequestToCreateAccount from "../components/ModalRequestToCreateAccount.vue";
import {
    createComponent,
    reactive,
    ref,
    SetupContext,
    Ref
} from "@vue/composition-api";
import { CreateAccountDTO } from "../store/modules/wallet";
import ModalCreateBySoftware, { CreateSoftwareOption } from "../components/ModalCreateBySoftware.vue";
import SoftwareWallet from "../wallets/software/SoftwareWallet";
import { HederaErrorTuple, LedgerErrorTuple } from "../store/modules/errors";
import { LoginMethod } from "../wallets/Wallet";
import {
    Client,
    Ed25519PrivateKey,
    Ed25519PublicKey,
    Operator,
    Signer,
    AccountId
} from "@hashgraph/sdk";
import { getters, actions, mutations } from "../store";
import { NetworkSettings, NetworkName } from "../settings";

function getNetwork(): NetworkSettings {
    return getters.GET_NETWORK();
}

interface State {
    loginMethod: LoginMethod | null;
}

export default createComponent({
    components: {
        FAQs,
        AccountTileButtons,
        ModalAccessByHardware,
        ModalCreateBySoftware,
        PageTitle,
        ModalCreateByPhrase,
        ModalCreateByKeystore,
        ModalDownloadKeystore,
        ModalEnterAccountId,
        ModalRequestToCreateAccount
    },
    setup(props: object, context: SetupContext) {
        const state: CreateAccountDTO & State = reactive({
            wallet: null,
            privateKey: null,
            publicKey: null,
            keyFile: null,
            modalCreateByHardwareState: {
                isOpen: false,
                isBusy: false,
                optionSelected: "",
                disableButton: false
            },
            modalCreateBySoftwareState: { isOpen: false },
            modalCreateByKeystoreState: {
                isOpen: false,
                isBusy: false,
                passwordGeneratorState: {
                    password: "",
                    confirmationPassword: "",
                    passwordStrength: 0,
                    passwordSuggestion: ""
                }
            },
            modalCreateByPhraseState: { isOpen: false },
            modalKeystoreFilePasswordState: {
                isOpen: false,
                password: "",
                error: null,
                isBusy: false
            },
            modalDownloadKeystoreState: {
                isOpen: false,
                isBusy: false,
                downloadClicked: false
            },
            modalEnterAccountIdState: {
                failed: null,
                errorMessage: null,
                isOpen: false,
                isBusy: false,
                account: null,
                valid: false,
                networkValid: false,
                publicKey: null,
                nodeError: null,
                addressError: null
            },
            modalRequestToCreateAccountState: { isOpen: false },
            loginMethod: null
        });

        const keyStoreLink = ref<HTMLAnchorElement | null>(null);
        const modalEnterAccountId: Ref<ModalEnterAccountIdElement | null> = ref(null);

        function setPrivateKey(newPrivateKey: Ed25519PrivateKey): void {
            state.privateKey = newPrivateKey;
            state.publicKey = newPrivateKey.publicKey;
            state.modalEnterAccountIdState.publicKey = newPrivateKey.publicKey;
        }

        function openInterface(): void {
            context.root.$router.push({ name: "interface" });
        }

        async function constructOperator(account: AccountId): Promise<Operator> {
            if (state.wallet != null) {
                if (state.wallet.hasPrivateKey()) {
                    return {
                        account,
                        privateKey: await state.wallet!.getPrivateKey()
                    } as Operator;
                }
                return {
                    account,
                    publicKey: (await state.wallet!.getPublicKey()) as Ed25519PublicKey,
                    signer: state.wallet!.signTransaction.bind(state.wallet!) as Signer
                };
            }

            return {
                account: null as AccountId | null,
                privateKey: null as Ed25519PrivateKey | null
            } as Operator;
        }

        function handleNetworkChange(settings: NetworkSettings): void {
            if (
                getNetwork().name !== settings.name ||
                settings.name === NetworkName.CUSTOM
            ) {
                mutations.CHANGE_NETWORK(settings);
            }
        }

        async function constructClient(account: AccountId): Promise<Client | undefined> {
            let client: Client | undefined;

            const {
                Client,
                CryptoTransferTransaction,
                HederaError,
                ResponseCodeEnum
            } = await import("@hashgraph/sdk");

            try {
                const network: NetworkSettings = await getNetwork();
                const operator: Operator = await constructOperator(account);

                client = new Client({
                    nodes: {
                        [ network.proxy || network.address ]: {
                            shard: network.node.shard,
                            realm: network.node.realm,
                            account: network.node.node
                        }
                    },
                    operator
                });

                const recipient: AccountId = {
                    realm: 0,
                    shard: 0,
                    // If the account requested is 3, use a different account as the recipient to avoid an
                    // ACCOUNT_REPEATED_IN_ACCOUNT_AMOUNTS error
                    account: account.account === 3 ? 4 : 3
                };

                await new CryptoTransferTransaction(client)
                    .addSender(account, 0)
                    .addRecipient(recipient, 0)
                    .setTransactionFee(1)
                    .build()
                    .executeForReceipt();
            } catch (error) {
                if (error instanceof HederaError) {
                    // Transaction was valid except for deliberately insufficient fee,
                    // meaning that the account matches the key and that nothing went wrong
                    if (error.code === ResponseCodeEnum.INSUFFICIENT_TX_FEE) {
                        return client;
                    }
                }

                // Else, throw the error, failed to make a client (failed to login)
                throw error;
            }
        }

        async function login(account: AccountId): Promise<void> {
            const client: Client | undefined = await constructClient(account);

            if (state.wallet != null && client != null) {
                await actions.logIn({
                    account,
                    wallet: state.wallet,
                    client
                });
            }
        }

        function handleClickTiles(which: string): void {
            if (which === "hardware") {
                state.modalCreateByHardwareState.isOpen = true;
            } else if (which === "software") {
                state.modalCreateBySoftwareState.isOpen = true;
            }
        }

        function handleCreateBySoftwareSubmit(which: CreateSoftwareOption): void {
            state.modalCreateBySoftwareState.isOpen = false;

            setTimeout(() => {
                if (which === CreateSoftwareOption.File) {
                    state.loginMethod = LoginMethod.KeyStore;
                    state.modalCreateByKeystoreState.isOpen = true;
                } else if (which === CreateSoftwareOption.Phrase) {
                    state.loginMethod = LoginMethod.Mnemonic;
                    state.modalCreateByPhraseState.isOpen = true;
                }
            }, 125);
        }

        async function handleCreateByHardwareSubmit(which: AccessHardwareOption): Promise<void> {
            switch (which) {
                case AccessHardwareOption.Ledger:
                    state.loginMethod = LoginMethod.Ledger;
                    try {
                        const { Ledger } = await import("../wallets/hardware/Ledger" /* webpackChunkName: "hardware" */
                        );

                        state.modalCreateByHardwareState.isBusy = true;
                        state.wallet = new Ledger();
                        state.publicKey = (await state.wallet.getPublicKey()) as Ed25519PublicKey;
                        state.modalEnterAccountIdState.publicKey =
                            state.publicKey;
                        state.modalCreateByHardwareState.isOpen = false;
                        state.modalRequestToCreateAccountState.isOpen = true;
                    } catch (error) {
                        if (
                            error.name === "TransportStatusError" &&
                            state.loginMethod === LoginMethod.Ledger
                        ) {
                            await actions.handleLedgerError({
                                error,
                                showAlert: true
                            });
                        } else {
                            throw error;
                        }
                    } finally {
                        state.modalCreateByHardwareState.isBusy = false;
                    }
                    break;
                default:
                    state.wallet = null;
                    break;
            }
        }

        async function handleCreateByKeystoreSubmit(): Promise<void> {
            state.modalCreateByKeystoreState.isOpen = false;

            setTimeout(() => {
                state.modalDownloadKeystoreState.isOpen = true;
            }, 125);
            try {
                const { Ed25519PrivateKey } = await import("@hashgraph/sdk");

                const privateKey = await Ed25519PrivateKey.generate();

                state.keyFile = await privateKey.createKeystore(state.modalCreateByKeystoreState.passwordGeneratorState
                    .password);

                setPrivateKey(privateKey);

                state.modalDownloadKeystoreState.isBusy = false;

                const keyStoreBlob = new Blob([ state.keyFile.buffer as Uint8Array ]);

                const keyStoreUrl = URL.createObjectURL(keyStoreBlob);

                keyStoreLink.value = document.createElement("a") as HTMLAnchorElement;
                keyStoreLink.value.href = keyStoreUrl;
                keyStoreLink.value.download =
                    `keystore-${new Date().toISOString()}`;
            } catch (error) {
                await actions.alert({
                    level: "error",
                    message: context.root
                        .$t("createAccount.unableToDownload")
                        .toString()
                });
            }
        }

        function handleDownloadKeystoreSubmit(): void {
            context.root.$el.append(keyStoreLink.value as Node);
            if (keyStoreLink.value == null || state.privateKey == null) {
                return;
            }

            keyStoreLink.value.click();
            context.root.$el.removeChild(keyStoreLink.value as HTMLAnchorElement);
        }

        function handleDownloadKeystoreContinue(): void {
            state.modalRequestToCreateAccountState.isOpen = true;
            setTimeout(
                () => state.modalDownloadKeystoreState.isOpen = false,
                125
            );
        }

        function handleCreateByPhraseSubmit(newPrivateKey: Ed25519PrivateKey): void {
            state.modalCreateByPhraseState.isOpen = false;

            setPrivateKey(newPrivateKey);

            setTimeout(() => {
                state.modalRequestToCreateAccountState.isOpen = true;
            }, 125);
        }

        async function handleAccountIdSubmit(account: AccountId): Promise<void> {
            state.modalEnterAccountIdState.isBusy = true;

            if (state.loginMethod == null) {
                state.modalEnterAccountIdState.isBusy = false;
                throw new Error(context.root.$t("common.error.illegalState").toString());
            }

            if (state.wallet == null) {
                if (state.privateKey != null) {
                    state.wallet = new SoftwareWallet(
                        state.loginMethod,
                        state.privateKey as Ed25519PrivateKey,
                        state.publicKey as Ed25519PublicKey
                    );
                }
            }

            try {
                await login(account);
                state.modalEnterAccountIdState.isOpen = false;
                openInterface();
            } catch (error) {
                const HederaError = (await import("@hashgraph/sdk"))
                    .HederaError;
                if (error instanceof HederaError) {
                    const result: HederaErrorTuple = await actions.handleHederaError({ error, showAlert: false });

                    // set input error to error message
                    state.modalEnterAccountIdState.errorMessage =
                        result.message;

                    // In this case, the error should pop up
                    if (
                        error.message.includes(context.root.$t("common.error.unhandled").toString())
                    ) {
                        throw error;
                    }
                } else if (
                    error.name === "TransportStatusError" &&
                    state.loginMethod === LoginMethod.Ledger
                ) {
                    const result: LedgerErrorTuple = await actions.handleLedgerError({ error, showAlert: false });

                    state.modalEnterAccountIdState.errorMessage =
                        result.message;

                    // But don't throw device errors
                } else if (
                    error.message === "Response closed without headers" ||
                    error.message === "Response closed without grpc-status" ||
                    error.message === "404 (Not Found)" ||
                    error.stack.includes("grpc")
                ) {
                    const message = context.root
                        .$t("network.connectionFailed")
                        .toString();
                    (modalEnterAccountId.value as ModalEnterAccountIdElement).setAddressError(message);
                }
            } finally {
                state.modalEnterAccountIdState.isBusy = false;
            }
        }

        function handleDoesntHaveAccount(): void {
            state.modalEnterAccountIdState.isOpen = false;
            state.modalRequestToCreateAccountState.isOpen = true;
        }

        function handleHasAccount(): void {
            state.modalRequestToCreateAccountState.isOpen = false;
            state.modalEnterAccountIdState.isOpen = true;
        }

        return {
            state,
            handleClickTiles,
            handleCreateByHardwareSubmit,
            handleCreateBySoftwareSubmit,
            handleCreateByKeystoreSubmit,
            handleDownloadKeystoreSubmit,
            handleCreateByPhraseSubmit,
            handleAccountIdSubmit,
            handleHasAccount,
            handleDoesntHaveAccount,
            handleDownloadKeystoreContinue,
            handleNetworkChange
        };
    }
});
</script>

<style lang="postcss" scoped>
a {
    color: var(--color-melbourne-cup);
    cursor: pointer;
    text-decoration: none;
}

a:hover,
a:focus {
    text-decoration: underline;
}

.access-my-account {
    display: flex;
    flex-direction: column;
}

.wrap {
    align-items: center;
    display: flex;
    flex-direction: column;
    padding: 80px 0;

    @media (max-width: 600px) {
        padding: 20px 0;
    }
}
</style>
