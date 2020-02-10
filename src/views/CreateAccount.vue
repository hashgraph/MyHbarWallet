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
import { createComponent, reactive, ref, Ref, SetupContext } from "@vue/composition-api";

import FAQs from "../components/FAQs.vue";
import AccountTileButtons from "../components/AccountTileButtons.vue";
import ModalAccessByHardware, { AccessHardwareOption } from "../components/ModalAccessByHardware.vue";
import PageTitle from "../components/PageTitle.vue";
import ModalCreateByPhrase from "../components/ModalCreateByPhrase.vue";
import ModalCreateByKeystore from "../components/ModalCreateByKeystore.vue";
import ModalDownloadKeystore from "../components/ModalDownloadKeystore.vue";
import ModalEnterAccountId, { ModalEnterAccountIdElement } from "../components/ModalEnterAccountId.vue";
import ModalRequestToCreateAccount from "../components/ModalRequestToCreateAccount.vue";
import { CreateAccountDTO } from "../store/modules/wallet";
import ModalCreateBySoftware, { CreateSoftwareOption } from "../components/ModalCreateBySoftware.vue";
import SoftwareWallet from "../wallets/software/SoftwareWallet";
import { HederaErrorTuple, LedgerErrorTuple } from "../store/modules/errors";
import { LoginMethod } from "../wallets/Wallet";
import { actions, getters, mutations } from "../store";
import { NetworkName, NetworkSettings } from "../settings";

function getNetwork(): NetworkSettings {
    return getters.getNetwork();
}

interface State {
    loginMethod: LoginMethod | null;
}

