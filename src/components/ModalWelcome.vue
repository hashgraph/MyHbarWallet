<template>
    <Modal :is-open="isOpen" hide-decoration @change="this.$listeners.change">
        <div class="modal-welcome">
            <div class="close-container">
                <MaterialDesignIcon
                    class="icon"
                    :icon="mdiClose"
                    @click="handleDismiss"
                />
            </div>
            <div class="title">{{ $t("modalWelcome.title") }}</div>
            <div class="content">
                {{ $t("modalWelcome.getDesktop") }}
            </div>
            <a class="button-download-link" :href="link">
                <Button
                    class="button-download"
                    :label="label"
                    :trailing-icon="icon"
                />
            </a>
            <a
                class="other-platforms"
                href="https://github.com/hashgraph/MyHbarWallet/releases/tag/v0.3.3"
            >
                {{ $t("modalWelcome.otherPlatforms") }}
            </a>
        </div>
    </Modal>
</template>

<script lang="ts">
import Button from "../components/Button.vue";
import Modal from "../components/Modal.vue";
import MaterialDesignIcon from "../components/MaterialDesignIcon.vue";
import { mdiWindows, mdiLinux, mdiApple, mdiClose } from "@mdi/js";
import {
    createComponent,
    PropType,
    SetupContext,
    computed
} from "@vue/composition-api";

interface Props {
    isOpen: boolean;
    platform: string;
}

export default createComponent({
    components: {
        Button,
        Modal,
        MaterialDesignIcon
    },
    model: {
        prop: "isOpen",
        event: "change"
    },
    props: {
        isOpen: (Boolean as unknown) as PropType<boolean>,
        platform: String
    },
    setup(props: Props, context: SetupContext) {
        function handleDismiss(): void {
            context.emit("change", !props.isOpen);
        }

        const link = computed(() => {
            if (props.platform === "Mac OS") {
                return "https://github.com/hashgraph/MyHbarWallet/releases/download/v0.3.3/MyHbarWallet-0.3.3.dmg";
            }
            if (props.platform === "Windows") {
                return "https://github.com/hashgraph/MyHbarWallet/releases/download/v0.3.3/MyHbarWallet.Setup.0.3.3.exe";
            }
            if (props.platform === "Linux") {
                return "https://github.com/hashgraph/MyHbarWallet/releases/download/v0.3.3/myhbarwallet_0.3.3_amd64.deb";
            }
            return "https://github.com/hashgraph/MyHbarWallet/releases/tag/v0.3.3";
        });

        const icon = computed(() => {
            if (props.platform === "Mac OS") {
                return mdiApple;
            }
            if (props.platform === "Windows") {
                return mdiWindows;
            }
            if (props.platform === "Linux") {
                return mdiLinux;
            }
        });

        const label = `${context.root.$t("modalWelcome.download")} ${
            props.platform
        }`;

        return {
            link,
            mdiClose,
            icon,
            label,
            handleDismiss
        };
    }
});
</script>

<style lang="postcss" scoped>
.button-download {
    min-width: initial;
    width: 100%;
}

.button-download-link {
    margin-block-end: 15px;
    min-width: initial;

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
    margin-block-start: 0;
}

.other-platforms {
    color: var(--color-melbourne-cup);
    cursor: pointer;
    text-align: center;
    text-decoration: none;

    &:hover,
    &:focus {
        text-decoration: underline;
    }
}

.close-container {
    display: flex;
    justify-content: flex-end;
    margin-block-start: -23px;
    margin-inline-end: -26px;
}
</style>
