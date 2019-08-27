<template>
    <Modal
        :is-open="isOpen"
        title="Access by hardware"
        @change="this.$listeners.change"
    >
        <form class="modal-access-by-hardware" @submit.prevent="">
            <RadioButtonGroup
                v-model="state.optionSelected"
                name="hardware-access-option"
                :options="options.filter(option => option.supported)"
            />
            <Button
                :disabled="state.optionSelected.length === 0"
                class="button-choose-a-hardware"
                label="Choose a Hardware"
            />
            <CustomerSupportLink />
        </form>
    </Modal>
</template>

<script lang="ts">
import { createComponent, reactive } from "@vue/composition-api";
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
        const state = reactive({
            optionSelected: ""
        });

        const options = [
            {
                supported: false,
                label: "Ledger",
                value: "ledger",
                image: imageLedger
            },
            {
                supported: false,
                label: "FINNEY",
                value: "finney",
                image: imageFinney
            },
            {
                supported: false,
                label: "Digital Bitbox",
                value: "bitbox",
                image: imageBitbox
            },
            {
                supported: true,
                label: "Trezor",
                value: "trezor",
                image: imageTrezor
            },
            {
                supported: false,
                label: "Secalot",
                value: "secalot",
                image: imageSecalot
            },
            {
                supported: false,
                label: "KeepKey",
                value: "keepkey",
                image: imageKeepKey
            }
        ];

        return {
            state,
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
