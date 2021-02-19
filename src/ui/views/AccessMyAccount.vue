<template>
    <div class="access-my-account">
        <div class="wrap">
            <PageTitle :title="$t('common.accessMyAccount')">
                {{ $t("accessMyAccount.dontHaveAnAccount") }}
                <router-link :to="{ name: 'create-account' }">
                    {{ $t("accessMyAccount.createANewAccount") }}
                </router-link>
            </PageTitle>
            <AccountTileButtons @click="handleClickTiles" />
        </div>

        <FAQs />

        <ModalAccessByPrivateKey
            v-model="state.modalAccessByPrivateKeyState"
            @submit="handleAccessByPrivateKeySubmit"
        />

        <ModalAccessByPhrase
            v-model="state.modalAccessByPhraseState"
            @submit="handleAccessByPhraseSubmit"
        />

        <ModalAccessByHardware
            v-model="state.modalAccessByHardwareState"
            @submit="handleAccessByHardwareSubmit"
        />

        <ModalAccessBySoftware
            v-model="state.modalAccessBySoftwareState.isOpen"
            @submit="handleAccessBySoftwareSubmit"
        />

        <ModalKeystoreFilePassword
            v-model="state.modalKeystoreFilePasswordState"
            @submit="handleAccessByKeystoreSubmit"
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

        <input
            v-show="false"
            id="file-upload"
            ref="keystoreFile"
            type="file"
            @change="loadKeystore"
        >
    </div>
</template>

<script lang="ts">
import Vue from "vue";
import { defineComponent, reactive, ref, Ref } from "@vue/composition-api";

import FAQs from "../components/FAQs.vue";
import AccountTileButtons from "../components/AccountTileButtons.vue";
import ModalAccessByHardware, { AccessHardwareOption } from "../components/ModalAccessByHardware.vue";
import ModalAccessBySoftware, { AccessSoftwareOption } from "../components/ModalAccessBySoftware.vue";
import ModalAccessByPhrase, { WordCount } from "../components/ModalAccessByPhrase.vue";
import ModalAccessByPrivateKey from "../components/ModalAccessByPrivateKey.vue";
import PageTitle from "../components/PageTitle.vue";
import ModalKeystoreFilePassword from "../components/ModalKeystoreFilePassword.vue";
import ModalEnterAccountId from "../components/ModalEnterAccountId.vue";
import ModalRequestToCreateAccount from "../components/ModalRequestToCreateAccount.vue";
import { actions, getters, mutations } from "../store";
import SoftwareWallet from "../../domain/wallets/software";
import Wallet, { LoginMethod } from "../../domain/wallets/wallet";
import { AccessAccountDTO } from "../../dto/access";
import { NetworkName, NetworkSettings } from "../../domain/network";
import { HederaStatusErrorTuple, LedgerErrorTuple } from "../store/modules/errors";

declare const MHW_ENV: string;

interface State {
    loginMethod: LoginMethod | null;
    wallet: Wallet | null;
}

