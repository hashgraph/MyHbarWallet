<template>
  <Headline
    :title="$t('InterfaceToolTile.createAccount.title')"
    parent="tools"
  />
  
  <Hint
    :text="$t('InterfaceToolTile.createAccount.hint')"
    class="mt-4"
  />
  
  <form
    class="flex flex-col max-w-lg m-auto mt-10"
    @submit.prevent="handleSubmit"
  >
    <label class="font-medium text-squant dark:text-argent">
      {{ $t("InterfaceToolTile.createAccount.label.publicKey") }}
    </label>

    <KeyInput
      v-model="state.publicKeyStr"
      :valid="state.validKey"
      class="mb-4"
      @update:modelValue="handleKey"
    />

    <label class="font-medium text-squant dark:text-argent">
      {{ $t("InterfaceToolTile.createAccount.label.initialBalance") }}
    </label>

    <HbarInput
      :amount="state.initialBalance"
      @update:amount="handleAmount"
    />

    <InputError
      v-if="state.errorMessage.length > 0"
    >
      {{ state.errorMessage }}
    </InputError>
    
    <Button
      type="submit"
      class="mt-8 px-5 py-2"
      color="green"
      :busy="state.busy"
      :disabled="!state.validKey || state.initialBalance == null"
    >
      {{ $t("InterfaceToolTile.createAccount.label.createAccount") }}
    </Button>
  </form>

  <Modal
    :title="$t('InterfaceToolTile.createAccount.success')"
    :is-visible="state.resultModalOpen"
    @close="handleClose"
  >
    <div class="flex flex-col items-center">
      <div class="flex items-center justify-center">
        <span class="mr-4">{{ $t("InterfaceToolTile.createAccount.created") }}</span>
      
        <span
          v-if="state.accountId != null"
          class="font-bold text-basalt-grey"
        >
          {{ state.accountId.toString() }}
        </span>
      </div>

      <div class="flex items-center justify-between mt-10">
        <Button
          class="px-5 py-2 mr-6"
          color="white"
          @click.stop="handleClose"
        >
          {{ $t("InterfaceToolTile.createAccount.close") }}
        </Button>
          
        <Button
          class="px-5 py-2"
          color="green"
          @click.stop="handleCopy"
        >
          {{ $t("InterfaceToolTile.createAccount.copy") }}
        </Button>
      </div>
    </div>
  </Modal>
</template>

<script lang="ts">
import { defineComponent, reactive } from "vue";
import { BigNumber } from "bignumber.js";
import type { AccountId, PublicKey } from "@hashgraph/sdk";

import Headline from "../../components/interface/Headline.vue";
import Hint from "../../components/interface/Hint.vue";
import HbarInput from "../../components/base/HbarInput.vue";
import InputError from "../../components/base/InputError.vue";
import KeyInput from "../../components/base/KeyInput.vue";
import Button from "../../components/base/Button.vue";
import Modal from "../../components/interface/Modal.vue";
import { useStore } from "../../store";
import { copyText } from "../../utils/clipboard";

export default defineComponent({
  name: "CreateAccount",
  components: {
    Headline,
    Hint,
    HbarInput,
    InputError,
    KeyInput,
    Button,
    Modal
  },
  setup() {
    const store = useStore();

    const state = reactive({
      errorMessage: "",
      initialBalance: new BigNumber(1),
      publicKeyStr: "",
      publicKey: null as PublicKey | null,
      validKey: false,
      busy: false,
      accountId: null as AccountId | null | undefined,
      resultModalOpen: false
    });

    function handleAmount(amount: BigNumber): void {
      state.initialBalance = amount;
    }

    async function handleKey(key: string): Promise<void> {

      const { PublicKey } = await import("@hashgraph/sdk");
      state.publicKeyStr = key;

      try {
        state.publicKey = PublicKey.fromString(key);
      } catch (error) {
        state.errorMessage = await store.errorMessage(error);
      } finally {
        state.validKey = state.publicKey != null;
      }
    }

    function handleClose(): void {
      state.resultModalOpen = false;
    }

    function handleCopy(): void {
      if (state.accountId != null) {
        copyText(state.accountId.toString());
      }
    }

    async function handleSubmit(): Promise<void> {
      state.errorMessage = "";
      state.busy = true;
      state.accountId = null;

      try {
        if (state.publicKey != null && state.initialBalance != null) {
          state.accountId = await store.client?.createAccount({
            publicKey: state.publicKey as PublicKey,
            initialBalance: new BigNumber(state.initialBalance)
          });

          if (state.accountId != null) {
            state.resultModalOpen = true
          }
        }
      } catch (error) {
        state.errorMessage = await store.errorMessage(error);
      } finally {
        state.busy = false;
      }
    }

    return {
      state,
      handleClose,
      handleCopy,
      handleKey,
      handleAmount,
      handleSubmit
    }
  }
})
</script>