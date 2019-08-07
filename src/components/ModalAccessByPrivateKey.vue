<template>
    <Modal
        :is-open="isOpen"
        title="Access by Private Key"
        @change="this.$listeners.change"
    >
        <template v-slot:banner>
            <Warning title="NOT RECOMMENDED">
                This is not a recommended way to access your wallet. Due to the
                Sensitivity of the information involved, these options should
                only be used in offline settings by experienced users.
            </Warning>
        </template>
        <div class="modal-access-by-private-key">
            <TextInput
                placeholder="Enter Private Key"
                :value="userPrivateKey"
                @input="handleKeyUpdate"
            />
            <Button
                class="button-access-wallet"
                label="Access Wallet"
                :disabled="userPrivateKey.length === 0"
            />
            <CustomerSupportLink />
        </div>
    </Modal>
</template>

<script lang="ts">
import Vue from "vue";
import Warning from "../components/Warning.vue";
import TextInput from "../components/TextInput.vue";
import Button from "../components/Button.vue";
import Modal from "../components/Modal.vue";
import CustomerSupportLink from "../components/CustomerSupportLink.vue";

export default Vue.extend({
    components: {
        Button,
        Modal,
        CustomerSupportLink,
        TextInput,
        Warning
    },
    model: {
        prop: "isOpen",
        event: "change"
    },
    props: {
        isOpen: { type: Boolean }
    },
    data() {
        return {
            userPrivateKey: ""
        };
    },
    methods: {
        handleKeyUpdate(key: string) {
            // todo: verify the key is a hedera private key
            // (MEW verifies the key is a proper eth key before enabling the button)
            this.userPrivateKey = key;
        }
    }
});
</script>

<style lang="postcss" scoped>
.modal-access-by-private-key {
    align-items: stretch;
    display: flex;
    flex-direction: column;
}

.button-access-wallet {
    margin-block: 10px 20px;
}
</style>
