<template>
    <Modal
        :is-open="isOpen"
        title="Access by hardware"
        @change="this.$listeners.change"
    >
        <div class="modal-access-by-hardware">
            <RadioButtonGroup
                v-model="optionSelected"
                name="hardware-access-option"
                :options="options"
            />
            <Button
                :disabled="optionSelected.length === 0"
                class="button-choose-a-hardware"
                label="Choose a Hardware"
            />
            <CustomerSupportLink />
        </div>
    </Modal>
</template>

<script lang="ts">
import { createComponent, value } from "vue-function-api";
import Button from "../components/Button.vue";
import RadioButtonGroup from "../components/RadioButtonGroup.vue";
import imageLedger from "../assets/button-ledger.svg";
import imageFinney from "../assets/button-finney.png";
import imageBitbox from "../assets/button-bitbox.svg";
import imageTrezor from "../assets/button-trezor.svg";
import imageSecalot from "../assets/button-secalot.svg";
import imageKeepKey from "../assets/button-keepkey.svg";
import Modal from "../components/Modal.vue";
import CustomerSupportLink from "../components/CustomerSupportLink.vue";

export default createComponent({
    components: {
        RadioButtonGroup,
        Button,
        Modal,
        CustomerSupportLink
    },
    model: {
        prop: "isOpen",
        event: "change"
    },
    props: {
        isOpen: { type: Boolean }
    },
    setup() {
        const optionSelected = value("");
        const options = [
            {
                label: "Ledger",
                value: "ledger",
                image: imageLedger
            },
            {
                label: "FINNEY",
                value: "finney",
                image: imageFinney
            },
            {
                label: "Digital Bitbox",
                value: "bitbox",
                image: imageBitbox
            },
            {
                label: "Trezor",
                value: "trezor",
                image: imageTrezor
            },
            {
                label: "Secalot",
                value: "secalot",
                image: imageSecalot
            },
            {
                label: "KeepKey",
                value: "keepkey",
                image: imageKeepKey
            }
        ];

        return {
            optionSelected,
            options
        };
    }
});
</script>

<style lang="postcss" scoped>
.modal-access-by-hardware {
    align-items: stretch;
    display: flex;
    flex-direction: column;
}

.button-choose-a-hardware {
    margin-block: 40px 20px;
}
</style>
