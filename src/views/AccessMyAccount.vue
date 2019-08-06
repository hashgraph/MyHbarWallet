<template>
    <div class="access-my-account">
        <div class="top">
            <AccountTileButtons @click="handleClickTiles" />
        </div>
        <FAQs />
        <ModalAccessByHardware v-model="modalAccessByHardwareIsOpen" />
        <ModalAccessBySoftware v-model="modalAccessBySoftwareIsOpen" />
    </div>
</template>

<script lang="ts">
import Vue from "vue";
import FAQs from "../components/FAQs.vue";
import AccountTileButtons from "../components/AccountTileButtons.vue";
import ModalAccessByHardware from "../components/ModalAccessByHardware.vue";
import ModalAccessBySoftware from "../components/ModalAccessBySoftware.vue";

export default Vue.extend({
    components: {
        FAQs,
        AccountTileButtons,
        ModalAccessByHardware,
        ModalAccessBySoftware
    },
    data() {
        return {
            modalAccessByHardwareIsOpen: false,
            modalAccessBySoftwareIsOpen: false
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
