<template>
    <Modal
        :is-open="isOpen"
        :large="false"
        title="Request to Create Account"
        @change="this.$listeners.change"
    >
        <div class="modal-contents">
            <qrcode-vue
                value="hello hedera"
                size="300"
                level="H"
                class="pub-qr"
            />

            <TextInput class="input key-input" placeholder="Enter Public Key" />

            <Button label="copy" class="modal-button" />

            <div class="have-id">
                <router-link to="/">
                    I have my AccountId!
                </router-link>
            </div>
        </div>
    </Modal>
</template>

<script lang="ts">
import Vue from "vue";
import Modal from "@/components/Modal.vue";
import TextInput from "@/components/TextInput.vue";
import Button from "@/components/Button.vue";
import { createComponent, PropType } from "vue-function-api";
import QrcodeVue from "qrcode.vue";

export default createComponent({
    components: {
        Modal,
        TextInput,
        Button,
        QrcodeVue
    },
    model: {
        prop: "isOpen",
        event: "change"
    },
    props: {
        isOpen: (Boolean as unknown) as PropType<boolean>
    }
});
</script>

<style lang="postcss" scoped>
.modal-contents {
    display: flex;
    flex-flow: column nowrap;
}

.modal-button {
    margin: 0 auto;
}

.key-input {
    padding-block-end: 30px;
}

.pub-qr {
    margin: 0 auto;
    padding-block-end: 30px;
}

.have-id {
    color: var(--color-china-blue);
    font-size: 14px;
    margin: 0 auto;
    padding-block-start: 12px;
}
</style>
