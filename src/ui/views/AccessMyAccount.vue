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
            ref="modalEnterAccountId"
            v-model="state.modalEnterAccountIdState"
            @network="handleNetworkChange"
            @noAccount="handleDoesntHaveAccount"
            @submit="handleAccountIdSubmit"
            @close="handleAccountIdClose"
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
import { defineComponent, reactive, ref, Ref, SetupContext } from "@vue/composition-api";

import FAQs from "../components/FAQs.vue";
import AccountTileButtons from "../components/AccountTileButtons.vue";
import ModalAccessByHardware, { AccessHardwareOption } from "../components/ModalAccessByHardware.vue";
import ModalAccessBySoftware, { AccessSoftwareOption } from "../components/ModalAccessBySoftware.vue";
import ModalAccessByPhrase, { WordCount } from "../components/ModalAccessByPhrase.vue";
import ModalAccessByPrivateKey from "../components/ModalAccessByPrivateKey.vue";
import PageTitle from "../components/PageTitle.vue";
import ModalKeystoreFilePassword from "../components/ModalKeystoreFilePassword.vue";
import ModalEnterAccountId, { ModalEnterAccountIdElement } from "../components/ModalEnterAccountId.vue";
import ModalRequestToCreateAccount from "../components/ModalRequestToCreateAccount.vue";
import { actions, getters, mutations } from "../store";
import SoftwareWallet from "../../domain/wallets/software";
import Wallet, { LoginMethod } from "../../domain/wallets/wallet";
import { AccessAccountDTO } from "../../dto/access";
import { NetworkName, NetworkSettings } from "../../domain/network";

