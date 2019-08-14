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
import Vue from "vue";
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

export default Vue.extend({
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
    data() {
        return {
            modalAccessByHardwareIsOpen: false,
            modalAccessBySoftwareIsOpen: false,
            modalAccessByPhraseState: {
                modalIsOpen: false,
                isBusy: false,
                words: [],
                numWords: MnemonicType.Words12,
                password: ""
            },
            modalPasswordState: {
                modalIsOpen: false,
                password: "",
                isBusy: false
            },
            modalAccessByPrivateKeyState: {
                modalIsOpen: false,
                privateKey: "",
                isBusy: false
            },
            modalEnterAccountId: {
                modalIsOpen: false,
                account: "",
                isBusy: false
            },
            keystoreFileText: null as string | null
        };
    },
    computed: {},
    methods: {
        handleClickTiles(which: string) {
            if (which === "hardware") {
                this.modalAccessByHardwareIsOpen = true;
            } else if (which === "software") {
                this.modalAccessBySoftwareIsOpen = true;
            }
        },
        handleAccessBySoftwareSubmit(which: AccessSoftwareOption) {
            this.modalAccessBySoftwareIsOpen = false;

            if (which === "file") {
                (this.$refs.file as HTMLInputElement).click();
            } else {
                setTimeout(() => {
                    if (which === AccessSoftwareOption.Phrase) {
                        this.modalAccessByPhraseState.modalIsOpen = true;
                    } else if (which === AccessSoftwareOption.Key) {
                        this.modalAccessByPrivateKeyState.modalIsOpen = true;
                    }
                }, 125);
            }
        },
        async loadTextFromFile(event: Event) {
            const target = event.target as HTMLInputElement;

            if (target.files == null) {
                // User hit cancel
                return;
            }

            const file = target.files[0];
            this.keystoreFileText = await new Promise<string>(
                (resolve, reject) => {
                    const reader = new FileReader();

                    reader.addEventListener("error", reject);
                    reader.addEventListener("loadend", (): void => {
                        resolve(reader.result as string);
                    });

                    reader.readAsText(file);
                }
            );

            this.modalPasswordState.modalIsOpen = true;
        },
        handlePasswordSubmit() {
            this.modalPasswordState.isBusy = true;
            // TODO: Decode private key from file
            setTimeout(() => {
                // Close  previous modal and open another one
                this.modalPasswordState.isBusy = false;
                this.modalPasswordState.modalIsOpen = false;
                this.modalEnterAccountId.modalIsOpen = true;
            }, 3000);
        },
        handleAccessByPhraseSubmit() {
            this.modalAccessByPhraseState.isBusy = true;
            // TODO: Decode private key from phrase
            setTimeout(() => {
                // Close  previous modal and open another one
                this.modalAccessByPhraseState.isBusy = false;
                this.modalAccessByPhraseState.modalIsOpen = false;
                this.modalEnterAccountId.modalIsOpen = true;
            }, 3000);
        },
        handleAccessByPrivateKeySubmit() {
            this.modalAccessByPrivateKeyState.isBusy = true;

            setTimeout(() => {
                // Close  previous modal and open another one
                this.modalAccessByPrivateKeyState.isBusy = false;
                this.modalAccessByPrivateKeyState.modalIsOpen = false;
                this.modalEnterAccountId.modalIsOpen = true;
            }, 3000);
        },
        handleAccountIdSubmit() {
            this.modalEnterAccountId.isBusy = true;

            this.openInterface(null);
        },
        openInterface(privateKey: string | null) {
            console.log("privateKey =", privateKey);

            setTimeout(() => {
                this.$router.push({ name: "interface" });
            }, 3000);
        }
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
}
</style>
