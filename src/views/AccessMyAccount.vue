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
            v-model="modalEnterAccountId"
            @submit="handleAccountIdSubmit"
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
import { createComponent, value } from "vue-function-api";
import FAQs from "@/components/FAQs.vue";
import AccountTileButtons from "@/components/AccountTileButtons.vue";
import ModalAccessByHardware from "@/components/ModalAccessByHardware.vue";
import ModalAccessBySoftware, {
    AccessSoftwareOption
} from "@/components/ModalAccessBySoftware.vue";
import ModalAccessByPhrase, {
    MnemonicType
} from "@/components/ModalAccessByPhrase.vue";
import ModalAccessByPrivateKey from "@/components/ModalAccessByPrivateKey.vue";
import ModalEnterAccountId from "../components/ModalEnterAccountId.vue";
import PageTitle from "../components/PageTitle.vue";
import ModalPassword from "../components/ModalPassword.vue";
import store from "@/store";
import { SET_PRIVATE_KEY } from "@/store/mutations";

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
        ModalEnterAccountId
    },
    setup(props, context) {
        const modalAccessByHardwareIsOpen = value(false);
        const modalAccessBySoftwareIsOpen = value(false);
        const modalAccessByPhraseState = value({
            modalIsOpen: false,
            isBusy: false,
            words: [],
            numWords: MnemonicType.Words12,
            password: ""
        });
        const modalPasswordState = value({
            modalIsOpen: false,
            password: "",
            isBusy: false
        });
        const modalAccessByPrivateKeyState = value({
            modalIsOpen: false,
            privateKey: "",
            isBusy: false
        });
        const modalEnterAccountId = value({
            modalIsOpen: false,
            account: "",
            isBusy: false
        });
        const keystoreFileText = value(null as string | null);

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
            keystoreFileText.value = await new Promise<string>(
                (resolve, reject) => {
                    const reader = new FileReader();

                    reader.addEventListener("error", reject);
                    reader.addEventListener("loadend", (): void => {
                        resolve(reader.result as string);
                    });

                    reader.readAsText(file);
                }
            );

            modalPasswordState.value.modalIsOpen = true;
        }
        function handlePasswordSubmit() {
            modalPasswordState.value.isBusy = true;
            // TODO: Decode private key from file
            setTimeout(() => {
                // Close  previous modal and open another one
                modalPasswordState.value.isBusy = false;
                modalPasswordState.value.modalIsOpen = false;
                modalEnterAccountId.value.modalIsOpen = true;
            }, 3000);
        }
        function handleAccessByPhraseSubmit() {
            modalAccessByPhraseState.value.isBusy = true;
            // TODO: Decode private key from phrase
            setTimeout(() => {
                // Close  previous modal and open another one
                modalAccessByPhraseState.value.isBusy = false;
                modalAccessByPhraseState.value.modalIsOpen = false;
                modalEnterAccountId.value.modalIsOpen = true;
            }, 3000);
        }
        function handleAccessByPrivateKeySubmit() {
            modalAccessByPrivateKeyState.value.isBusy = true;
            store.commit(
                SET_PRIVATE_KEY,
                modalAccessByPrivateKeyState.value.privateKey
            );

            setTimeout(() => {
                // Close  previous modal and open another one
                modalAccessByPrivateKeyState.value.isBusy = false;
                modalAccessByPrivateKeyState.value.modalIsOpen = false;
                modalEnterAccountId.value.modalIsOpen = true;
            }, 3000);
        }
        function openInterface(privateKey: string | null) {
            console.log("privateKey =", privateKey);

            setTimeout(() => {
                context.root.$router.push({ name: "interface" });
            }, 3000);
        }
        function handleAccountIdSubmit() {
            modalEnterAccountId.value.isBusy = true;

            openInterface(null);
        }

        return {
            modalAccessByHardwareIsOpen,
            modalAccessByPhraseState,
            modalAccessByPrivateKeyState,
            modalAccessBySoftwareIsOpen,
            modalEnterAccountId,
            modalPasswordState,
            keystoreFileText,
            handleAccessByPhraseSubmit,
            handleAccessByPrivateKeySubmit,
            handleAccessBySoftwareSubmit,
            handleClickTiles,
            handlePasswordSubmit,
            handleAccountIdSubmit,
            loadTextFromFile
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
