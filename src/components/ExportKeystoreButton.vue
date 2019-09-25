<template>
    <span class="download-button">
        <Tooltip :message="$t('exportKeystoreButton.message')">
            <MaterialDesignIcon
                :icon="mdiFileDownload"
                class="export-keystore-icon"
                @click="handleClick"
            />
        </Tooltip>
        <ModalExportGenerateKeystore
            v-model="state.modalExportGenerateKeystoreState"
            @submit="handleExportByKeystoreSubmit"
        />
        <ModalExportDownloadKeystore
            v-model="state.modalExportDownloadKeystoreState"
            @submit="handleExportKeystoreSubmit"
        />
    </span>
</template>

<script lang="ts">
import {
    createComponent,
    reactive,
    Ref,
    ref,
    SetupContext
} from "@vue/composition-api";
import Tooltip from "./Tooltip.vue";
import MaterialDesignIcon from "./MaterialDesignIcon.vue";
import { mdiFileDownload } from "@mdi/js";
import store from "../store";
import ModalExportGenerateKeystore, {
    State as ModalExportGenerateKeystoreState
} from "./ModalExportGenerateKeystore.vue";
import ModalExportDownloadKeystore, {
    State as ModalExportDownloadKeystoreState
} from "./ModalExportDownloadKeystore.vue";
import { ALERT } from "../store/actions";

export interface State {
    modalExportGenerateKeystoreState: ModalExportGenerateKeystoreState;
    modalExportDownloadKeystoreState: ModalExportDownloadKeystoreState;
}

export default createComponent({
    components: {
        Tooltip,
        MaterialDesignIcon,
        ModalExportGenerateKeystore,
        ModalExportDownloadKeystore
    },
    props: {
        privateKey: String
    },
    setup(props: { privateKey: string }, context: SetupContext) {
        const state = reactive<State>({
            modalExportGenerateKeystoreState: {
                isOpen: false,
                isBusy: false,
                passwordGeneratorState: {
                    password: "",
                    confirmationPassword: "",
                    passwordStrength: 0,
                    passwordSuggestion: ""
                }
            },
            modalExportDownloadKeystoreState: {
                isOpen: false,
                isBusy: false
            }
        });

        const keyFile: Ref<Uint8Array | null> = ref(null);
        const keystoreLink: Ref<HTMLAnchorElement | null> = ref(null);

        async function handleExportByKeystoreSubmit(): Promise<void> {
            state.modalExportGenerateKeystoreState.isOpen = false;
            setTimeout(() => {
                state.modalExportDownloadKeystoreState.isOpen = true;
            }, 125);

            try {
                const { Ed25519PrivateKey } = await (import(
                    "@hashgraph/sdk"
                ) as Promise<typeof import("@hashgraph/sdk")>);

                if (props.privateKey == null) {
                    throw new Error("Private Key is null");
                }

                keyFile.value = await Ed25519PrivateKey.fromString(
                    props.privateKey
                ).createKeystore(
                    state.modalExportGenerateKeystoreState
                        .passwordGeneratorState.password
                );

                if (keyFile.value === null) {
                    throw new Error("Generated Keystore is null");
                }

                state.modalExportDownloadKeystoreState.isBusy = false;

                const keystoreBlob = new Blob([
                    keyFile.value.buffer as Uint8Array
                ]);

                const keystoreUrl = URL.createObjectURL(keystoreBlob);

                keystoreLink.value = document.createElement(
                    "a"
                ) as HTMLAnchorElement;
                keystoreLink.value.href = keystoreUrl;
                keystoreLink.value.download =
                    "keystore-" + new Date().toISOString();

                keystoreLink.value.href = keystoreUrl;
                keystoreLink.value.download =
                    "keystore-" + new Date().toISOString();
            } catch (error) {
                await store.dispatch(ALERT, {
                    level: "error",
                    message: context.root
                        .$t("modalExportGenerateKeystore.couldNotGenerate")
                        .toString()
                });
                throw error;
            }
        }

        function handleExportKeystoreSubmit(): void {
            context.root.$el.append(keystoreLink.value as Node);

            if (keystoreLink.value == null || props.privateKey == null) {
                return;
            }

            keystoreLink.value.click();
            context.root.$el.removeChild(
                keystoreLink.value as HTMLAnchorElement
            );

            // close modals
            state.modalExportGenerateKeystoreState.isOpen = false;
            state.modalExportDownloadKeystoreState.isOpen = false;
            setTimeout(() => {
                // reset ExportByKeystore Modal
                state.modalExportGenerateKeystoreState.passwordGeneratorState.password =
                    "";
                state.modalExportGenerateKeystoreState.passwordGeneratorState.confirmationPassword =
                    "";
                state.modalExportGenerateKeystoreState.isBusy = false;
                state.modalExportGenerateKeystoreState.passwordGeneratorState.passwordStrength = 0;
                state.modalExportGenerateKeystoreState.passwordGeneratorState.passwordSuggestion =
                    "";
            }, 125);
        }

        function handleClick(): void {
            state.modalExportGenerateKeystoreState.isOpen = true;
        }

        return {
            mdiFileDownload,
            props,
            state,
            handleClick,
            handleExportByKeystoreSubmit,
            handleExportKeystoreSubmit
        };
    }
});
</script>
