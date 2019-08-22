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
            v-model="modalAccessByPrivateKeyState"
            @submit="handleAccessByPrivateKeySubmit"
        />

        <ModalAccessByPhrase
            v-model="modalAccessByPhraseState"
            @submit="handleAccessByPhraseSubmit"
        />

        <ModalAccessByHardware v-model="modalAccessByHardwareIsOpen" />

        <ModalAccessBySoftware
            v-model="modalAccessBySoftwareIsOpen"
            @submit="handleAccessBySoftwareSubmit"
        />

        <ModalPassword
            v-model="modalPasswordState"
            @submit="handlePasswordSubmit"
        />

        <ModalEnterAccountId
            v-model="modalEnterAccountIdIsOpen"
            :private-key="privateKey"
            @submit="handleAccountIdSubmit"
            @noAccount="handleDoesntHaveAccount"
        />

        <ModalRequestToCreateAccount
            v-model="modalRequestToCreateAccountIsOpen"
            :public-key="publicKey"
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

<!-- TODO:  should go to password modal after getting keystore file -->

<script lang="ts">
import FAQs from "@/components/FAQs.vue";
import AccountTileButtons from "@/components/AccountTileButtons.vue";
import ModalAccessByHardware from "@/components/ModalAccessByHardware.vue";
import ModalAccessBySoftware, {
    AccessSoftwareOption
} from "@/components/ModalAccessBySoftware.vue";
import ModalAccessByPhrase from "@/components/ModalAccessByPhrase.vue";
import ModalAccessByPrivateKey, {
    State as ModalAccessByPrivateKeyState
} from "@/components/ModalAccessByPrivateKey.vue";
import ModalEnterAccountId from "../components/ModalEnterAccountId.vue";
import PageTitle from "../components/PageTitle.vue";
import ModalPassword from "../components/ModalPassword.vue";
import store from "@/store";
import { LOG_IN } from "@/store/mutations";
import ModalRequestToCreateAccount from "../components/ModalRequestToCreateAccount.vue";
import { createComponent, value, Wrapper } from "vue-function-api";
import { Client, Ed25519PrivateKey, Ed25519PublicKey } from "hedera-sdk-js";
import { Id } from "@/store/modules/wallet";
import { ALERT } from "@/store/actions";

export default createComponent({
    components: {
        FAQs,
        AccountTileButtons,
        ModalAccessByHardware,
        ModalAccessBySoftware,
        ModalAccessByPhrase,
        ModalAccessByPrivateKey,
        PageTitle,
        ModalPassword,
        ModalEnterAccountId,
        ModalRequestToCreateAccount
    },
    setup(props, context) {
        const privateKey: Wrapper<Ed25519PrivateKey | null> = value(null);
        const publicKey: Wrapper<Ed25519PublicKey | null> = value(null);

        const modalAccessByHardwareIsOpen = value(false);
        const modalAccessBySoftwareIsOpen = value(false);

        const modalAccessByPhraseState = value({
            modalIsOpen: false,
            isBusy: false,
            words: [],
            isValid: true
        });

        const modalPasswordState = value({
            modalIsOpen: false,
            password: "",
            isBusy: false
        });

        const modalAccessByPrivateKeyState = value<
            ModalAccessByPrivateKeyState
        >({
            modalIsOpen: false,
            rawPrivateKey: "",
            isBusy: false
        });

        const modalEnterAccountIdIsOpen = value(false);

        const modalRequestToCreateAccountIsOpen = value(false);
        const keystoreFileArray: Wrapper<Uint8Array | null> = value(null);

        function handleClickTiles(which: string) {
            if (which === "hardware") {
                modalAccessByHardwareIsOpen.value = true;
            } else if (which === "software") {
                modalAccessBySoftwareIsOpen.value = true;
            }
        }
        function handleAccessBySoftwareSubmit(which: AccessSoftwareOption) {
            modalAccessBySoftwareIsOpen.value = false;

            if (which === "file") {
                (context.refs.file as HTMLInputElement).click();
            } else {
                setTimeout(() => {
                    if (which === AccessSoftwareOption.Phrase) {
                        modalAccessByPhraseState.value.modalIsOpen = true;
                    } else if (which === AccessSoftwareOption.Key) {
                        modalAccessByPrivateKeyState.value.modalIsOpen = true;
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

            modalPasswordState.value.modalIsOpen = true;

            const keyStoreFileU8 = new Uint8Array(keyStoreArrayBuff);

            keystoreFileArray.value = keyStoreFileU8;
        }

        // Update our local understand of what the private/public key pair is
        // Called at the end of each access by software workflow before merging
        // into enter account ID
        function setPrivateKey(newPrivateKey: Ed25519PrivateKey) {
            privateKey.value = newPrivateKey;
            publicKey.value = newPrivateKey.publicKey;
        }

        async function handlePasswordSubmit() {
            const pwState = modalPasswordState.value;
            pwState.isBusy = true;
            // TODO: Decode private key from file

            if (keystoreFileArray.value == null) {
                throw new Error(
                    "unexepcted keystore password submission before submission of keystore file"
                );
            }

            try {
                setPrivateKey(
                    await Ed25519PrivateKey.fromKeystore(
                        keystoreFileArray.value,
                        modalPasswordState.value.password
                    )
                );
                // Close  previous modal and open another one
                pwState.isBusy = false;
                pwState.modalIsOpen = false;
                modalEnterAccountIdIsOpen.value = true;
            } catch {
                pwState.isBusy = false;

                store.dispatch(ALERT, {
                    level: "error",
                    message: "Invalid Password"
                });
            }
        }

        async function handleAccessByPhraseSubmit() {
            const accessByPhraseState = modalAccessByPhraseState.value;

            accessByPhraseState.isBusy = true;

            const phrase = accessByPhraseState.words.join(" ");

            try {
                setPrivateKey(await Ed25519PrivateKey.fromMnemonic(phrase));

                // Close  previous modal and open another one
                accessByPhraseState.isBusy = false;
                accessByPhraseState.modalIsOpen = false;
                modalEnterAccountIdIsOpen.value = true;
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
            modalAccessByPrivateKeyState.value.isBusy = true;

            setPrivateKey(
                Ed25519PrivateKey.fromString(
                    modalAccessByPrivateKeyState.value.rawPrivateKey
                )
            );

            // Close previous modal and open another one
            modalAccessByPrivateKeyState.value.modalIsOpen = false;

            setTimeout(() => {
                modalAccessByPrivateKeyState.value.isBusy = false;
                modalEnterAccountIdIsOpen.value = true;
            }, 125);
        }

        function openInterface() {
            context.root.$router.push({ name: "interface" });
        }

        async function handleAccountIdSubmit(client: Client, account: Id) {
            store.commit(LOG_IN, {
                account,
                client,
                privateKey: privateKey.value,
                publicKey: publicKey.value
            });

            openInterface();
        }

        function handleDoesntHaveAccount() {
            modalEnterAccountIdIsOpen.value = false;
            modalRequestToCreateAccountIsOpen.value = true;
        }

        function handleHasAccount() {
            modalRequestToCreateAccountIsOpen.value = false;
            modalEnterAccountIdIsOpen.value = true;
        }

        return {
            publicKey,
            privateKey,
            modalAccessByHardwareIsOpen,
            modalAccessBySoftwareIsOpen,
            modalAccessByPhraseState,
            modalPasswordState,
            modalAccessByPrivateKeyState,
            modalEnterAccountIdIsOpen,
            modalRequestToCreateAccountIsOpen,
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