export default defineComponent({
    components: {
        FAQs,
        AccountTileButtons,
        ModalAccessByHardware,
        ModalAccessBySoftware,
        ModalAccessByPhrase,
        ModalAccessByPrivateKey,
        PageTitle,
        ModalKeystoreFilePassword,
        ModalEnterAccountId,
        ModalRequestToCreateAccount
    },
    props: {},
    setup(_, context) {
        const state: AccessAccountDTO & State = reactive({
            keyFile: null,
            possibleKeys: [], // Private Keys
            modalAccessByHardwareState: {
                isOpen: false,
                isBusy: false,
                optionSelected: "",
                disableButton: true
            },
            modalAccessBySoftwareState: { isOpen: false },
            modalAccessByPhraseState: {
                isOpen: false,
                isBusy: false,
                password: "",
                wordToggle: false,
                wordCount: WordCount.TwentyFour,
                words: [],
                isValid: true
            },
            modalKeystoreFilePasswordState: {
                isOpen: false,
                password: "",
                error: null,
                isBusy: false
            },
            modalAccessByPrivateKeyState: {
                isOpen: false,
                rawPrivateKey: "",
                isBusy: false
            },
            modalEnterAccountIdState: {
                errorMessage: null,
                isOpen: false,
                isBusy: false,
                account: null,
                possiblePublicKeys: [], // Public Keys
                valid: false,
                networkValid: false
            },
            modalRequestToCreateAccountState: { isOpen: false },
            loginMethod: null,
            wallet: null
        });

        type SeedInfo = import("@hashgraph/sdk").Mnemonic | import("@hashgraph/sdk").Ed25519PrivateKey;
        async function addKeysFromSeed(info: SeedInfo, password?: string): Promise<void> {
            const { Ed25519PrivateKey, Mnemonic } = await import(/* webpackChunkName: "hashgraph" */ "@hashgraph/sdk");

            if (info instanceof Mnemonic) {
                // Mnemonic
                if (info.words.length === WordCount.TwentyFour) {
                    // Add Legacy Derivation Scheme Keys
                    const legacyKey = await info.toLegacyPrivateKey();
                    state.possibleKeys.push(legacyKey);
                    state.modalEnterAccountIdState.possiblePublicKeys.push(legacyKey.publicKey);

                    const derivedLegacyKey = await legacyKey.legacyDerive(0);
                    state.possibleKeys.push(derivedLegacyKey);
                    state.modalEnterAccountIdState.possiblePublicKeys.push(derivedLegacyKey.publicKey);
                }

                if (password == null) password = "";

                const key = await info.toPrivateKey(password);
                state.possibleKeys.push(key);
                state.modalEnterAccountIdState.possiblePublicKeys.push(key.publicKey);

                if (key.supportsDerivation) {
                    const derivedKey = await key.derive2(0);
                    state.possibleKeys.push(derivedKey);
                    state.modalEnterAccountIdState.possiblePublicKeys.push(derivedKey.publicKey);
                }
            } else if (info instanceof Ed25519PrivateKey) {
                state.possibleKeys.push(info);
                state.modalEnterAccountIdState.possiblePublicKeys.push(info.publicKey);
            }
        }

        async function resetState(): Promise<void> {
            state.possibleKeys = [];
            state.modalEnterAccountIdState.possiblePublicKeys = [];
            state.modalEnterAccountIdState.account = null;
            state.modalAccessByPhraseState.words = [];
            state.modalAccessByPhraseState.password = "";

            state.wallet = null;
            state.loginMethod = null;
            state.keyFile = null;

            state.modalAccessByPhraseState.isBusy = false;
            state.modalKeystoreFilePasswordState.isBusy = false;
            state.modalAccessByPrivateKeyState.isBusy = false;
            state.modalEnterAccountIdState.isBusy = false;
        }

        const keystoreFile: Ref<HTMLInputElement | null> = ref(null);

        async function loadKeystore(event: Event): Promise<void> {
            const target = event.target as HTMLInputElement;

            if (target.files == null) {
                return;
            }

            const keystoreFile = target.files[ 0 ];

            // eslint-disable-next-line compat/compat
            const keyStoreArrayBuff = await new Promise<ArrayBuffer>((resolve, reject) => {
                const reader = new FileReader();

                reader.addEventListener("error", reject);
                reader.addEventListener("loadend", (): void => {
                    resolve(reader.result as ArrayBuffer);
                });

                reader.readAsArrayBuffer(keystoreFile);
            });

            // click will not fire again unless cleared
            target.value = "";

            state.keyFile = new Uint8Array(keyStoreArrayBuff);
            state.loginMethod = LoginMethod.KeyStore;
            Vue.nextTick(() => {
                state.modalKeystoreFilePasswordState.isOpen = true;
            });
        }

        function handleNetworkChange(settings: NetworkSettings): void {
            if (
                getters.currentNetwork().name !== settings.name ||
                settings.name === NetworkName.CUSTOM
            ) {
                mutations.setCurrentNetwork(settings);
            }
        }

        async function handleClickTiles(which: string): Promise<void> {
            await resetState();

            if (which === "hardware") {
                Vue.nextTick(() => {
                    state.modalAccessByHardwareState.isOpen = true;
                });
            } else if (which === "software") {
                Vue.nextTick(() => {
                    state.modalAccessBySoftwareState.isOpen = true;
                });
            }
        }

        async function handleAccessBySoftwareSubmit(which: AccessSoftwareOption): Promise<void> {
            Vue.nextTick(() => {
                state.modalAccessBySoftwareState.isOpen = false;
            });

            if (which === AccessSoftwareOption.File) {
                state.loginMethod = LoginMethod.KeyStore;
                if (MHW_ENV !== "test") { // try not to do this in test env
                    Vue.nextTick(() => {
                        if (keystoreFile.value != null) keystoreFile.value.click();
                    }); // triggers loadKeystore via hidden input @click
                }
            } else if (which === AccessSoftwareOption.Phrase) {
                state.loginMethod = LoginMethod.Mnemonic;
                // eslint-disable-next-line no-return-assign
                Vue.nextTick(() => state.modalAccessByPhraseState.isOpen = true);
            } else if (which === AccessSoftwareOption.Key) {
                state.loginMethod = LoginMethod.PrivateKey;
                // eslint-disable-next-line no-return-assign
                Vue.nextTick(() => state.modalAccessByPrivateKeyState.isOpen = true);
            }
        }

        async function handleAccessByHardwareSubmit(which: AccessHardwareOption): Promise<void> {
            switch (which) {
                case AccessHardwareOption.Ledger:
                    state.modalAccessByHardwareState.isBusy = true;

                    try {
                        const { Ledger } = await import(/* webpackChunkName: "hardware" */ "../../domain/wallets/ledger");
                        state.wallet = new Ledger();
                        state.loginMethod = LoginMethod.Ledger;

                        const publicKey = (await state.wallet!.getPublicKey()) as import("@hashgraph/sdk").Ed25519PublicKey;
                        state.modalEnterAccountIdState.possiblePublicKeys.push(publicKey);

                        Vue.nextTick(() => {
                            state.modalAccessByHardwareState.isOpen = false;
                            state.modalEnterAccountIdState.isOpen = true;
                        });
                    } catch (error) {
                        state.wallet = null;
                        state.loginMethod = null;

                        if (
                            error.name === "TransportStatusError" ||
                            error.name === "TransportOpenUserCancelled"
                        ) {
                            await actions.handleLedgerError({
                                error,
                                showAlert: true
                            });
                        } else {
                            throw error;
                        }
                    } finally {
                        state.modalAccessByHardwareState.isBusy = false;
                    }
                    break;
                default:
                    state.wallet = null;
                    state.loginMethod = null;
                    break;
            }
        }

        async function handleAccessByKeystoreSubmit(): Promise<void> {
            const pwState = state.modalKeystoreFilePasswordState;
            pwState.isBusy = true;

            try {
                const { Ed25519PrivateKey } = await import(/* webpackChunkName: "hashgraph" */ "@hashgraph/sdk");

                const key = await Ed25519PrivateKey.fromKeystore(
                    state.keyFile as Uint8Array,
                    pwState.password
                );

                await addKeysFromSeed(key);

                Vue.nextTick(() => {
                    pwState.isOpen = false;
                    state.modalEnterAccountIdState.isOpen = true;
                });
            } catch (error) {
                pwState.error = context.root.$t("accessMyAccount.invalidPassword");
            } finally {
                pwState.isBusy = false;
            }
        }

        async function handleAccessByPhraseSubmit(): Promise<void> {
            const accessByPhraseState = state.modalAccessByPhraseState;
            accessByPhraseState.isBusy = true;

            const { Mnemonic } = await import(/* webpackChunkName: "hashgraph" */ "@hashgraph/sdk");

            const mnemonic = new Mnemonic(accessByPhraseState.words);
            await addKeysFromSeed(mnemonic, accessByPhraseState.password);

            Vue.nextTick(() => {
                accessByPhraseState.isBusy = false;
                accessByPhraseState.isOpen = false;
                state.modalEnterAccountIdState.isOpen = true;
                accessByPhraseState.isValid = true;
            });
        }

        async function handleAccessByPrivateKeySubmit(): Promise<void> {
            state.modalAccessByPrivateKeyState.isBusy = true;

            const { Ed25519PrivateKey } = await import(/* webpackChunkName: "hashgraph" */ "@hashgraph/sdk");
            const key = Ed25519PrivateKey.fromString(state.modalAccessByPrivateKeyState.rawPrivateKey);
            await addKeysFromSeed(key);

            Vue.nextTick(() => {
                state.modalAccessByPrivateKeyState.isOpen = false;
                state.modalAccessByPrivateKeyState.isBusy = false;
                state.modalEnterAccountIdState.isOpen = true;
            });
        }

        async function handleLoginError(error: Error): Promise<void> {
            const { HederaStatusError, HederaPrecheckStatusError } = await import(/* webpackChunkName: "hashgraph" */ "@hashgraph/sdk");

            if (
                error instanceof HederaStatusError ||
                    error instanceof HederaPrecheckStatusError
            ) {
                if (error.message.includes(
                    context.root.$t("common.error.unhandled").toString()
                )) { // Unhandled Error on Hedera Network, not this application
                    throw error;
                }

                const result: HederaStatusErrorTuple = await actions.handleHederaError({ error, showAlert: false });
                state.modalEnterAccountIdState.errorMessage = result.message;
            } else if (
                error.name.includes("Transport") &&
                    state.loginMethod === LoginMethod.Ledger
            ) {
                const result: LedgerErrorTuple = await actions.handleLedgerError({ error, showAlert: false });

                state.modalEnterAccountIdState.errorMessage =
                        result.message;
            } else if (
                error.message === "Response closed without headers" ||
                    error.message === "Response closed without grpc-status" ||
                    error.message === "404 (Not Found)" ||
                    error.stack?.includes("grpc")
            ) {
                const message = context.root
                    .$t("network.connectionFailed")
                    .toString();

                state.modalEnterAccountIdState.errorMessage = message;
            }
        }

        function handleLogin(): void {
            Vue.nextTick(async() => {
                state.modalEnterAccountIdState.isOpen = false;
                await mutations.navigateToInterface();
            });
        }

        async function handleAccountIdSubmit(
            account: import("@hashgraph/sdk").AccountId
        ): Promise<void> {
            state.modalEnterAccountIdState.isBusy = true;
            const network = getters.currentNetwork();
            let lastError: Error | undefined;

            try {
                switch (state.loginMethod) {
                    case LoginMethod.Ledger:
                    case LoginMethod.Trezor:
                        if (await actions.logIn(account, state.wallet!, network)) {
                            handleLogin();
                        }
                        break;
                    case LoginMethod.KeyStore:
                    case LoginMethod.Mnemonic:
                    case LoginMethod.PrivateKey:
                        // user might have one of several different keys
                        // associated with their account due to historical reasons
                        for (const key of state.possibleKeys) {
                            state.wallet = new SoftwareWallet(
                                state.loginMethod,
                                key
                            );

                            try {
                                // eslint-disable-next-line no-await-in-loop
                                if (await actions.logIn(
                                    account,
                                    state.wallet,
                                    network
                                )) {
                                    handleLogin();
                                }
                                break;
                            } catch (error) {
                                lastError = error;
                            }
                        }

                        if (lastError != null) throw lastError;
                        break;
                    default:
                        return;
                }
            } catch (error) {
                await handleLoginError(error);
            } finally {
                state.modalEnterAccountIdState.isBusy = false;
            }
        }

        function handleDoesntHaveAccount(): void {
            Vue.nextTick(() => {
                state.modalRequestToCreateAccountState.isOpen = true;
                state.modalEnterAccountIdState.isOpen = false;
            });
        }

        function handleHasAccount(): void {
            Vue.nextTick(() => {
                state.modalRequestToCreateAccountState.isOpen = false;
                state.modalEnterAccountIdState.isOpen = true;
            });
        }

        return {
            state,
            keystoreFile,
            handleClickTiles,
            handleAccessBySoftwareSubmit,
            loadKeystore,
            handleAccessByKeystoreSubmit,
            handleAccessByPhraseSubmit,
            handleAccessByPrivateKeySubmit,
            handleAccountIdSubmit,
            handleAccessByHardwareSubmit,
            handleDoesntHaveAccount,
            handleHasAccount,
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
