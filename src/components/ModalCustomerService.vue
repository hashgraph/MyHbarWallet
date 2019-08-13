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
                    @input="handleBrowserInput"
                />
                <TextInput
                    class="issue-item"
                    placeholder="Operating System"
                    :value="platform"
                    @input="handlePlatformInput"
                />
                <TextInput
                    class="issue-item"
                    placeholder="Device/Wallet type (if any)"
                    :value="device"
                    @input="handleDeviceInput"
                />
                <TextInput
                    class="issue-item"
                    placeholder="Account ID (if any)"
                    :value="accountId"
                    @input="handleAccountIdInput"
                />
                <TextInput class="issue-item" placeholder="URL" :value="url" />
                <TextInput
                    multiline
                    class="issue-item"
                    placeholder="Describe the issue"
                    resizable
                    :value="description"
                    @input="handleDescriptionInput"
                />
                <a :href="sendLink">
                    <Button label="Send" class="send-button" :compact="true" />
                </a>
            </div>
        </template>
    </Modal>
</template>

<script lang="ts">
import Modal from "../components/Modal.vue";
import Button from "../components/Button.vue";
import TextInput from "../components/TextInput.vue";
import { UAParser } from "ua-parser-js";
import { createComponent, PropType, value, computed } from "vue-function-api";

function createLink(
    url: string,
    platform: string,
    browser: string,
    device: string,
    accountId: string,
    description: string
): string {
    const subjectTemplate = `Issue on ${url}`;
    const bodyTemplate = `Browser: ${browser}
OS: ${platform}
Device: ${device}
AccountID: ${accountId}
URL: ${url}


${description}
`;
    return `mailto:contact@myhbarwallet.com?subject=${encodeURIComponent(
        subjectTemplate
    )}&body=${encodeURIComponent(bodyTemplate)}`;
}

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
        const platform = value(ua.getOS.name);
        const browser = value(ua.getBrowser().name || "");
        const url = value(location.pathname);
        const description = value("");
        const device = value("");
        const accountId = value("");
        function handleBrowserInput(input: string) {
            browser.value = input;
        }

        function handlePlatformInput(input: string) {
            platform.value = input;
        }

        function handleDeviceInput(input: string) {
            device.value = input;
        }

        function handleAccountIdInput(input: string) {
            accountId.value = input;
        }

        function handleDescriptionInput(input: string) {
            description.value = input;
        }

        const sendLink = computed(() =>
            createLink(
                url.value,
                platform.value,
                browser.value,
                device.value,
                accountId.value,
                description.value
            )
        );

        return {
            platform,
            browser,
            url,
            device,
            accountId,
            description,
            sendLink,
            handleBrowserInput,
            handlePlatformInput,
            handleDeviceInput,
            handleAccountIdInput,
            handleDescriptionInput
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
