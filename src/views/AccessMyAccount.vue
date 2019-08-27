<template>
    <div class="access-my-account">
        <div class="wrap">
            <PageTitle title="Access My Account">
                Don't have an account?
                <router-link :to="{ name: 'create-account' }">
                    Create A New Account
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

        <ModalAccessByHardware v-model="state.modalAccessByHardwareIsOpen" />

        <ModalAccessBySoftware
            v-model="state.modalAccessBySoftwareIsOpen"
            @submit="handleAccessBySoftwareSubmit"
        />

        <ModalKeystoreFilePassword
            v-model="state.modalKeystoreFilePasswordState"
            @submit="handlePasswordSubmit"
        />

        <ModalEnterAccountId
            v-model="state.modalEnterAccountIdIsOpen"
            :private-key="state.privateKey"
            @submit="handleAccountIdSubmit"
            @noAccount="handleDoesntHaveAccount"
        />

        <ModalRequestToCreateAccount
            v-model="state.modalRequestToCreateAccountIsOpen"
            :public-key="state.publicKey"
            @hasAccount="handleHasAccount"
        />

        <input
            v-show="false"
            ref="file"
            type="file"
            @change="loadTextFromFile"
        />
    </div>
</template>

<script lang="ts">
import FAQs from "../components/FAQs.vue";
import AccountTileButtons from "../components/AccountTileButtons.vue";
import ModalAccessByHardware from "../components/ModalAccessByHardware.vue";
import ModalAccessBySoftware, {
    AccessSoftwareOption
} from "../components/ModalAccessBySoftware.vue";
import ModalAccessByPhrase from "../components/ModalAccessByPhrase.vue";
import ModalAccessByPrivateKey, {
    State as ModalAccessByPrivateKeyState
} from "../components/ModalAccessByPrivateKey.vue";
import ModalEnterAccountId from "../components/ModalEnterAccountId.vue";
import PageTitle from "../components/PageTitle.vue";
import ModalKeystoreFilePassword from "../components/ModalKeystoreFilePassword.vue";
import store from "../store";
import ModalRequestToCreateAccount from "../components/ModalRequestToCreateAccount.vue";
import {
    createComponent,
    reactive,
    ref,
    SetupContext,
    watch
} from "@vue/composition-api";
import { Client, Ed25519PrivateKey, Ed25519PublicKey } from "@hashgraph/sdk";
import { Id } from "../store/modules/wallet";
import { ALERT, LOG_IN } from "../store/actions";

