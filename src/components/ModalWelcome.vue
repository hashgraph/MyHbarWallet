<template>
    <Modal :is-open="isOpen" hide-decoration @change="this.$listeners.change">
        <div class="modal-welcome">
            <div class="title">{{ $t("modalWelcome.title") }}</div>
            <div v-if="!isElectron" class="content">
                {{ $t("modalWelcome.getDesktop") }}
            </div>
            <div class="button-group">
                <a class="button-download-link" :href="link">
                    <Button
                        class="button-download"
                        :label="$t('modalWelcome.download')"
                    />
                </a>
                <Button
                    class="button-dismiss"
                    :label="$t('modalWelcome.dismiss')"
                    @click="handleDismiss"
                />
            </div>
        </div>
    </Modal>
</template>

<script lang="ts">
import Button from "../components/Button.vue";
import Modal from "../components/Modal.vue";
import { UAParser } from "ua-parser-js";
import {
    createComponent,
    PropType,
    SetupContext,
    computed
} from "@vue/composition-api";

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
        isOpen: (Boolean as unknown) as PropType<boolean>
    },
    setup(props: Props, context: SetupContext) {
        const ua = new UAParser(navigator.userAgent);

        function handleDismiss(): void {
            context.emit("change", !props.isOpen);
        }

        const platform = computed(() => {
            if (navigator.userAgent.indexOf("(darwin)") > 0) {
                // This is running in Node on macOS
                return "Mac OS";
            }

            const name = ua.getOS().name;

            return name;
        });

        const link = computed(() => {
            if (platform.value === "Mac OS") {
                return "https://github.com/hashgraph/MyHbarWallet/releases/download/v0.3.3/MyHbarWallet-0.3.3.dmg";
            }
            if (platform.value === "Windows") {
                return "https://github.com/hashgraph/MyHbarWallet/releases/download/v0.3.3/MyHbarWallet.Setup.0.3.3.exe";
            }
            return "https://github.com/hashgraph/MyHbarWallet/releases/tag/v0.3.3";
        });

        const isElectron = computed(() => {
            // todo [2019-15-11]: actually detect if this is electron.
            return false;
        });

        return {
            link,
            isElectron,
            handleDismiss
        };
    }
});
</script>

<style lang="postcss" scoped>
.button-group {
    display: flex;
    justify-content: space-between;
    justify-self: center;

    @media (max-width: 600px) {
        align-items: center;
        flex-direction: column;
    }
}

.button-download {
    min-width: initial;
    width: 100%;
}

.button-download-link,
.button-dismiss {
    min-width: initial;
    width: 48.2%;

    @media (max-width: 600px) {
        width: 100%;

        &:first-child {
            margin-block-end: 15px;
        }
    }
}

.modal-welcome {
    display: flex;
    flex-direction: column;
}

.title,
.content {
    color: var(--color-washed-black);
    text-align: center;
}

.content {
    margin-block-end: 25px;
}

.title {
    font-size: 25px;
    font-weight: 700;
    margin-block-end: 15px;
    margin-block-start: 10px;
}
</style>
