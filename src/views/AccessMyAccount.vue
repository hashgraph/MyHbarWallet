<template>
    <div class="access-my-account">
        <div class="wrap">
            <div class="title-container">
                <div class="title">Access My Account</div>
                <div class="subtitle">
                    Don't have an account?
                    <router-link :to="{ name: 'create-account' }"
                        >Create A New Account</router-link
                    >
                </div>
            </div>
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
    </div>
</template>

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
        ModalAccessByPrivateKey
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

            setTimeout(() => {
                if (which === AccessSoftwareOption.Phrase) {
                    this.modalAccessByPhraseState = newAccessByPhraseState(
                        true
                    );
                } else if (which === AccessSoftwareOption.Key) {
                    this.modalAccessByPrivateKeyIsOpen = true;
                } else if (which === AccessSoftwareOption.File) {
                    // todo: add this modal
                }
            }, 125);
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

.title-container {
    margin-block-end: 50px;
    text-align: center;
}

.title {
    font-size: 30px;
    font-weight: 500;
    margin-block-end: 15px;
}

.subtitle {
    color: var(--color-china-blue);
    font-size: 14px;
    font-weight: 400;
}
</style>
