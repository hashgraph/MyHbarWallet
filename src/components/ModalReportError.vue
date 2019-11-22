<template>
  <Modal
    :is-open="isOpen"
    hide-decoration
    @change="this.$listeners.change"
  >
    <template>
      <div class="modal-container">
        <div class="header">
          {{ $t("modalReportError.title") }}
        </div>
        <div class="sub-header">
          {{ $t("modalReportError.informMHW") }}
        </div>

        <div class="stack-trace">
          {{ errorMessage }}
        </div>

        <div class="sub-header">
          {{ $t("modalReportError.description") }}
        </div>

        <TextInput
          class="user-details"
          resizable
          multiline
          @input="handleInput"
        />

        <div class="button-group">
          <Button
            class="button-cancel"
            :label="$t('common.cancel')"
            :outline="true"
            :compact="true"
            @click="handleCancel"
          />
          <Button
            class="button-send"
            :label="$t('common.send')"
            :compact="true"
            @click="handleSend"
          />
        </div>
      </div>
    </template>
  </Modal>
</template>

<script lang="ts">
import Modal from "../components/Modal.vue";
import Button from "../components/Button.vue";
import TextInput from "../components/TextInput.vue";
import {
    computed,
    createComponent,
    reactive,
    SetupContext,
    watch
} from "@vue/composition-api";
import { UAParser } from "ua-parser-js";
import { Id } from "../store/modules/wallet";
import { build, createLink } from "../support";
import { getters, mutations, store } from "../store";

// Both of these are defined in vue.config.js.
// VERSION reads from package.json and COMMIT_HASH is git rev-parse --short HEAD output
declare const VERSION: string;
declare const COMMIT_HASH: string;

interface Props {
    isOpen: boolean;
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
    props: { isOpen: Boolean },
    setup(props: Props, context: SetupContext) {
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
            accountId: accountId.value || "",
            details: ""
        });
        /* eslint-enable @typescript-eslint/strict-boolean-expressions */

        // todo [2020-01-01]: Consider how to handle this better
        // eslint-disable-next-line @typescript-eslint/unbound-method
        const errorMessage = computed(getters.errorMessage);

        const sendLink = computed(() => createLink(
            state.url,
            state.platform,
            state.browser,
            state.device,
            state.version,
            state.accountId,
            `${errorMessage.value}
                ${state.details}`
        ));

        function close(): void {
            context.emit("change", false);

            // Wait until the close animation to clear the form
            // todo [2020-01-01]: Consider how to handle this better
            // eslint-disable-next-line @typescript-eslint/unbound-method
            setTimeout(mutations.errorViewed, 150);
        }

        function handleCancel(): void {
            close();
        }

        function handleSend(): void {
            window.open(sendLink.value);
            close();
        }

        function handleInput(text: string): void {
            state.details = text;
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

        return {
            errorMessage,
            handleCancel,
            handleSend,
            handleInput
        };
    }
});
</script>

<style lang="postcss" scoped>
.button-group {
    display: flex;
    justify-content: space-between;
    justify-self: center;
}

.button-cancel,
.button-send {
    width: 120px;

    &:first-child {
        margin-inline-end: 20px;
    }
}

.stack-trace {
    background: rgba(0, 0, 0, 0.05);
    border: 1px solid rgba(0, 0, 0, 0.1);
    color: var(--color-christmas-pink);
    font-family: monospace;
    font-size: 13px;
    margin-block: 40px;
    max-height: 300px;
    min-width: 100%;
    overflow-x: hidden;
    overflow-y: scroll;
    padding: 20px;
}

.user-details {
    margin-block-end: 40px;
    margin-block-start: 20px;
}

.header {
    color: var(--color-ghostlands-coal);
    display: flex;
    font-size: 32px;
    font-weight: 700;
    justify-content: center;
    margin-block-end: 20px;
    text-align: center;
}

.sub-header {
    color: var(--color-china-blue);
    font-size: 14px;
}

.modal-container {
    align-items: center;
    display: flex;
    flex-flow: column;
    padding: 20px;
}
</style>