export default createComponent({
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
    setup(props: object, context: SetupContext) {
        const state = reactive({
            privateKey: null as Ed25519PrivateKey | null,
            publicKey: null as Ed25519PublicKey | null,
            modalAccessByHardwareIsOpen: false,
            modalAccessBySoftwareIsOpen: false,
            modalAccessByPhraseState: {
                modalIsOpen: false,
                isBusy: false,
                words: [],
                isValid: true
            },
            modalKeystoreFilePasswordState: {
                modalIsOpen: false,
                password: "",
                isBusy: false
            },
            modalAccessByPrivateKeyState: {
                modalIsOpen: false,
                rawPrivateKey: "",
                isBusy: false
            },
            modalEnterAccountIdIsOpen: false,
            modalRequestToCreateAccountIsOpen: false,
            keystoreFileArray: null as Uint8Array | null
        });

        function resetState() {
            state.privateKey = null as Ed25519PrivateKey | null;
            state.publicKey = null as Ed25519PublicKey | null;
            state.modalAccessByHardwareIsOpen = false;
            state.modalAccessBySoftwareIsOpen = false;
            state.modalAccessByPhraseState = {
                modalIsOpen: false,
                isBusy: false,
                words: [],
                isValid: true
            };
            state.modalKeystoreFilePasswordState = {
                modalIsOpen: false,
                password: "",
                isBusy: false
            };

            state.modalAccessByPrivateKeyState = {
                modalIsOpen: false,
                rawPrivateKey: "",
                isBusy: false
            };

            state.modalEnterAccountIdIsOpen = false;
            state.modalRequestToCreateAccountIsOpen = false;
            state.keystoreFileArray = null as Uint8Array | null;
        }

        const file = ref<HTMLInputElement | null>(null);

        function handleClickTiles(which: string) {
            if (which === "hardware") {
                state.modalAccessByHardwareIsOpen = true;
            } else if (which === "software") {
                state.modalAccessBySoftwareIsOpen = true;
            }
        }
        function handleAccessBySoftwareSubmit(which: AccessSoftwareOption) {
            state.modalAccessBySoftwareIsOpen = false;

            if (which === "file") {
                if (file.value != null) {
                    file.value.click();
                }
            } else {
                setTimeout(() => {
                    if (which === AccessSoftwareOption.Phrase) {
                        state.modalAccessByPhraseState = {
                            modalIsOpen: true,
                            isBusy: false,
                            words: [],
                            isValid: true
                        };
                    } else if (which === AccessSoftwareOption.Key) {
                        state.modalAccessByPrivateKeyState = {
                            modalIsOpen: true,
                            rawPrivateKey: "",
                            isBusy: false
                        };
                    }
                }, 125);
            }
        }

        async function loadTextFromFile(event: Event) {
            const target = event.target as HTMLInputElement;

            if (target.files == null) {
                // User hit cancel
                return;
            }

            const file = target.files[0];
            const keyStoreArrayBuff = await new Promise<ArrayBuffer>(
                (resolve, reject) => {
                    const reader = new FileReader();

                    reader.addEventListener("error", reject);
                    reader.addEventListener("loadend", (): void => {
                        resolve(reader.result as ArrayBuffer);
                    });

                    reader.readAsArrayBuffer(file);
                }
            );

            state.modalKeystoreFilePasswordState = {
                modalIsOpen: true,
                password: "",
                isBusy: false
            };
            state.keystoreFileArray = new Uint8Array(keyStoreArrayBuff);
        }

        // Update our local understand of what the private/public key pair is
        // Called at the end of each access by software workflow before merging
        // into enter account ID
        function setPrivateKey(newPrivateKey: Ed25519PrivateKey) {
            state.privateKey = newPrivateKey;
            state.publicKey = newPrivateKey.publicKey;
        }

        async function handlePasswordSubmit() {
            const pwState = state.modalKeystoreFilePasswordState;
            pwState.isBusy = true;

            if (state.keystoreFileArray == null) {
                throw new Error(
                    "unexepcted keystore password submission before submission of keystore file"
                );
            }

            try {
                setPrivateKey(
                    await Ed25519PrivateKey.fromKeystore(
                        state.keystoreFileArray as Uint8Array,
                        state.modalKeystoreFilePasswordState.password
                    )
                );
                // Close  previous modal and open another one
                pwState.isBusy = false;
                pwState.modalIsOpen = false;
                state.modalEnterAccountIdIsOpen = true;
            } catch {
                pwState.isBusy = false;

                store.dispatch(ALERT, {
                    level: "error",
                    message: "Invalid Password"
                });
            }
        }

        async function handleAccessByPhraseSubmit() {
            const accessByPhraseState = state.modalAccessByPhraseState;

            accessByPhraseState.isBusy = true;

            const phrase = accessByPhraseState.words.join(" ");

            try {
                setPrivateKey(await Ed25519PrivateKey.fromMnemonic(phrase));

                // Close  previous modal and open another one
                accessByPhraseState.isBusy = false;
                accessByPhraseState.modalIsOpen = false;
                state.modalEnterAccountIdIsOpen = true;
                accessByPhraseState.isValid = true;
            } catch {
                accessByPhraseState.isBusy = false;

                store.dispatch(ALERT, {
                    level: "error",
                    message: "Invalid Mnemonic"
                });

                accessByPhraseState.isValid = false;
            }
        }

        function handleAccessByPrivateKeySubmit() {
            state.modalAccessByPrivateKeyState.isBusy = true;

            setPrivateKey(
                Ed25519PrivateKey.fromString(
                    state.modalAccessByPrivateKeyState.rawPrivateKey
                )
            );

            // Close previous modal and open another one
            state.modalAccessByPrivateKeyState.modalIsOpen = false;

            setTimeout(() => {
                state.modalAccessByPrivateKeyState.isBusy = false;
                state.modalEnterAccountIdIsOpen = true;
            }, 125);
        }

        function openInterface() {
            context.root.$router.push({ name: "interface" });
        }

        async function handleAccountIdSubmit(client: Client, account: Id) {
            // Make sure there are no open modals when we navigate
            state.modalEnterAccountIdIsOpen = false;

            store.dispatch(LOG_IN, {
                account,
                client,
                privateKey: state.privateKey,
                publicKey: state.publicKey
            });

            openInterface();
        }

        function handleDoesntHaveAccount() {
            state.modalEnterAccountIdIsOpen = false;
            state.modalRequestToCreateAccountIsOpen = true;
        }

        function handleHasAccount() {
            state.modalRequestToCreateAccountIsOpen = false;
            state.modalEnterAccountIdIsOpen = true;
        }

        return {
            state,
            file,
            handleClickTiles,
            handleAccessBySoftwareSubmit,
            loadTextFromFile,
            handlePasswordSubmit,
            handleAccessByPhraseSubmit,
            handleAccessByPrivateKeySubmit,
            handleAccountIdSubmit,
            handleDoesntHaveAccount,
            handleHasAccount
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
        padding: 20px;
    }
}
</style>
