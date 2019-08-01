<template>
    <Modal is-open title="Access by hardware">
        <div class="modal-access-by-hardware">
            <RadioButtonGroup
                v-model="selected"
                :name="name"
                :options="options"
            />
            <Button
                class="button-choose-a-hardware"
                label="Choose a Hardware"
            />
            <CustomerSupportLink />
        </div>
    </Modal>
</template>

<script lang="ts">
import Vue from "vue";
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

export default Vue.extend({
    components: {
        RadioButtonGroup,
        Button,
        Modal,
        CustomerSupportLink
    },
    computed: {
        options() {
            return [
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
        }
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
    margin: 20px 0;
}
</style>
