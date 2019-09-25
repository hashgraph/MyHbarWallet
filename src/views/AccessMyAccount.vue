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
            id="file-upload"
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
import ModalAccessByPrivateKey from "../components/ModalAccessByPrivateKey.vue";
import ModalEnterAccountId from "../components/ModalEnterAccountId.vue";
import PageTitle from "../components/PageTitle.vue";
import ModalKeystoreFilePassword from "../components/ModalKeystoreFilePassword.vue";
import store from "../store";
import ModalRequestToCreateAccount from "../components/ModalRequestToCreateAccount.vue";
import {
    createComponent,
    reactive,
    ref,
    SetupContext
} from "@vue/composition-api";
import { Id } from "../store/modules/wallet";
import { ALERT, LOG_IN } from "../store/actions";
import Vue from "vue";

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
            privateKey: null as
                | import("@hashgraph/sdk/src/Keys").Ed25519PrivateKey
                | null,
            publicKey: null as
                | import("@hashgraph/sdk/src/Keys").Ed25519PublicKey
                | null,
            modalAccessByHardwareIsOpen: false,
            modalAccessBySoftwareIsOpen: false,
            modalAccessByPhraseState: {
                isOpen: false,
                isBusy: false,
                words: [],
                isValid: true
            },
            modalKeystoreFilePasswordState: {
                isOpen: false,
                password: "",
                error: null as string | null,
                isBusy: false
            },
            modalAccessByPrivateKeyState: {
                isOpen: false,
                rawPrivateKey: "",
                isBusy: false
            },
            modalEnterAccountIdIsOpen: false,
            modalRequestToCreateAccountIsOpen: false,
            keystoreFileArray: null as Uint8Array | null
        });

        const file = ref<HTMLInputElement | null>(null);

        function handleClickTiles(which: string): void {
            if (which === "hardware") {
                state.modalAccessByHardwareIsOpen = true;
            } else if (which === "software") {
                state.modalAccessBySoftwareIsOpen = true;
            }
        }
        function handleAccessBySoftwareSubmit(
            which: AccessSoftwareOption
        ): void {
            state.modalAccessBySoftwareIsOpen = false;

            if (which === "file") {
                if (file.value != null) {
                    file.value.click(); // triggers loadTextFromFile via hidden input @click
                }
            } else {
                setTimeout(() => {
                    if (which === AccessSoftwareOption.Phrase) {
                        state.modalAccessByPhraseState.isOpen = true;
                    } else if (which === AccessSoftwareOption.Key) {
                        state.modalAccessByPrivateKeyState.isOpen = true;
                    }
                }, 125);
            }
        }

        async function loadTextFromFile(event: Event): Promise<void> {
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

            target.value = ""; // change back to initial state to gaurantee that click fires next time
            state.modalKeystoreFilePasswordState.isOpen = true;
            state.keystoreFileArray = new Uint8Array(keyStoreArrayBuff);
        }

        // Update our local understand of what the private/public key pair is
        // Called at the end of each access by software workflow before merging
        // into enter account ID
        function setPrivateKey(
            newPrivateKey: import("@hashgraph/sdk/src/Keys").Ed25519PrivateKey
        ): void {
            state.privateKey = newPrivateKey;
            state.publicKey = newPrivateKey.publicKey;
        }

        async function handlePasswordSubmit(): Promise<void> {
            const pwState = state.modalKeystoreFilePasswordState;
            pwState.isBusy = true;

            if (state.keystoreFileArray == null) {
                throw new Error(
                    "unexepcted keystore password submission before submission of keystore file"
                );
            }

            try {
                const { Ed25519PrivateKey } = await (import(
                    "@hashgraph/sdk"
                ) as Promise<typeof import("@hashgraph/sdk")>);

                setPrivateKey(
                    await Ed25519PrivateKey.fromKeystore(
                        state.keystoreFileArray as Uint8Array,
                        state.modalKeystoreFilePasswordState.password
                    )
                );

                // Close  previous modal and open another one
                pwState.isBusy = false;
                pwState.isOpen = false;
                Vue.nextTick(() => (state.modalEnterAccountIdIsOpen = true));
            } catch (error) {
                console.warn(error);
                pwState.isBusy = false;
                pwState.error = "Invalid password";
            }
        }

        async function handleAccessByPhraseSubmit(): Promise<void> {
            const accessByPhraseState = state.modalAccessByPhraseState;

            accessByPhraseState.isBusy = true;

            try {
                const { Ed25519PrivateKey } = await (import(
                    "@hashgraph/sdk"
                ) as Promise<typeof import("@hashgraph/sdk")>);

                setPrivateKey(
                    // `.derive(0)` to use the same key as the default account of the mobile wallet
                    (await Ed25519PrivateKey.fromMnemonic(
                        accessByPhraseState.words
                    )).derive(0)
                );

                // Close  previous modal and open another one
                accessByPhraseState.isBusy = false;
                accessByPhraseState.isOpen = false;
                Vue.nextTick(() => (state.modalEnterAccountIdIsOpen = true));
                accessByPhraseState.isValid = true;
            } catch (error) {
                console.warn("error access by mnemonic", error);
                accessByPhraseState.isBusy = false;

                store.dispatch(ALERT, {
                    level: "error",
                    message: "Invalid Mnemonic"
                });

                accessByPhraseState.isValid = false;
            }
        }

        async function handleAccessByPrivateKeySubmit(): Promise<void> {
            state.modalAccessByPrivateKeyState.isBusy = true;
            const { Ed25519PrivateKey } = await (import(
                "@hashgraph/sdk"
            ) as Promise<typeof import("@hashgraph/sdk")>);

            setPrivateKey(
                Ed25519PrivateKey.fromString(
                    state.modalAccessByPrivateKeyState.rawPrivateKey
                )
            );

            // Close previous modal and open another one
            state.modalAccessByPrivateKeyState.isOpen = false;

            setTimeout(() => {
                state.modalAccessByPrivateKeyState.isBusy = false;
                state.modalEnterAccountIdIsOpen = true;
            }, 125);
        }

        function openInterface(): void {
            context.root.$router.push({ name: "interface" });
        }

        async function handleAccountIdSubmit(
            client: object,
            account: Id
        ): Promise<void> {
            const { Client } = await (import("@hashgraph/sdk") as Promise<
                typeof import("@hashgraph/sdk")
            >);
            if (!(client instanceof Client)) {
                throw new TypeError(
                    "client not instance of Client: Programmer Error"
                );
            }
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

        function handleDoesntHaveAccount(): void {
            state.modalEnterAccountIdIsOpen = false;
            Vue.nextTick(
                () => (state.modalRequestToCreateAccountIsOpen = true)
            );
        }

        function handleHasAccount(): void {
            state.modalRequestToCreateAccountIsOpen = false;
            Vue.nextTick(() => (state.modalEnterAccountIdIsOpen = true));
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
        padding: 20px 0;
    }
}
</style>
