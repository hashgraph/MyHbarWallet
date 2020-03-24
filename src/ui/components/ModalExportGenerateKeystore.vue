<template>
    <div class="modal-export-generate-keystore">
        <Modal
            :is-open="state.isOpen"
            :title="$t('modalExportGenerateKeystore.title')"
            @change="handleModalChangeIsOpen"
        >
            <div class="password-info-header-wrapper">
                <div class="password-info-header">
                    {{ $t("modalExportGenerateKeystore.yourPassword") }}
                    <InfoButton :message="$t('common.password.thisPassword')" />
                </div>
            </div>
            <PasswordGenerator
                @submit="handleSubmitPassword"
            />
            <p
                class="footer"
                v-html="
                    formatRich(
                        $t(
                            'modalCreateByKeystore.doNotForgetToSaveYourPassword'
                        ).toString(),
                        { strongClass: 'important' }
                    )
                "
            />
        </Modal>
    </div>
</template>

<script lang="ts">
import { defineComponent, PropType, SetupContext } from "@vue/composition-api";
import { mdiArrowRight } from "@mdi/js";

import { formatRich } from "../../service/format";

import Modal from "./Modal.vue";
import InfoButton from "./InfoButton.vue";
import PasswordGenerator from "./PasswordGenerator.vue";

export interface State {
    isOpen: boolean;
    isBusy: boolean;
}

interface Props {
    state: State;
}

export default defineComponent({
    components: {
        Modal,
        InfoButton,
        PasswordGenerator
    },
    model: {
        prop: "state",
        event: "change"
    },
    props: { state: (Object as unknown) as PropType<State> },
    setup(props: Props, context: SetupContext) {
        function handleModalChangeIsOpen(isOpen: boolean): void {
            context.emit("change", { ...props.state, isOpen });
            context.listeners.change();
        }

        function handleSubmitPassword(password: string): void {
            context.emit("submit", password);
        }

        return {
            handleModalChangeIsOpen,
            handleSubmitPassword,
            mdiArrowRight,
            formatRich
        };
    }
});
</script>

<style lang="postcss" scoped>
.password-info-header-wrapper {
    color: var(--color-washed-black);
    display: flex;
    justify-content: space-around;
}

.password-info-header {
    display: inline;
    font-size: 20px;
    font-weight: 500;
    padding-block-end: 40px;
}

.footer {
    color: var(--color-china-blue);
    font-size: 14px;
    margin: 0;
    padding: 0;
    text-align: center;

    & >>> .important {
        color: var(--color-lightish-red);
        font-weight: 500;
    }
}
</style>
