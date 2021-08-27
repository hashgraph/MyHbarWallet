<template>
  <div
    ref="container"
    class="relative bg-white"
  >
    <!-- Current Asset -->
    <div
      ref="trigger"
      class="border border-cerebral-grey  h-[50px] flex items-center pl-2 pr-5 cursor-pointer select-none rounded hover:bg-lynx-white dark:hover:bg-midnight-express dark:bg-ruined-smores dark:text-argent dark:border-midnight-express overflow-auto"
      :class="{
        'bg-lynx-white dark:bg-midnight-express': groupFocus,
      }"
      @click="onClickTrigger"
    >
      <img
        v-if="modelValue === 'HBAR'"
        class="mx-3 w-7 h-7"
        src="../../assets/hedera-hashgraph-logo.svg"
      >

      <img
        v-else
        class="mx-3 w-7 h-7"
        src="../../assets/img_token_gen.svg"
      >

      <div class="flex-1 pr-5 font-medium">
        {{ modelValue }}
      </div>

      <div
        v-if="hbarPrice && modelValue === 'HBAR'"
        class="mr-4 text-sm text-squant"
      >
        {{
          hbarPrice.toFormat(4, {
            prefix: "$",
            groupSize: 3,
            groupSeparator: ",",
            decimalSeparator: ".",
          })
        }}
        ea.
      </div>

      <img
        class="transform w-7 h-7"
        :class="{ 'rotate-180': groupFocus }"
        src="../../assets/chevron_down.svg"
      >
    </div>
    <!-- Options -->
    <div
      class="absolute z-20 border border-cerebral-grey dark:border-midnight-express dark:text-silver-polish dark:hover:bg-midnight-express left-0 right-0 rounded bg-white transition-all max-h-[300px] flex flex-col pt-[50px] duration-200"
      :class="{
        'opacity-100 top-[60px]': groupFocus,
        'opacity-0 pointer-events-none top-[40px]': !groupFocus,
      }"
      :style="{ boxShadow: '0 2px 10px 0 rgba(0,0,0,0.25)' }"
    >
      <div class="absolute -top-px -left-px -right-px">
        <input
          ref="searchInput"
          v-model="searchTerm"
          autofocus
          class="w-full border-cerebral-grey h-[50px] px-5 placeholder-squant rounded-t focus:ring-0 dark:border-midnight-express focus:border-han-blue-700 dark:bg-midnight-express dark:focus:border-border-han-blue-700"
          type="text"
          placeholder="Search assets …"
          @keydown="onKeyDown"
        >
      </div>
      <div class="overflow-y-auto">
        <template v-if="filteredAssets && filteredAssets.length > 0">
          <template
            v-for="(
              { name: assetName, balance }, index
            ) of filteredAssets"
            :key="assetName"
          >
            <div
              ref="setOptionRef"
              class="h-[50px] flex items-center px-5 hover:bg-lynx-white dark:hover:bg-midnight-express dark:hover:border-han-blue-700 cursor-pointer last:rounded-b dark:border-midnight-express"
              :class="{
                'bg-lynx-white dark:bg-midnight-express': focusIndex === index,
                '!bg-first-snow dark:!bg-midnight-express':
                  modelValue === assetName,
                'bg-white dark:bg-ruined-smores':
                  modelValue !== assetName,
              }"
              @mouseenter="onMouseEnterAsset(index)"
              @click="onSelectAsset(assetName)"
            >
              <div class="flex-1 font-medium" :data-cy-selector-asset="assetName">
                {{ assetName }}
              </div>
              <div class="text-sm text-squant">
                {{
                  balance.toFormat({
                    groupSize: 3,
                    groupSeparator: ",",
                    decimalSeparator: ".",
                  })
                }}
              </div>
              <img
                v-if="assetName === modelValue"
                class="flex-shrink-0 w-5 h-5 ml-5"
                src="../../assets/icon_check.svg"
              >
              <div
                v-else
                class="w-10"
              />
            </div>
          </template>
        </template>
        <div
          v-else
          class="px-5 py-3 text-sm text-squant"
        >
          No assets found.
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, onBeforeUpdate, ref, watch } from "vue";
import { onClickOutside } from "@vueuse/core";
import { BigNumber } from "bignumber.js";

import { useStore } from "../../store";

export interface Asset {
  name: string;
  decimals: number;
  balance: BigNumber.Instance;
}

export default defineComponent({
  name: "AssetSelector",
  props: {
    modelValue: { type: String, required: true },
  },
  emits: ["update:modelValue"],
  setup(_props, { emit }) {
    const trigger = ref(null);
    const searchInput = ref<HTMLInputElement | null>(null);
    const searchTerm = ref("");
    const container = ref(null);
    const groupFocus = ref(false);
    const focusIndex = ref(0);
    const store = useStore();
    let optionRefs: HTMLElement[] = [];

    function setOptionRef(el: HTMLElement) {
      optionRefs.push(el);
    }

    onBeforeUpdate(() => {
      optionRefs = [];
    });

    onClickOutside(container, () => {
      groupFocus.value = false;
    });

    function onSelectAsset(assetName: string) {
      groupFocus.value = false;
      focusIndex.value = 0;
      searchTerm.value = "";

      emit("update:modelValue", assetName);
    }

    function onMouseEnterAsset(enterIndex: number) {
      focusIndex.value = enterIndex;
    }

    function onKeyDown(event: KeyboardEvent) {
      let index = focusIndex.value;

      if (filteredAssets.value == null) return;

      if (event.key === "ArrowDown") {
        index += 1;

        if (index >= filteredAssets.value.length) {
          index = 0;
        }
      } else if (event.key === "ArrowUp") {
        index -= 1;

        if (index < 0) {
          index = filteredAssets.value.length - 1;
        }
      } else if (event.key === "Enter") {
        onSelectAsset(filteredAssets.value[index].name);
        return;
      }

      focusIndex.value = index;
      optionRefs[index]?.scrollIntoView(false);
    }

    function onClickTrigger() {
      groupFocus.value = !groupFocus.value;

      if (groupFocus.value) {
        searchInput.value?.focus();
      }
    }

    const assets = computed<Asset[] | null>(() =>
      store.balance == null
        ? null
        : [
          {
            name: "HBAR",
            decimals: 8,
            balance: store.balance.hbars,
          },
          ...Array.from(store.balance.tokens.entries()).map(
            ([tokenId, token]) => ({
              name: tokenId,
              decimals: token.decimals,
              balance: token.balance,
            })
          ),
        ]
    );

    const filteredAssets = computed(() =>
      assets.value?.filter(
        ({ name, balance }) =>
          balance.gt(0) && name.includes(searchTerm.value)
      )
    );

    const hbarPrice = computed(() => store.hbarPriceUsd as BigNumber);

    watch(filteredAssets, () => {
      focusIndex.value = 0;
    });

    return {
      groupFocus,
      container,
      hbarPrice,
      searchTerm,
      searchInput,
      filteredAssets,
      trigger,
      focusIndex,
      setOptionRef,
      onKeyDown,
      onClickTrigger,
      onSelectAsset,
      onMouseEnterAsset,
    };
  },
});
</script>
