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
                    placeholder="Wallet PUBLIC address (if any)"
                />
                <TextInput class="issue-item" placeholder="URL" :value="url" />
                <TextArea
                    class="issue-item"
                    placeholder="Describe the issue"
                    :resizeable="true"
                />
                <Button label="Send" class="send-button" :compact="true" />
            </div>
        </template>
    </Modal>
</template>

<script lang="ts">
import Vue from "vue";
import Modal from "../components/Modal.vue";
import Button from "../components/Button.vue";
import TextInput from "../components/TextInput.vue";
import TextArea from "../components/TextArea.vue";

export enum AccessSoftwareOption {
    File = "file",
    Phrase = "phrase",
    Key = "key"
}

export default Vue.extend({
    components: {
        Button,
        Modal,
        TextInput,
        TextArea
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
            optionSelected: null,
            platform: navigator.platform,
            url: location.pathname,
            // fixme: better browser detection?
            browser: navigator.appVersion
        };
    },
    computed: {}
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

.issue-description {
    min-height: 200px;
}
</style>
