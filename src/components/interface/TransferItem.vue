<template>
  <div class="shadow-md flex float-left bg-white dark:bg-ruined-smores p-4 rounded w-full mt-2 dark:hover:bg-black-out whitespace-nowrap overflow-ellipsis">
    <div class="w-1/5 mr-12">
      {{ state.to?.toString() }}
    </div>
    <div class="w-1/5 mr-12">
      {{ state.tokenName }}
    </div>
    <div class="w-2/5 overflow-ellipsis">
      {{ state.formattedAmount }}
    </div>

    <div
      class="float-right text-right"
      @click="toggleMenu()"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
        viewBox="0 0 20 20"
        width="1.5em"
        height="1.5em"
        class="text-soft-blue hover:text-mountain-meadow"
      >
        <g fill="none">
          <path
            d="M10 6a2 2 0 1 1 0-4a2 2 0 0 1 0 4z"
            fill="currentColor"
          />
          <path
            d="M10 12a2 2 0 1 1 0-4a2 2 0 0 1 0 4z"
            fill="currentColor"
          />
          <path
            d="M10 18a2 2 0 1 1 0-4a2 2 0 0 1 0 4z"
            fill="currentColor"
          />
        </g>
      </svg>
    </div>
  </div>
  <div class="float-right">
    <TransferOptionMenu
      :open="state.showOptions"
      @close="closeMenu"
      @edit="edit"
      @remove="remove"  
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, PropType, onMounted } from "vue";
import BigNumber from "bignumber.js";

import { useStore } from "../../store";
import { Transfer } from "../../domain/Transaction";

import TransferOptionMenu from "./TransferOptionMenu.vue";

export default defineComponent({
    name: "Transfer",
    components: {
        TransferOptionMenu
    },
    props: {
        transfer: { type: Object as PropType<Transfer>, required: true },
        index: { type: Number, default: 0, required: true }
    },
    emits:[
        "edit",
        "remove",
        "index",
        "update:value",
    ],
    setup(props, context){
        const store = useStore();
        const state = reactive({
            showOptions: false,
            to: props.transfer.to,
            decimals: 0,
            formattedAmount: "",
            index: props.index,
            tokenName: "" as string | null,
            symbol: "" as string | null
        });

        function formatAmount(value: BigNumber): string {
          // value = value.dividedBy(Math.pow(10, state.decimals));
          //Represent as Hbar instead of Tinybar
          if(props.transfer.asset === "HBAR") return `${value.toFixed(8)}ℏ`;
          context.emit("update:value", {
            index: props.index,
            value: value
          });
          return `${value.toFixed(state.decimals)} ${state.symbol}`;
        }

        function closeMenu(): void {
            state.showOptions = false;
        }

        function toggleMenu(): void {
            state.showOptions = !state.showOptions;
        }

        function edit(): void {
          closeMenu();
          context.emit("edit", {
            index: props.index
          });
        }

        function remove(): void {
          closeMenu();
          context.emit("remove", {
            index: props.index
          });
        }

        onMounted(async ()=> {
          //Removed token info query to reduce phantom fees, can replace if needed   
          if(props.transfer.asset !== "HBAR") {
            state.tokenName = props.transfer.asset;
            state.symbol = "";
            state.decimals = store.balance?.tokens.get(props.transfer.asset)?.decimals ?? 0;
          }
          else {
            state.tokenName = props.transfer.asset;
          }
          state.formattedAmount = formatAmount(props.transfer.amount ?? new BigNumber(0));
        });

        return {
            state,
            formatAmount,
            closeMenu,
            toggleMenu,
            edit,
            remove
        }
    }
});
</script>