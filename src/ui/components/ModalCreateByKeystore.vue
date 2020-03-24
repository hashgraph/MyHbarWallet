<template>
    <Modal
        :title="$t('modalCreateByKeystore.title')"
        :is-open="state.isOpen"
        @change="handleModalChangeIsOpen"
    >
        <div class="password-info-header-wrapper">
            <div class="password-info-header">
                {{ $t("modalCreateByKeystore.yourPassword") }}
                <InfoButton
                    :message="
                        $t(
                            'common.password.thisPasswordEncryptsYourPrivateKey'
                        )
                    "
                />
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
</template>

<script lang="ts">
import { defineComponent, PropType } from "@vue/composition-api";
import { mdiArrowRight } from "@mdi/js";

import { formatRich } from "../../service/format";

import Modal from "./Modal.vue";
import Warning from "./Warning.vue";
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
        Warning,
        InfoButton,
        PasswordGenerator
    },
    model: {
        prop: "state",
        event: "change"
    },
    props: { state: (Object as unknown) as PropType<State> },
    setup(props: Props, context) {
        function handleModalChangeIsOpen(isOpen: boolean): void {
            context.emit("change", { ...props.state, isOpen });
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

<style scoped lang="postcss">
.password-info-header-wrapper {
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
