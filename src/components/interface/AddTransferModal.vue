<template>
  <Modal
    title="Add Transfer"
    :is-visible="isVisible"
    class="text-center"
    @close="$emit('close')"
  >
    <TransferForm
      v-model:asset="state.transfer.asset"
      v-model:usd="state.transfer.usd"
      v-model:to="state.transfer.to"
      class="text-left mt-4 shadow-none"
      @update:amount="updateAmount"
    />

    <Button
      color="green"
      class="py-2 w-1/2 m-4"
      :disabled="!valid"
      @click="handleTransfer"
    >
      {{ $t("BaseButton.add") }}
    </Button>
  </Modal>
</template>


<script lang = "ts">
import { defineComponent, reactive, computed } from "vue";
import  { BigNumber } from "bignumber.js";

import TransferForm from "../interface/TransferForm.vue";
import Modal from "../interface/Modal.vue";
import Button from "../base/Button.vue";

export default defineComponent({
    name: "AddTransferModal",
    components: {
        TransferForm,
        Modal,
        Button
    },
    props: {
        isVisible: { type: Boolean, required: false },
        title: { type: String, required: true },
        edit: { type: Boolean, default: false }
    },
    emits: ["close", "addTransfer"],
    setup(props, context) {
        const state = reactive({
            transfer: {
                to: null,
                asset: "HBAR",
                amount: null as BigNumber | null,
                usd: null as BigNumber | null
            },
        });

        const valid = computed(()=>{
          return state.transfer.to != null && 
            state.transfer.amount != null && 
            !isNaN(state.transfer.amount.toNumber()) 
            && state.transfer.amount.toNumber() !== 0;
        });

        function handleTransfer(): void {
          if(valid.value) {
            
            context.emit("addTransfer", {
              transfer: state.transfer,
              edit: props.edit
            });

            context.emit("close");
          }
        }

        function updateAmount(e: Event): void {
          state.transfer.amount = new BigNumber(e as unknown as number);
        }

        return {
            state,
            valid,
            handleTransfer,
            updateAmount
        }
    }
});
</script>