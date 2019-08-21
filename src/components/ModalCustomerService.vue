<template>
    <Modal
        :is-open="isOpen"
        title="Issue Information"
        @change="this.$listeners.change"
    >
        <template>
            <form
                class="modal-issue-information"
                @submit.stop.prevent="handleSubmit"
            >
                <TextInput
                    v-model="browser"
                    class="issue-item"
                    placeholder="Browser"
                />
                <TextInput
                    v-model="platform"
                    class="issue-item"
                    placeholder="Operating System"
                />
                <TextInput
                    v-model="device"
                    class="issue-item"
                    placeholder="Device/Wallet type (if any)"
                />
                <TextInput
                    v-model="accountId"
                    class="issue-item"
                    placeholder="Account ID (if any)"
                />
                <TextInput v-model="url" class="issue-item" placeholder="URL" />
                <TextInput
                    v-model="description"
                    multiline
                    class="issue-item"
                    placeholder="Describe the issue"
                    resizable
                />
                <!-- <a :href="sendLink"> -->
                <Button label="Send" class="send-button" :compact="true" />
                <!-- </a> -->
            </form>
        </template>
    </Modal>
</template>

<script lang="ts">
import Modal from "../components/Modal.vue";
import Button from "../components/Button.vue";
import TextInput from "../components/TextInput.vue";
import { UAParser } from "ua-parser-js";
import {
    createComponent,
    PropType,
    value,
    computed,
    watch,
    onUpdated
} from "vue-function-api";

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
    setup(props) {
        const ua = new UAParser(navigator.userAgent);
        const platform = value(ua.getOS.name);
        const browser = value(ua.getBrowser().name || "");
        const url = value(location.pathname);
        const description = value("");
        const device = value("");
        const accountId = value("");

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

        function handleSubmit() {
            window.open(sendLink.value);
        }

        // onUpdated(() => {
        //     url.value = location.pathname;
        // });

        // watch(() => props.isOpen, () => (url.value = location.pathname));

        return {
            platform,
            browser,
            url,
            device,
            accountId,
            description,
            sendLink,
            handleSubmit
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
