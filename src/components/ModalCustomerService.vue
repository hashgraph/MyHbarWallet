<template>
    <Modal
        :is-open="isOpen"
        :title="$t('modalCustomerService.title')"
        @change="this.$listeners.change"
    >
        <template>
            <form
                class="modal-issue-information"
                @submit.prevent="handleSubmit"
            >
                <TextInput
                    v-model="state.browser"
                    class="issue-item"
                    :placeholder="$t('modalCustomerService.browser')"
                />
                <TextInput
                    v-model="state.platform"
                    class="issue-item"
                    :placeholder="$t('modalCustomerService.operatingSystem')"
                />
                <TextInput
                    v-model="state.device"
                    class="issue-item"
                    :placeholder="
                        $t('modalCustomerService.deviceOrWalletIfAny')
                    "
                />
                <TextInput
                    v-model="state.accountId"
                    class="issue-item"
                    :placeholder="$t('modalCustomerService.accountIdIfAny')"
                />
                <TextInput
                    v-model="state.url"
                    class="issue-item"
                    :placeholder="$t('modalCustomerService.url')"
                />
                <TextInput
                    v-model="state.description"
                    multiline
                    class="issue-item"
                    :placeholder="$t('modalCustomerService.describeTheIssue')"
                    resizable
                />
                <Button
                    :label="$t('common.send')"
                    class="send-button"
                    :compact="true"
                />
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
    computed,
    watch,
    reactive
} from "@vue/composition-api";

function createLink(
    url: string | null,
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
    return `mailto:support@myhbarwallet.com?subject=${encodeURIComponent(
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
    setup(props, context) {
        const ua = new UAParser(navigator.userAgent);
        const state = reactive({
            platform: ua.getOS.name,
            browser: ua.getBrowser().name || "",
            url:
                context.root.$route != undefined
                    ? context.root.$route.fullPath
                    : null,
            description: "",
            device: "",
            accountId: ""
        });

        const sendLink = computed(() =>
            createLink(
                state.url,
                state.platform,
                state.browser,
                state.device,
                state.accountId,
                state.description
            )
        );

        function handleSubmit(): void {
            window.open(sendLink.value);
        }

        // When the route is updated, reset the path value
        watch(
            () => context.root.$route,
            () => {
                if (context.root.$route == undefined) return null;

                state.url = context.root.$route.fullPath;
            }
        );

        return {
            state,
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
