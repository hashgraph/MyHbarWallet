<template>
  <Headline title="Associate Token" parent="tools" />

  <Hint :text="$t('InterfaceToolTile.associateToken.hint')" class="mt-4" />

  <!-- TODO: TokenIdInput -->
  <div class="flex flex-col max-w-lg m-auto mt-10">
<<<<<<< HEAD
    <label class="font-medium text-squant dark:text-white mb-4">
=======
    <label class="font-medium text-squant dark:text-argent">
>>>>>>> 1071461646dafa61a6e27f9d6450406957b0577a
      {{ $t("InterfaceToolTile.associateToken.label.tokenID") }}</label
    >

    <EntityIdInput
      type="token"
      v-model="state.token"
<<<<<<< HEAD
      :placeholder="$t('AccessAccount.section2.input.placeholder')"
=======
      placeholder="shard.realm.num"
>>>>>>> 1071461646dafa61a6e27f9d6450406957b0577a
    />

    <InputError v-if="state.errorMessage.length > 0">
      {{ state.errorMessage }}
    </InputError>
  </div>

  <div class="mt-48 border-b border-cerebral-grey"></div>

  <div class="flex flex-col items-center max-w-lg m-auto">
    <Button
      color="green"
      class="w-full p-4 mt-10"
      :disabled="state.token == null"
      @click="handleAssociate"
    >
      {{ $t("InterfaceToolTile.associateToken.title") }}
    </Button>

    <Button color="white" :to="{ name: 'tools' }" class="p-2 mt-4 w-36">
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
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> 7db6eb5 (wip: restructure code to use services layer)
=======
>>>>>>> 1071461646dafa61a6e27f9d6450406957b0577a
    }

    return { state, handleAssociate };
  },
});
</script>
