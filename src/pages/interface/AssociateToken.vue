<template>
  <Headline
    title="Associate Token"
    parent="tools"
  />

  <Hint
    :text="$t('InterfaceToolTile.associateToken.hint')"
    class="mt-4"
  />

  <!-- TODO: TokenIdInput -->
  <div class="flex flex-col max-w-lg m-auto mt-10">
    <label class="font-medium text-squant dark:text-argent">
      {{ $t("InterfaceToolTile.associateToken.label.tokenID") }}</label>

    <EntityIdInput
      v-model="state.token"
      type="token"
      :placeholder="$t('InterfaceToolTile.associateToken.placeholder')"
    />

    <InputError v-if="state.errorMessage.length > 0">
      {{ state.errorMessage }}
    </InputError>
  </div>

  <div class="mt-48 border-b border-cerebral-grey" />

  <div class="flex flex-col items-center max-w-lg m-auto">
    <Button
      color="green"
      class="w-full p-4 mt-10"
      :disabled="state.token == null"
      @click="handleAssociate"
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
</template>

<script lang="ts">
import { defineComponent, reactive } from "vue";

import Headline from "../../components/interface/Headline.vue";
import Hint from "../../components/interface/Hint.vue";
import Button from "../../components/base/Button.vue";
import EntityIdInput from "../../components/base/EntityIdInput.vue";
import InputError from "../../components/base/InputError.vue";
import { useStore } from "../../store";

export default defineComponent({
  name: "AssociateToken",
  components: {
    Headline,
    Hint,
    Button,
    EntityIdInput,
    InputError,
  },
  setup() {
    const store = useStore();
    const state = reactive({
      token: null,
      errorMessage: "",
    });

    async function handleAssociate(): Promise<void> {
      state.errorMessage = "";
      const account = store.accountId;
      const token = state.token;

      if (account != null && token != null) {
        try {
          await store.client?.associateToken({
            account,
            tokens: [token],
          });
        } catch (error) {
          state.errorMessage = error.message;
        }
      }
    }

    return { state, handleAssociate };
  },
});
</script>
