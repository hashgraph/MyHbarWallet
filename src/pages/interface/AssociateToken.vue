<template>
  <Headline
    :title="$t('InterfaceToolTile.associateToken.title')"
    parent="tools"
  />

  <Hint
    :text="$t('InterfaceToolTile.associateToken.hint')"
    class="mt-4"
  />

  <form @submit.prevent="handleAssociate">
    <div class="flex flex-col max-w-lg m-auto mt-10">
      <label class="font-medium text-squant dark:text-argent">
        {{ $t("InterfaceToolTile.associateToken.label.tokenID") }}
      </label>

      <EntityIdInput
        data-cy-token-id
        v-model="state.token"
        type="token"
        :placeholder="$t('InterfaceToolTile.associateToken.placeholder')"
      />

      <InputError data-cy-input-error v-if="state.errorMessage.length > 0">
        {{ state.errorMessage }}
      </InputError>
    </div>

    <div class="mt-48 border-b border-cerebral-grey" />

    <div class="flex flex-col items-center max-w-lg m-auto">
      <Button
        data-cy-submit
        type="submit"
        color="green"
        class="w-full p-4 mt-10"
        :disabled="state.token == null"
      >
        {{ $t("InterfaceToolTile.associateToken.title") }}
      </Button>

      <Button
        color="white"
        :to="{ name: 'tools' }"
        class="p-2 mt-4 w-36"
      >
        {{ $t("BaseButton.cancel") }}
      </Button>
    </div>
  </form>
  <Modal
      data-cy-success-modal
      :is-visible="state.successModal"
      :title="$t('Modal.AssociateToken')"
      @close="handleClose"
  />
</template>

<script lang="ts">
import { defineComponent, reactive } from "vue";

import Headline from "../../components/interface/Headline.vue";
import Hint from "../../components/interface/Hint.vue";
import Button from "../../components/base/Button.vue";
import EntityIdInput from "../../components/base/EntityIdInput.vue";
import InputError from "../../components/base/InputError.vue";
import Modal from "../../components/interface/Modal.vue";
import { useStore } from "../../store";

export default defineComponent({
  name: "AssociateToken",
  components: {
    Headline,
    Hint,
    Button,
    EntityIdInput,
    InputError,
    Modal,
  },
  setup() {
    const store = useStore();
    const state = reactive({
      token: null,
      errorMessage: "",
      successModal: false,
    });

    function handleClose(): void {
      state.successModal = false;
    }

    async function handleAssociate(): Promise<void> {
      state.successModal = false
      state.errorMessage = "";
      const account = store.accountId;
      const token = state.token;

      if (account != null && token != null) {
        try {
          await store.client?.associateToken({
            account,
            tokens: [token],
          });
          state.successModal = true
        } catch (error) {
          state.errorMessage = await store.errorMessage(error);
        }
      }
    }

    return { state, handleAssociate, handleClose };
  },
});
</script>