export default createComponent({
    props: {}, // ts hack
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
    setup(props, context: SetupContext) {
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

        // eslint-disable-next-line sonarjs/no-duplicate-string
        function setPrivateKey(newPrivateKey: import("@hashgraph/sdk").Ed25519PrivateKey): void {
            state.privateKey = newPrivateKey;
            state.publicKey = newPrivateKey.publicKey;
            state.modalEnterAccountIdState.publicKey = newPrivateKey.publicKey;
        }

        function openInterface(): void {
            context.root.$router.push({ name: "interface" });
        }

        // eslint-disable-next-line sonarjs/no-duplicate-string
        async function constructOperator(account: import("@hashgraph/sdk").AccountId): Promise<import("@hashgraph/sdk/lib/BaseClient").Operator> {
            if (state.wallet != null) {
                if (state.wallet.hasPrivateKey()) {
                    return {
                        account,
                        privateKey: await state.wallet!.getPrivateKey()
                    } as import("@hashgraph/sdk/lib/BaseClient").Operator;
                }
                return {
                    account,
                    publicKey: (await state.wallet!.getPublicKey()) as import("@hashgraph/sdk").Ed25519PublicKey,
                    signer: state.wallet!.signTransaction.bind(state.wallet!) as import("@hashgraph/sdk").TransactionSigner
                };
            }

            return {
                account: null as import("@hashgraph/sdk").AccountId | null,
                privateKey: null as
                        | import("@hashgraph/sdk").Ed25519PrivateKey
                        | null
            } as import("@hashgraph/sdk/lib/BaseClient").Operator;
        }

        function handleNetworkChange(settings: NetworkSettings): void {
            if (
                getNetwork().name !== settings.name ||
                    settings.name === NetworkName.CUSTOM
            ) {
                mutations.changeNetwork(settings);
            }
        }

        async function constructClient(account: import("@hashgraph/sdk").AccountId): Promise<import("@hashgraph/sdk").Client | undefined | null> {
            let client: import("@hashgraph/sdk").Client | undefined;

            const {
                Client,
                CryptoTransferTransaction,
                HederaError,
                Status
            } = await import("@hashgraph/sdk");

            try {
                const network: NetworkSettings = await getNetwork();
                const operator: import("@hashgraph/sdk/lib/BaseClient").Operator = await constructOperator(account);

                client = new Client({
                    network: {
                        [ network.proxy || network.address ]: {
                            shard: network.node.shard,
                            realm: network.node.realm,
                            account: network.node.node
                        }
                    },
                    operator
                });

                (
                    await new CryptoTransferTransaction()
                        .addSender(account, 0)
                        .setMaxTransactionFee(1)
                        .build(client)
                        .execute(client)
                ).getReceipt(client);
            } catch (error) {
                // Constructed a Transfer Transaction with
                // one account (sender), 1 tinybar fee, 0 tinybar value
                // which will fail with an account error if the key is
                // not associated with the account, and with insufficient
                // transaction fee otherwise
                if (error instanceof HederaError && error.code === Status.InsufficientTxFee.code) {
                    return client;
                }

                throw error;
            }

            return null;
        }

        async function login(account: import("@hashgraph/sdk").AccountId): Promise<void> {
            const client: import("@hashgraph/sdk").Client | undefined | null = await constructClient(account);

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
            // eslint-disable-next-line sonarjs/no-small-switch
            switch (which) {
                case AccessHardwareOption.Ledger:
                    state.loginMethod = LoginMethod.Ledger;
                    try {
                        const { Ledger } = await import("../wallets/hardware/Ledger" /* webpackChunkName: "hardware" */);

                        state.modalCreateByHardwareState.isBusy = true;
                        state.wallet = new Ledger();
                        state.publicKey = (await state.wallet.getPublicKey()) as import("@hashgraph/sdk").Ed25519PublicKey;
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

                // eslint-disable-next-line max-len
                state.keyFile = await privateKey.toKeystore(state.modalCreateByKeystoreState.passwordGeneratorState
                    .password);

                setPrivateKey(privateKey);

                state.modalDownloadKeystoreState.isBusy = false;

                if (state.keyFile != null) {
                    const keyStoreBlob = new Blob([ state.keyFile.buffer as Uint8Array ]);

                    const keyStoreUrl = URL.createObjectURL(keyStoreBlob);

                    keyStoreLink.value = document.createElement("a") as HTMLAnchorElement;
                    keyStoreLink.value.href = keyStoreUrl;
                    keyStoreLink.value.download = `keystore-${new Date().toISOString()}`;
                } else {
                    throw new Error(context.root.$t("common.error.noKeystore").toString());
                }
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
                (): void => {
                    state.modalDownloadKeystoreState.isOpen = false;
                },
                125
            );
        }

        function handleCreateByPhraseSubmit(newPrivateKey: import("@hashgraph/sdk").Ed25519PrivateKey): void {
            state.modalCreateByPhraseState.isOpen = false;

            setPrivateKey(newPrivateKey);

            setTimeout(() => {
                state.modalRequestToCreateAccountState.isOpen = true;
            }, 125);
        }

        async function handleAccountIdSubmit(account: import("@hashgraph/sdk").AccountId): Promise<void> {
            state.modalEnterAccountIdState.isBusy = true;

            if (state.loginMethod == null) {
                state.modalEnterAccountIdState.isBusy = false;
                throw new Error(context.root.$t("common.error.illegalState").toString());
            }

            if (state.wallet == null && state.privateKey != null) {
                state.wallet = new SoftwareWallet(
                    state.loginMethod,
                    state.privateKey as import("@hashgraph/sdk").Ed25519PrivateKey,
                    state.publicKey as import("@hashgraph/sdk").Ed25519PublicKey
                );
            }

            try {
                await login(account);
                state.modalEnterAccountIdState.isOpen = false;
                openInterface();
            } catch (error) {
                const HederaError = (await import("@hashgraph/sdk"))
                    .HederaError;
                if (error instanceof HederaError) {
                    // eslint-disable-next-line max-len
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
                    // eslint-disable-next-line max-len
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
                    // eslint-disable-next-line max-len
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
