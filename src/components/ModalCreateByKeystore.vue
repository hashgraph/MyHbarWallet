<template>
  <div class="create-with-keystore-file">
    <Modal
      :is-open="state.isOpen"
      :title="$t('modalCreateByKeystore.title')"
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
import { mdiArrowRight } from "@mdi/js";

import { formatRich } from "../formatter";

import InfoButton from "./InfoButton.vue";
import Modal from "./Modal.vue";
import PasswordGenerator, { State as PasswordGeneratorState } from "./PasswordGenerator.vue";
import Warning from "./Warning.vue";

export interface State {
    isOpen: boolean;
    isBusy: boolean;
    passwordGeneratorState: PasswordGeneratorState;
}

interface Props {
    state: State;
}

export default createComponent({
    name: "ModalCreateByKeystore",
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
    props: { state: Object as PropType<State> },
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

<style lang="postcss" scoped>
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
