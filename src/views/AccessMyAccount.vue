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
        <ModalAccessByPrivateKey v-model="modalAccessByPrivateKeyIsOpen" />
        <ModalAccessByPhrase v-model="modalAccessByPhraseState" />
        <ModalAccessByHardware v-model="modalAccessByHardwareIsOpen" />
        <ModalAccessBySoftware
            v-model="modalAccessBySoftwareIsOpen"
            @submit="handleAccessBySoftwareSubmit"
        />
        <input
            ref="file"
            type="file"
            :v-show="false"
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
import PageTitle from "../components/PageTitle.vue";

function newAccessByPhraseState(isOpen: boolean) {
    return {
        modalIsOpen: isOpen,
        words: [],
        numWords: MnemonicType.Words12,
        password: ""
    };
}

export default Vue.extend({
    components: {
        FAQs,
        AccountTileButtons,
        ModalAccessByHardware,
        ModalAccessBySoftware,
        ModalAccessByPhrase,
        ModalAccessByPrivateKey,
        PageTitle
    },
    data() {
        return {
            modalAccessByHardwareIsOpen: false,
            modalAccessBySoftwareIsOpen: false,
            modalAccessByPhraseState: newAccessByPhraseState(false),
            modalAccessByPrivateKeyIsOpen: false
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
                        this.modalAccessByPhraseState = newAccessByPhraseState(
                            true
                        );
                    } else if (which === AccessSoftwareOption.Key) {
                        this.modalAccessByPrivateKeyIsOpen = true;
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
            const fileText = await new Promise<string>((resolve, reject) => {
                const reader = new FileReader();

                reader.addEventListener("error", reject);
                reader.addEventListener("loadend", (event: ProgressEvent) => {
                    resolve(reader.result as string);
                });

                reader.readAsText(file);
            });

            console.log(fileText);

            // TODO: Open the password modal for the keyfile
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
