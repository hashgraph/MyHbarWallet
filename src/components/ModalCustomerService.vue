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
          v-if="!hasBrowser"
          v-model="state.browser"
          class="issue-item"
          :placeholder="$t('modalCustomerService.browser')"
        />
        <TextInput
          v-if="!hasPlatform"
          v-model="state.platform"
          class="issue-item"
          :placeholder="$t('modalCustomerService.operatingSystem')"
        />
        <TextInput
          v-if="!hasDevice"
          v-model="state.device"
          class="issue-item"
          :placeholder="
            $t('modalCustomerService.deviceOrWalletIfAny')
          "
        />
        <TextInput
          v-if="!hasAccountId"
          v-model="state.accountId"
          class="issue-item"
          :placeholder="$t('modalCustomerService.accountIdIfAny')"
        />
        <TextInput
          v-if="!hasUrl"
          v-model="state.url"
          class="issue-item"
          :placeholder="$t('modalCustomerService.url')"
        />
        <TextInput
          ref="input"
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
    reactive,
    ref
} from "@vue/composition-api";
import { Id } from "../store/modules/wallet";
import { build, createLink } from "../support";
import { store } from "../store";

// Both of these are defined in vue.config.js.
// VERSION reads from package.json and COMMIT_HASH is git rev-parse --short HEAD output
declare const VERSION: string;
declare const COMMIT_HASH: string;

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
    props: { isOpen: (Boolean as unknown) as PropType<boolean> },
    setup(props, context) {
        const input = ref<HTMLInputElement | null>(null);
        const ua = new UAParser(navigator.userAgent);

        const account = computed(() => store.state.wallet.session != null ?
            store.state.wallet.session.account :
            null);

        const accountId = computed(() => {
            if (account.value !== null) {
                const accountId: Id = account.value;
                return (
                    `${accountId.shard
                    }.${
                        accountId.realm
                    }.${
                        accountId.account}`
                );
            }

            return null;
        });

        const platform = computed(() => {
            if (navigator.userAgent.indexOf("(darwin)") > 0) {
                // This is running in Node on macOS
                return "Mac OS";
            }

            const name = ua.getOS().name;
            const version = ua.getOS().version;

            return build(name, version);
        });

        const browser = computed(() => {
            const name = ua.getBrowser().name;
            const version = ua.getBrowser().version;
            return build(name, version);
        });

        const url = computed(() => typeof context.root.$route !== "undefined" ?
            context.root.$route.fullPath :
            null);

        const device = computed(() => {
            const type = ua.getDevice().type;
            const model = ua.getDevice().model;
            return build(type, model);
        });

        // todo [2020-01-01]: Consider removing or revising this lint rule
        /* eslint-disable @typescript-eslint/strict-boolean-expressions */
        const state = reactive({
            platform: platform.value || "",
            browser: browser.value || "",
            url: url.value,
            description: "",
            device: device.value || "",
            version: `v${VERSION}+${COMMIT_HASH}`,
            accountId: accountId.value || ""
        });
        /* eslint-enable @typescript-eslint/strict-boolean-expressions */

        const sendLink = computed(() => createLink(
            state.url,
            state.platform,
            state.browser,
            state.device,
            state.version,
            state.accountId,
            state.description
        ));

        function handleSubmit(): void {
            window.open(sendLink.value);
        }

        function clearForms(): void {
            state.device = "";
            state.accountId = "";
            state.description = "";
        }

        // When the route is updated, reset the path value
        watch(
            () => context.root.$route,
            () => {
                if (typeof context.root.$route === "undefined") return null;

                state.url = context.root.$route.fullPath;
                return state.url;
            }
        );

        watch(
            () => props.isOpen,
            (newVal) => {
                if (newVal === true && input.value !== null) {
                    input.value.focus();
                }
                if (newVal !== true) {
                    clearForms();
                }
            }
        );

        return {
            hasAccountId: accountId.value !== null,
            hasPlatform: platform.value !== null,
            hasBrowser: browser.value !== null,
            hasUrl: url.value !== null,
            hasDevice: device.value !== null,
            state,
            sendLink,
            handleSubmit,
            input
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