import { HederaStatusErrorTuple, LedgerErrorTuple } from "src/ui/store/modules/errors";

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
    setup(props: object, context: SetupContext) {
        const state: AccessAccountDTO & State = reactive({
            privateKey: null,
            publicKey: null,
            keyFile: null,
            modalAccessByHardwareState: {
                isOpen: false,
                isBusy: false,
                optionSelected: "",
                disableButton: false
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
                valid: false,
                networkValid: false,
                publicKey: null,
                derivedPublicKey: null
            },
            modalRequestToCreateAccountState: { isOpen: false },
            loginMethod: null,
            wallet: null
        });

        const keystoreFile: Ref<HTMLInputElement | null> = ref(null);
        const modalEnterAccountId: Ref<ModalEnterAccountIdElement | null> = ref(null);

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

            target.value = ""; // change back to initial state to guarantee that click fires next time
            state.modalKeystoreFilePasswordState.isOpen = true;
            state.keyFile = new Uint8Array(keyStoreArrayBuff);
            // In case the submit for AccessBySoftware does not fire (i.e. when programmatically uploading the file)
            state.loginMethod = LoginMethod.KeyStore;
        }

        function setPrivateKey(newPrivateKey: import("@hashgraph/sdk").Ed25519PrivateKey): void {
            state.privateKey = newPrivateKey;
            state.publicKey = newPrivateKey.publicKey;
            state.modalEnterAccountIdState.publicKey = newPrivateKey.publicKey;

            if (state.privateKey != null) {
                if (state.privateKey.supportsDerivation) {
                    state.modalEnterAccountIdState.derivedPublicKey = newPrivateKey.derive(0).publicKey;
                }
            }
        }

        function handleNetworkChange(settings: NetworkSettings): void {
            if (
                getters.currentNetwork().name !== settings.name ||
                settings.name === NetworkName.CUSTOM
            ) {
                mutations.setCurrentNetwork(settings);
            }
        }

        function handleClickTiles(which: string): void {
            if (which === "hardware") {
                state.modalAccessByHardwareState.isOpen = true;
            } else if (which === "software") {
                state.modalAccessBySoftwareState.isOpen = true;
            }
        }

        function handleAccessBySoftwareSubmit(which: AccessSoftwareOption): void {
            state.modalAccessBySoftwareState.isOpen = false;

            if (which === AccessSoftwareOption.File) {
                if (keystoreFile.value != null) {
                    if (MHW_ENV !== "test") keystoreFile.value.click(); // triggers loadKeystore via hidden input @click
                }
            } else if (which === AccessSoftwareOption.Phrase) {
                state.loginMethod = LoginMethod.Mnemonic;
                state.modalAccessByPhraseState.isOpen = true;
            } else if (which === AccessSoftwareOption.Key) {
                state.loginMethod = LoginMethod.PrivateKey;
                state.modalAccessByPrivateKeyState.isOpen = true;
            } else {
                state.wallet = null;
                state.loginMethod = null;
            }
        }

        async function handleAccessByHardwareSubmit(which: AccessHardwareOption): Promise<void> {
            switch (which) {
                case AccessHardwareOption.Ledger:
                    state.loginMethod = LoginMethod.Ledger;
                    state.modalAccessByHardwareState.isBusy = true;
                    try {
                        const { Ledger } = await import(/* webpackChunkName: "hardware" */ "../../domain/wallets/ledger");
                        state.modalAccessByHardwareState.isBusy = true;
                        state.wallet = new Ledger();
                        state.publicKey = (await state.wallet!.getPublicKey()) as import("@hashgraph/sdk").Ed25519PublicKey;
                        state.modalEnterAccountIdState.publicKey = state.publicKey;
                        state.modalAccessByHardwareState.isOpen = false;
                        state.modalEnterAccountIdState.isOpen = true;
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

                setPrivateKey(await Ed25519PrivateKey.fromKeystore(
                    state.keyFile as Uint8Array,
                    pwState.password
                ));

                // Close  previous modal and open another one
                pwState.isBusy = false;
                pwState.isOpen = false;
                state.modalEnterAccountIdState.isOpen = true;
            } catch (error) {
                pwState.isBusy = false;
                pwState.error = "Invalid password";
            }
        }

        async function handleAccessByPhraseSubmit(): Promise<void> {
            if (state.modalAccessByPhraseState.password == null) state.modalAccessByPhraseState.password = "";

            const accessByPhraseState = state.modalAccessByPhraseState;
            accessByPhraseState.isBusy = true;

            const { Ed25519PrivateKey, Mnemonic } = await import(/* webpackChunkName: "hashgraph" */ "@hashgraph/sdk");

            const mnemonic = new Mnemonic(accessByPhraseState.words);

            const rootPrivateKey = await Ed25519PrivateKey.fromMnemonic(
                mnemonic,
                accessByPhraseState.password
            );

            setPrivateKey(rootPrivateKey);

            // Close previous modal and open another one
            accessByPhraseState.isBusy = false;
            accessByPhraseState.isOpen = false;
            state.modalEnterAccountIdState.isOpen = true;
            accessByPhraseState.isValid = true;
        }

        async function handleAccessByPrivateKeySubmit(): Promise<void> {
            state.modalAccessByPrivateKeyState.isBusy = true;
            const { Ed25519PrivateKey } = await import(/* webpackChunkName: "hashgraph" */ "@hashgraph/sdk");
            setPrivateKey(Ed25519PrivateKey.fromString(state.modalAccessByPrivateKeyState.rawPrivateKey));
            state.modalAccessByPrivateKeyState.isOpen = false;
            state.modalAccessByPrivateKeyState.isBusy = false;
            state.modalEnterAccountIdState.isOpen = true;
        }

        async function logIn(account: import("@hashgraph/sdk").AccountId): Promise<void> {
            // Key is null here only when the user has a wallet that we cannot export the
            // private key from, such as a hardware wallet
            if (state.privateKey != null) {
                state.wallet = new SoftwareWallet(
                    state.loginMethod!,
                    state.privateKey as import("@hashgraph/sdk").Ed25519PrivateKey,
                    state.publicKey as import("@hashgraph/sdk").Ed25519PublicKey
                );
            }

            await actions.logIn(account, state.wallet!, getters.currentNetwork());
            state.modalEnterAccountIdState.isOpen = false;
            Vue.nextTick(() => mutations.navigateToInterface());
        }

        async function handleLoginError(error: import("@hashgraph/sdk").HederaStatusError): Promise<void> {
            const result: HederaStatusErrorTuple = await actions.handleHederaError({ error, showAlert: false });
            state.modalEnterAccountIdState.errorMessage = result.message;
        }

        // :^)
        // eslint-disable-next-line sonarjs/cognitive-complexity
        async function handleAccountIdSubmit(
            account: import("@hashgraph/sdk").AccountId
        ): Promise<void> {
            state.modalEnterAccountIdState.isBusy = true;

            try {
                await logIn(account);
            } catch (error) {
                const { HederaStatusError, HederaPrecheckStatusError } = await import(/* webpackChunkName: "hashgraph" */ "@hashgraph/sdk");
                if (error instanceof HederaStatusError || error instanceof HederaPrecheckStatusError) {
                    if (
                        error.message.includes(context.root.$t("common.error.unhandled").toString())
                    ) { // Unhandled Error on Hedera Network, not this application
                        throw error;
                    }

                    // Their key may be null here, i.e w/ hardware wallets etc.
                    if (state.privateKey != null) {
                        if (state.privateKey.supportsDerivation) {
                            // Try to login w/ derived key if supported
                            const originalKey = state.privateKey;
                            setPrivateKey(state.privateKey.derive(0));

                            try {
                                await logIn(account);
                            } catch (childError) {
                                await handleLoginError(childError);
                            } finally {
                                setPrivateKey(originalKey);
                            }
                        } else {
                            // Otherwise, just handle the original error
                            await handleLoginError(error);
                        }
                    }
                } else if (
                    error.name === "TransportStatusError" &&
                    state.loginMethod === LoginMethod.Ledger
                ) {
                    const result: LedgerErrorTuple = await actions.handleLedgerError({ error, showAlert: false });

                    state.modalEnterAccountIdState.errorMessage =
                        result.message;
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

        function handleAccountIdClose(): void {
            if (!state.modalRequestToCreateAccountState.isOpen) {
                state.wallet = null;
                state.loginMethod = null;
            }
        }

        function handleDoesntHaveAccount(): void {
            state.modalRequestToCreateAccountState.isOpen = true;
            state.modalEnterAccountIdState.isOpen = false;
        }

        function handleHasAccount(): void {
            state.modalRequestToCreateAccountState.isOpen = false;
            state.modalEnterAccountIdState.isOpen = true;
        }

        return {
            state,
            keystoreFile,
            modalEnterAccountId,
            handleClickTiles,
            handleAccessBySoftwareSubmit,
            loadKeystore,
            handleAccessByKeystoreSubmit,
            handleAccessByPhraseSubmit,
            handleAccessByPrivateKeySubmit,
            handleAccountIdSubmit,
            handleAccountIdClose,
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
