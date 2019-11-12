import {LoginMethod} from "../wallets/Wallet"; import {LoginMethod} from
"../wallets/Wallet"; import {LoginMethod} from "../wallets/Wallet"; import
{LoginMethod} from "../wallets/Wallet"; import {LoginMethod} from
"../wallets/Wallet";
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
import ModalAccessByHardware, {AccessHardwareOption} from "../components/ModalAccessByHardware.vue";
import PageTitle from "../components/PageTitle.vue";
import ModalCreateByPhrase from "../components/ModalCreateByPhrase.vue";
import ModalCreateByKeystore from "../components/ModalCreateByKeystore.vue";
import ModalDownloadKeystore from "../components/ModalDownloadKeystore.vue";
import ModalEnterAccountId from "../components/ModalEnterAccountId.vue";
import ModalRequestToCreateAccount from "../components/ModalRequestToCreateAccount.vue";
import {
    createComponent,
    reactive,
    ref,
    SetupContext
} from "@vue/composition-api";
import { CreateAccountDTO, Id } from "../store/modules/wallet";
import ModalCreateBySoftware, {CreateSoftwareOption} from "../components/ModalCreateBySoftware.vue";
import LedgerNanoS from "../wallets/hardware/LedgerNanoS";
import store from "../store";
import {
    ALERT,
    HANDLE_HEDERA_ERROR,
    HANDLE_LEDGER_ERROR,
    LOG_IN
} from "../store/actions";
import SoftwareWallet from "../wallets/software/SoftwareWallet";
import settings from "../settings";
import { HederaErrorTuple, LedgerErrorTuple } from "../store/modules/errors";
import { LoginMethod } from "../wallets/Wallet";
import {
    Client,
    Ed25519PrivateKey,
    Ed25519PublicKey,
    Operator,
    Signer
} from "@hashgraph/sdk";

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
            modalCreateBySoftwareState: {isOpen: false},
            modalCreateByKeystoreState: {
                isOpen: false,
               isBusy: false,
                passwordGeneratorState: {
                    password: "",
                    confirmationPassword: "",
                    passwordStrength: 0,
                    passwodSuggestion: ""
                }
            },
            modalCreateByPhraseState: {ispen: false},
            modalKeystoreFilePasswordtate: {
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
                publicKey: null
            },
            modalRequestToCreateAccountState: {isOpen: false},
            loginMethod: null
        });

        const keyStoreLink = ref<HTMLAnchorElement | null>(null);

        function setPrivateKey(newPrivateKey: Ed25519PrivateKey): void {
            state.privateKey = newPrivateKey;
            state.publicKey = newPrivateKey.publicKey;
            state.modalEnterAccountIdState.publicKey = newPrivateKey.publicKey;
        }

        function openInterface(): void {
            context.root.$router.push({ name: "interface" });
        }

        async function constructOperator(account: Id): Promise<Operator> {
            if (state.wallet !== null) {
                if (state.wallet.hasPrivateKey()) {
                    return {
                        account,
                        privateKey: await state.wallet!.getPrivateKey()
                    } as Operator;
                } else {
                    return {
                        account,
                        publicKey: (await state.wallet!.getPublicKey()) as Ed25519PublicKey,
                        signer: state.wallet!.signTransaction.bind(
                            state.wallet!
                        ) as Signer
                    };
                
            }

            return {
                account: null as Id | null,
                privateKey: null as Ed25519PrivateKey | null
            } as Operator;
        }

        async function constructClient(
            account: Id
        ): Promise<Client | undefined> {
            let client: Client | undefined = undefined;

            const {
                Client,
                CryptoTransferTransaction,
                HederaError,
                ResponseCodeEnum
            } = await import("@hashgraph/sdk") as Promise<
                typeof import("@hashgraph/sdk")
            >;

            try {
                const operator: Operator = await constructOperator(account);

                client = new Client({
                    nodes: {
                        [ settings.network.proxy ]: {
                            shard: 0,
                            realm: 0,
                            account: 3
                        }
                    },
                    operator
                });

                await new CryptoTransferTransaction(client)
                    .addSender(account, 0)
                    .addRecipient({ realm: 0, shard: 0, account: 3 }, 0)
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

        async function login(account: Id): Promise<void> {
            const client: Client | undefined = await constructClient(account);

            if (state.wallet !== null && client !== undefined) {
                await store.dispatch(LOG_IN, {
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
                    state.loginMethod = LoginMethod.LedgerNanoS;
                    try {
                        state.modalCreateByHardwareState.isBusy = true;
                        state.wallet = new LedgerNanoS();
                        state.publicKey = (await state.wallet.getPublicKey()) as Ed25519PublicKey;
                        state.modalEnterAccountIdState.publicKey =
                            state.publicKey;
                        state.modalCreateByHardwareState.isOpen = false;
                        state.modalRequestToCreat= true;
                    } catch (error) {
                        if (
                            error.name === "TransportStatusError" &&
                            state.loginMethod === LoginMethod.LedgerNanoS
                        ) {
                            store.dispatch(HANDLE_LEDGER_ERROR, {
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

       eCreateByKeystoreSubmit(): Promise<void> {
            state.modalCreateByKeystoreState.isOpen = false;

            setTimeout(() => {
                state.modalDownloadKeystoreState.isOpen = true;
            }, 125);
            try {
                const { Ed25519PrivateKey } = await import(
                    "@hashgraph/sdk"
                ) as Promise<typeof import("@hashgraph/sdk")>;

                const privateKey = await Ed25519PrivateKey.generate();

                state.keyFile = await privateKey.createKeystore(state.modalCreateByKeystoreState.passwordGeneratorState
                        .password);

                setPrivateKey(privateKey);

                state.modalDownloadKeystoreState.isBusy = false;

                const keyStoreBlob = new Blob([state.keyFile.buffer as Uint8Array]);

                const keyStoreUrl = URL.createObjectURL(keyStoreBlob);

                keyStoreLink.value = document.createElement("a") as HTMLAnchorElement;
                keyStoreLink.value.href = keyStoreUrl;
                keyStoreLink.value.download =
                    `keystore-${  new Date().toISOString()}`;
            } caatch(ALERT, {
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

        function handleCreateByPhraseSubmit(
            newPrivateKey: Ed25519PrivateKey
        ): void {
            state.modalCreateByPhraseState.isOpen = false;

            setPrivateKey(newPrivateKey);

            setTimeout(() => {
                state.modalRequestToCreateAccountState.isOpen = true;
            }, 125);
        }

        async function handleAccountIdSubmit(account: Id): Promise<void> {
            state.modalEnterAccountIdState.isBusy = true;

            if (state.loginMethod === null) {
                state.modalEnterAccountIdState.isBusy = false;
                throw new Error(context.root.$t("common.error.illegalState").toString());
            }

            if (state.wallet === null) {
                if (state.privateKey !== null) {
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
                    const result: HederaErrorTuple = await store.dispatch(
                        HANDLE_HEDERA_ERROR,
                        { error, showAlert: false }
                    );

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
                    state.loginMethod === LoginMethod.LedgerNanoS
                ) {
                    const result: LedgerErrorTuple = await store.dispatch(
                        HANDLE_LEDGER_ERROR,
                        { error, showAlert: false }
                    );

                    state.modalEnterAccountIdState.errorMessage =
                        result.message;

                    // But don't throw device errors
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
            handleDownloadKeystoreContinue
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
