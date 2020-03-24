<template>
    <Modal
        :is-open="isOpen"
        hide-decoration
        @change="onChange"
    >
        <div class="modal-welcome">
            <div class="close-container">
                <MaterialDesignIcon
                    class="icon"
                    :icon="mdiClose"
                    @click="handleDismiss"
                />
            </div>
            <div class="title">
                {{ $t("modalWelcome.title") }}
            </div>
            <div class="content">
                {{ $t("modalWelcome.getDesktop") }}
            </div>
            <a
                class="button-download-link"
                :href="link"
            >
                <Button
                    v-if="platform != null"
                    class="button-download"
                    :label="label"
                    :trailing-icon="icon"
                />
                <Button
                    v-else
                    class="button-download"
                    :label="noPlatLabel"
                    :trailing-icon="icon"
                />
            </a>
            <a
                v-if="link !== defaultLink"
                class="other-platforms"
                href="https://github.com/hashgraph/MyHbarWallet/releases/tag/v0.5.0"
            >
                {{ $t("modalWelcome.otherPlatforms") }}
            </a>
        </div>
    </Modal>
</template>

<script lang="ts">
import { mdiApple, mdiClose, mdiDebian, mdiFedora, mdiLinux, mdiRedhat, mdiUbuntu, mdiWindows } from "@mdi/js";
import { computed, defineComponent, SetupContext, onMounted, reactive } from "@vue/composition-api";

import Button from "./Button.vue";
import Modal from "./Modal.vue";
import MaterialDesignIcon from "./MaterialDesignIcon.vue";

interface Props {
    isOpen: boolean;
}

export default defineComponent({
    components: {
        Button,
        Modal,
        MaterialDesignIcon
    },
    model: {
        prop: "isOpen",
        event: "change"
    },
    props: { isOpen: Boolean },
    setup(props: Props, context: SetupContext) {
        const state = reactive({ platform: "" });

        function handleDismiss(): void {
            context.emit("change", !props.isOpen);
        }

        const ver = "0.5.0";

        onMounted(async() => {
            const platform = (await import(/* webpackChunkName: "platform" */ "platform"))[ "default" ];
            state.platform = platform.os!.family!;
        });

        const defaultLink = `https://github.com/hashgraph/MyHbarWallet/releases/tag/v${ver}`;

        const link = computed(() => {
            if (state.platform === "Mac OS" || state.platform === "OS X") {
                return `https://github.com/hashgraph/MyHbarWallet/releases/download/v${ver}/MyHbarWallet-${ver}.dmg`;
            }
            if (state.platform === "Windows") {
                return `https://github.com/hashgraph/MyHbarWallet/releases/download/v${ver}/MyHbarWallet.Setup.${ver}.exe`;
            }
            if (state.platform === "Ubuntu" || state.platform === "Debian") {
                return `https://github.com/hashgraph/MyHbarWallet/releases/download/v${ver}/myhbarwallet_${ver}_amd64.deb`;
            }
            if (
                state.platform === "Fedora" ||
                state.platform === "Red Hat" ||
                state.platform === "SuSE"
            ) {
                return `https://github.com/hashgraph/MyHbarWallet/releases/download/v${ver}/myhbarwallet-${ver}.x86_64.rpm`;
            }
            return defaultLink;
        });

        const icon = computed(() => {
            if (state.platform === "Mac OS" || state.platform === "OS X") {
                return mdiApple;
            }
            if (state.platform === "Windows") {
                return mdiWindows;
            }
            if (state.platform === "Ubuntu") {
                return mdiUbuntu;
            } else if (state.platform === "Debian") {
                return mdiDebian;
            } else if (state.platform === "Fedora") {
                return mdiFedora;
            } else if (state.platform === "Red Hat") {
                return mdiRedhat;
            } else if (state.platform === "Linux") {
                return mdiLinux;
            }

            return mdiLinux;
        });

        const label = `${context.root.$t("modalWelcome.download")} ${
            state.platform
        }`;

        const noPlatLabel = context.root.$t("modalWelcome.noPlatDownload");

        function onChange(): void {
            context.emit("change");
            context.listeners.change();
        }

        return {
            platform: state.platform,
            link,
            mdiClose,
            icon,
            label,
            handleDismiss,
            noPlatLabel,
            defaultLink,
            onChange
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
    margin-block-start: 15px;
    text-align: center;
    text-decoration: none;

    &:hover,
    &:focus {
        text-decoration: underline;
    }
}

.close-container {
    cursor: pointer;
    display: flex;
    justify-content: flex-end;
    margin-block-start: -23px;
    margin-inline-end: -26px;
}
</style>
