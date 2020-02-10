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
          :placeholder="$t('modalCustomerService.browser')"
          class="issue-item"
        />
        <TextInput
          v-if="!hasPlatform"
          v-model="state.platform"
          :placeholder="$t('modalCustomerService.operatingSystem')"
          class="issue-item"
        />
        <TextInput
          v-if="!hasDevice"
          v-model="state.device"
          :placeholder="
            $t('modalCustomerService.deviceOrWalletIfAny')
          "
          class="issue-item"
        />
        <TextInput
          v-if="!hasAccountId"
          v-model="state.accountId"
          :placeholder="$t('modalCustomerService.accountIdIfAny')"
          class="issue-item"
        />
        <TextInput
          v-if="!hasUrl"
          v-model="state.url"
          :placeholder="$t('modalCustomerService.url')"
          class="issue-item"
        />
        <TextInput
          ref="input"
          v-model="state.description"
          :placeholder="$t('modalCustomerService.describeTheIssue')"
          class="issue-item"
          multiline
          resizable
        />
        <Button
          :compact="true"
          :label="$t('common.send')"
          class="send-button"
        />
      </form>
    </template>
  </Modal>
</template>

<script lang="ts">
import { UAParser } from "ua-parser-js";
import { computed, createComponent, reactive, ref, watch } from "@vue/composition-api";

import { store } from "../store";
import { build, createLink } from "../support";

import Button from "./Button.vue";
import Modal from "./Modal.vue";
import TextInput from "./TextInput.vue";

// Both of these are defined in vue.config.js.
// VERSION reads from package.json and COMMIT_HASH is git rev-parse --short HEAD output
declare const VERSION: string;
declare const COMMIT_HASH: string;

export default createComponent({
    name: "ModalCustomerService",
    components: {
        Button,
        Modal,
        TextInput
    },
    model: {
        prop: "isOpen",
        event: "change"
    },
    props: { isOpen: Boolean },
    setup(props, context) {
        const input = ref<HTMLInputElement | null>(null);
        const ua = new UAParser(navigator.userAgent);

        const account = computed(() => store.state.wallet.session != null ?
            store.state.wallet.session.account :
            null);

        const accountId = computed(() => {
            if (account.value != null) {
                const accountId: import("@hashgraph/sdk").AccountId =
                        account.value;
                return `${accountId.shard}.${accountId.realm}.${accountId.account}`;
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

        const url = computed(() => context.root.$route != null ?
            context.root.$route.fullPath :
            null);

        const device = computed(() => {
            const type = ua.getDevice().type;
            const model = ua.getDevice().model;
            return build(type, model);
        });

        const state = reactive({
            platform: platform.value || "",
            browser: browser.value || "",
            url: url.value,
            description: "",
            device: device.value || "",
            version: `v${VERSION}+${COMMIT_HASH}`,
            accountId: accountId.value || ""
        });

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
            (): void => {
                if (context.root.$route == null) return;
                state.url = context.root.$route.fullPath;
            }
        );

        watch(
            () => props.isOpen,
            (newVal) => {
                if (newVal && input.value) {
                    input.value.focus();
                }
                if (!newVal) {
                    clearForms();
                }
            }
        );

        return {
            hasAccountId: accountId.value != null,
            hasPlatform: platform.value != null,
            hasBrowser: browser.value != null,
            hasUrl: url.value != null,
            hasDevice: device.value != null,
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
