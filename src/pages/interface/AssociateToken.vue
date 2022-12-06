<template>
  <Headline
    :title="$t('InterfaceToolTile.associateToken.title')"
    parent="tools"
  />

  <Hint
    :text="$t('InterfaceToolTile.associateToken.hint')"
    class="mt-4"
  />

  <form
    class="p-8 mt-10"
    @submit.prevent="handleAssociate"
  >
    <div
      class="transition-all duration-300 mb-8 w-full md:w-3/4 md:m-auto text-center"
    > 
      <div class="text-left">
        <label class="font-medium text-squant dark:text-argent">
          {{ $t("InterfaceToolTile.associateToken.label.tokenID") }}
        </label>
        <EntityIdInput
          v-model="state.token"
          data-cy-token-id
          type="token"
          :placeholder="$t('InterfaceToolTile.associateToken.placeholder')"
        />
      </div>

      <Button
        color="green"
        class="mt-8 md:mb-2 mb-12 p-3 w-3/4 m-auto"
        :disabled="!state.token"
        type="button"
        @click="addToken"
      >
        {{ $t("InterfaceAssociateToken.button.add.token") }}
      </Button>

      <InputError
        v-if="state.errorMessage.length > 0"
        data-cy-input-error
      >
        {{ state.errorMessage }}
      </InputError>

      <div
        class="rounded p-8 mt-12 bg-opacity-50 bg-first-snow dark:text-white dark:bg-midnight-express min-h-[200px] transition-all duration-300 overflow-auto"
        :class="{
          'opacity-100': state.tokens.length > 1,
          'opacity-0 invisible -mt-44 h-0': state.tokens.length == 0
        }"
      >
        <div
          v-for="(token, i) in state.tokens"
          :key="token.toString()"
        >
          <TokenItem
            :token-id="token.toString()"
            :index="i"
            @remove="remove"
          />
        </div>
      </div>
    </div>

    <div class="mt-48 border-b border-cerebral-grey" />

    <div class="flex flex-col items-center max-w-lg m-auto">
      <Button
        data-cy-submit
        type="submit"
        color="green"
        class="w-full p-4 mt-10"
        :disabled="state.tokens.length === 0"
      >
        {{ associateTokenButton }}
      </Button>

      <Button
        color="white"
        :to="{ name: 'tools' }"
        class="p-2 mt-4 w-36"
        type="submit"
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

  <ProgressModal
    :is-visible="state.showIPModal"
    :title="$t('InterfaceAssociateToken.in.progress.modal')"
  />
</template>

<script lang="ts">
import { defineComponent, reactive, computed } from "vue";
import { useI18n } from "vue-i18n";
import type { TokenId } from "@hashgraph/sdk";

import Headline from "../../components/interface/Headline.vue";
import Hint from "../../components/interface/Hint.vue";
import Button from "../../components/base/Button.vue";
import EntityIdInput from "../../components/base/EntityIdInput.vue";
import InputError from "../../components/base/InputError.vue";
import Modal from "../../components/interface/Modal.vue";
import ProgressModal from "../../components/interface/ProgressModal.vue";
import TokenItem from "../../components/interface/TokenItem.vue";
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
    ProgressModal,
    TokenItem
  },
  setup() {
    const store = useStore();
    const i18n = useI18n();
    const associateTokenButton = computed(()=> {
      if(state.tokens.length == 1) {
        return i18n.t("InterfaceToolTile.associateToken.title");
      } else {
        return i18n.t("InterfaceAssociateToken.button.multiple.tokens");
      }
    });
    
    const state = reactive({
      token: null as unknown as TokenId,
      errorMessage: "",
      successModal: false,
      showIPModal: false,
      showOptions: false,
      attemptedTokens: [] as string[],
      tokens: [] as TokenId[]
    });

    function remove(e: { index: number } ): void {
      state.tokens.splice(e.index, 1);
    }

    function addToken(): void {
      if(Array.from(store.balance?.tokens.keys()).includes(state.token?.toString() ?? "") || state.attemptedTokens.includes(state.token.toString())){
        state.errorMessage = i18n.t("Common.Error.TokenAlreadyAssociated");
        return;
      } else if(state.tokens.includes(state.token)) {
        state.errorMessage = i18n.t("InterfaceAssociateToken.error.token.already.in.list");
        return;
      } else {
        state.errorMessage = "";
      }
      state.tokens.push(state.token);
    }

    function handleClose(): void {
      state.successModal = false;
    }

    async function handleAssociate(): Promise<void> {
      state.successModal = false;
      state.errorMessage = "";
      const account = store.accountId;

      if (account != null && state.tokens.length != 0) {
        state.showIPModal = true;
        try {
          await store.client?.associateToken({
              account,
              tokens: state.tokens
            });
            state.showIPModal = false;
            state.successModal = true;
          } catch (error) {
            state.showIPModal = false;
            state.errorMessage = await store.errorMessage(error);
        }
        
        for(const i in state.tokens) {
          state.attemptedTokens.push(state.tokens[i].toString());
        }
        state.tokens = [] as TokenId[];
      }
    }


    return { 
      state, 
      associateTokenButton,
      handleAssociate, 
      handleClose, 
      addToken,
      remove
    };
  },
});
</script>
