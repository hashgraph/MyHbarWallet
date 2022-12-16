<template>
  <Modal
    title="Add Transfer"
    :is-visible="isVisible"
    class="text-center"
    @close="$emit('close')"
  >
    <TransferForm
      v-model:asset="state.transfer.asset"
      v-model:amount="state.transfer.amount"
      v-model:to="state.transfer.to"
      class="text-left mt-4 shadow-none"
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
                amount: null as BigNumber | null
            },
        });

        const valid = computed(()=>{
          return state.transfer.to != null && 
            state.transfer.amount != null && 
            state.transfer.amount.isGreaterThan(new BigNumber(0));
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

        return {
            state,
            valid,
            handleTransfer
        }
    }
});
</script>