<template>
    <div class="create-with-keystore-file">
        <Modal
            :title="$t('modalCreateByKeystore.title')"
            :is-open="state.isOpen"
            @change="handleModalChangeIsOpen"
        >
            <template v-slot:banner>
                <Warning
                    :title="$t('warning.title')"
                    :message="
                        $t('warning.thisIsNotARecommendedWayToAccessYourWallet')
                    "
                />
            </template>

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
                ref="passwordGenerator"
                v-model="state.passwordGeneratorState"
                :is-open="state.isOpen"
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
import { createComponent, PropType } from "@vue/composition-api";
import Modal from "../components/Modal.vue";
import Warning from "../components/Warning.vue";
import InfoButton from "../components/InfoButton.vue";
import PasswordGenerator, {
    State as PasswordGeneratorState
} from "../components/PasswordGenerator.vue";
import { mdiArrowRight } from "@mdi/js";
import { formatRich } from "../formatter";

export interface State {
    isOpen: boolean;
    isBusy: boolean;
    passwordGeneratorState: PasswordGeneratorState;
}

interface Props {
    state: State;
}

export default createComponent({
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
    props: {
        state: (Object as unknown) as PropType<State>
    },
    setup(props: Props, context) {
        function handleModalChangeIsOpen(isOpen: boolean): void {
            context.emit("change", { ...props.state, isOpen });
        }

        function handleSubmitPassword(): void {
            context.emit("submit", { ...props.state });
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
