<template>
    <Modal :is-open="isOpen" hide-decoration @change="this.$listeners.change">
        <template>
            <div class="modal-container">
                <div class="header">Something went wrong.</div>
                <div class="sub-header">
                    Do you want to inform MHW about this error?
                </div>

                <div class="stack-trace">
                    {{ errorMessage }}
                </div>

                <div class="button-group">
                    <Button
                        class="button-cancel"
                        label="Cancel"
                        :outline="true"
                        :compact="true"
                        @click="handleCancel"
                    />
                    <Button
                        class="button-send"
                        label="Send"
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
import {
    computed,
    createComponent,
    reactive,
    SetupContext,
    watch
} from "@vue/composition-api";
import store from "../store";
import { ERROR_MESSAGE } from "../store/getters";
import { ERROR_VIEWED } from "../store/mutations";
import { UAParser } from "ua-parser-js";
import { Id } from "../store/modules/wallet";
import { build, createLink } from "../support";

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
        Modal
    },
    model: {
        prop: "isOpen",
        event: "change"
    },
    props: {
        isOpen: Boolean
    },
    setup(props: Props, context: SetupContext) {
        const ua = new UAParser(navigator.userAgent);

        const account = computed(() => {
            return store.state.wallet.session != null
                ? store.state.wallet.session.account
                : null;
        });

        const accountId = computed(() => {
            if (account.value !== null) {
                const accountId: Id = account.value;
                return (
                    accountId.shard +
                    "." +
                    accountId.realm +
                    "." +
                    accountId.account
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

        const url = computed(() => {
            return context.root.$route != undefined
                ? context.root.$route.fullPath
                : null;
        });

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
            version: "v" + VERSION + "+" + COMMIT_HASH,
            accountId: accountId.value || ""
        });

        const errorMessage = computed((): string => {
            return store.getters[ERROR_MESSAGE]!;
        });

        const sendLink = computed(() =>
            createLink(
                state.url,
                state.platform,
                state.browser,
                state.device,
                state.version,
                state.accountId,
                errorMessage.value
            )
        );

        function handleCancel(): void {
            context.emit("change", false);

            setTimeout(() => {
                store.commit(ERROR_VIEWED);
            }, 0);
        }

        function handleSend(): void {
            window.open(sendLink.value);

            context.emit("change", false);

            setTimeout(() => {
                store.commit(ERROR_VIEWED);
            }, 0);
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
            errorMessage,
            handleCancel,
            handleSend
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
