<template>
  <Modal
    :is-visible="isVisible"
    title="Confirm your transfers"
    @close="$emit('close')"
  >
    <table class="m-2 table-fixed border-b dark:border-midnight-express text-center w-full">
      <thead class="border-b dark:border-midnight-express">
        <th class="font-bold w-1/5 h-14">
          {{ $t("InterfaceHomeSend.transfer.confirm.account") }}
        </th>
        <th class="font-bold w-2/5 h-12">
          {{ $t("InterfaceHomeSend.transfer.confirm.token") }}
        </th>
        <th class="font-bold w-2/5 h-12">
          {{ $t("InterfaceHomeSend.transfer.confirm.amount") }}
        </th>
      </thead>
      <tbody>
        <tr
          v-for="transfer in transfers"
          :key="transfer.to?.toString()"
          class="h-10"
        >
          <td>
            {{ transfer.to }}
          </td>
          <td>
            {{ transfer.asset }}
          </td>
          <td>
            {{ transfer.asset === "HBAR"? transfer.amount?.toFixed(8) ?? '0' : transfer.amount?.toFixed(getDecimal(transfer.asset) ?? 0) ?? '0' }}
          </td>
        </tr>
      </tbody>
    </table>
    <div class="w-full text-center mt-6">
      <Button
        color="green"
        class="p-3 mb-3 w-3/4 m-auto"
        @click="$emit('confirm')"
      >
        {{ transfers.length === 0? $t("BaseButton.send"): $t("InterfaceHomeSend.transfer.confirm.send.all") }}
      </Button>
      <Button
        color="white"
        class="p-3 w-1/3 m-auto"
        @click="$emit('close')"
      >
        {{ $t("BaseButton.cancel") }}
      </Button>
    </div>
  </Modal>
</template>

<script lang = "ts">
import { defineComponent, PropType } from "vue";

import { useStore } from "../../store";
import { Transfer } from "../../domain/Transaction";
import Button from "../base/Button.vue";

import Modal from "./Modal.vue";

export default defineComponent({
    name: "TransferConfirmationModal",
    components: {
        Modal,
        Button
    },
    props: {
        isVisible: { type: Boolean, required: true },
        transfers: { type: Array as PropType<Transfer[]>, required: true }
    },
    emits: ["close", "confirm"],
    setup(){
      const store = useStore();
      
      function getDecimal(asset: string): number | undefined {
        return store.balance?.tokens.get(asset)?.decimals;
      }

      return { getDecimal };
    }
});
</script>