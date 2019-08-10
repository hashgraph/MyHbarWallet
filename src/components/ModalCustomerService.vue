<template>
    <Modal
        :is-open="isOpen"
        title="Issue Information"
        @change="this.$listeners.change"
    >
        <template>
            <div class="modal-issue-information">
                <TextInput
                    class="issue-item"
                    placeholder="Browser"
                    :value="browser"
                />
                <TextInput
                    class="issue-item"
                    placeholder="Operating System"
                    :value="platform"
                />
                <TextInput
                    class="issue-item"
                    placeholder="Device/Wallet type (if any)"
                />
                <TextInput
                    class="issue-item"
                    placeholder="Account ID (if any)"
                />
                <TextInput class="issue-item" placeholder="URL" :value="url" />
                <TextInput
                    multiline
                    class="issue-item"
                    placeholder="Describe the issue"
                    resizable
                />
                <Button label="Send" class="send-button" :compact="true" />
            </div>
        </template>
    </Modal>
</template>

<script lang="ts">
import Modal from "../components/Modal.vue";
import Button from "../components/Button.vue";
import TextInput from "../components/TextInput.vue";
import { UAParser } from "ua-parser-js";
import { createComponent, PropType } from "vue-function-api";

export default createComponent({
    components: {
        Button,
        Modal,
        TextInput
    },
    model: {
        prop: "isOpen",
        event: "change"
    },
    props: {
        isOpen: (Boolean as unknown) as PropType<boolean>
    },
    setup() {
        const ua = new UAParser(navigator.userAgent);

        return {
            platform: ua.getOS().name,
            browser: ua.getBrowser().name,
            url: location.pathname
        };
    }
});
</script>

<style lang="postcss" scoped>
.modal-issue-information {
    align-items: stretch;
    display: flex;
    flex-direction: column;
}

.send-button {
    margin: 0 auto;
}

.issue-item {
    margin-block-end: 15px;
}
</style>
