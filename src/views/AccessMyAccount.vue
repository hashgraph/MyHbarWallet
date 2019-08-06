<template>
    <div class="access-my-account">
        <div class="top">
            <AccountTileButtons @click="handleClickTiles" />
        </div>
        <FAQs />
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
    State as ModalAccessByPhraseState,
    MnemonicType
} from "@/components/ModalAccessByPhrase.vue";

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
        ModalAccessByPhrase
    },
    data() {
        return {
            modalAccessByHardwareIsOpen: false,
            modalAccessBySoftwareIsOpen: false,
            modalAccessByPhraseState: newAccessByPhraseState(false)
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
                if (which == AccessSoftwareOption.Phrase) {
                    this.modalAccessByPhraseState = newAccessByPhraseState(
                        true
                    );
                }
            }, 125);
        }
    }
});
</script>

<style lang="postcss" scoped>
.access-my-account {
    display: flex;
    flex-direction: column;
}

.top {
    align-items: center;
    align-self: center;
    display: flex;
    flex-direction: column;
    max-width: 1024px;
}
</style>
