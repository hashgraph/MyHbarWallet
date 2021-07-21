<template>
  <Headline :title="$t('InterfaceConvertUnits')" parent="tools" />
  <div
    class="items-center pb-10 mt-8 font-medium border-b text-carbon dark:text-silver-polish border-cerebral-grey dark:border-midnight-express"
  >
    <div class="m-16 page-subtitle">{{ $t("ourHelpfulConversionTool") }}</div>

    <div class="flex flex-wrap items-stretch m-16">
      <div class="w-5/12 m-auto block-left">
        <div class="input-block">
          <TextInput
            v-model="state.valueLeft"
            class="m-1"
            :placeholder="$t('common.amount')"
            @update:modelValue="handleInputValueLeft"
          />
        </div>

        <div class="select-block">
          <Select
            v-model="state.selectedLeft"
            class="m-2"
            :options="units"
            :placeholder="units[0].name"
            @update:modelValue="handleSelect"
          />
        </div>
      </div>

      <div class="self-center block-center">
        <img src="../../assets/swap.svg" alt="Swap" />
      </div>

      <div class="w-5/12 m-auto block-right">
        <TextInput
          v-model="state.valueRight"
          class="m-1"
          @update:modelValue="handleInputValueRight"
        />

        <div class="select-block">
          <Select
            v-model="state.selectedRight"
            class="m-2"
            :options="units"
            @update:modelValue="handleSelect"
          />
        </div>
      </div>
    </div>

    <div class="items-center lg:m-16 md:m-16 unit-table overflow-auto">
      <div
        class="mt-16 mb-8 font-semibold text-center unit-table-header"
      >{{ $t("referenceGuideTitle") }}</div>

      <div class="table w-full">
        <tr class = "flex mb-8">
          <th class="w-1/3 flex overflow-wrap"> {{ $t("InterfaceConvertUnits.table.unit") }}</th>
          <th class="w-1/3 flex overflow-wrap"> {{ $t("InterfaceConvertUnits.table.amount") }} </th>
          <th class="w-1/3 flex overflow-wrap"> {{ $t("InterfaceConvertUnits.table.amount.in.hbar")}} </th>
        </tr>
        <tr
          v-for="unit in units"
          :key="unit.name"
          class="flex mb-8 border-b dark:border-b-silver-polish overflow-wrap"
        >
          <td class="w-1/3 flex overflow-wrap">
            {{ unit.name }}
          </td>
          <td class="w-1/3 flex overflow-wrap">
            {{ unit.amount }} {{ unit.symbol }} 
          </td>
          <td class="w-1/3 flex overflow-wrap">
            {{ unit.amountInHbar }} {{ units[2].symbol }}
          </td>
        </tr>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, computed } from "vue";
import { BigNumber } from "bignumber.js";

import Headline from "../../components/interface/Headline.vue";
import TextInput from "../../components/base/TextInput.vue";
import Select, { Option } from "../../components/base/Select.vue";


export default defineComponent({
  name: "ConvertUnits",
  components: {
    Headline,
    TextInput,
    Select,
  },

  setup() {
    BigNumber.config({
      DECIMAL_PLACES: 64,
      RANGE: 500,
      EXPONENTIAL_AT: 64,
    });


    const units = [
      {
        name: "Tinybar",
        iconLight: null,
        iconDark: null,
        symbol: "tℏ",
        amount: "100,000,000",
        amountInHbar: "1",
      },
      {
        name: "Millibar",
        iconLight: null,
        iconDark: null,
        symbol: "μℏ",
        amount: "1,000,000",
        amountInHbar: "1",
      },
      {
        name: "Hbar",
        iconLight: null,
        iconDark: null,
        symbol: "ℏ",
        amount: "1",
        amountInHbar: "1",
      },
      {
        name: "Kilobar",
        iconLight: null,
        iconDark: null,
        symbol: "kℏ",
        amount: "1",
        amountInHbar: "1,000",
      },
      {
        name: "Megabar",
        iconLight: null,
        iconDark: null,
        symbol: "Mℏ",
        amount: "1",
        amountInHbar: "1,000,000",
      },
      {
        name: "Gigabar",
        iconLight: null,
        iconDark: null,
        symbol: "Gℏ",
        amount: "1",
        amountInHbar: "1,000,000,000",
      },
    ] as unknown as Option[];

    const state = reactive({
      selectedLeft: "Tinybar",
      selectedRight: "Hbar",
      valueLeft: "100000000",
      valueRight: "1",
    });


    function handleInputValueLeft(value: string): void {
      if (isNaN(parseInt(value))) {
        return;
      }
      state.valueLeft = value;
      computeValueRight();
    }

    function handleInputValueRight(value: string): void {
      if (isNaN(parseInt(value))) {
        return;
      }
      state.valueRight = value;
      computeValueLeft();
    }

    async function handleSelect(): Promise<void> {
      computeValueLeft();
      computeValueRight();
    }

    async function getHbarUnit(value: string): Promise<import("@hashgraph/sdk").HbarUnit> {
      const { HbarUnit } = await import("@hashgraph/sdk");
      switch (value) {
        case "Tinybar":
          return HbarUnit.Tinybar;
        case "Microbar":
          return HbarUnit.Microbar;
        case "Millibar":
          return HbarUnit.Millibar;
        case "Hbar":
          return HbarUnit.Hbar;
        case "Kilobar":
          return HbarUnit.Kilobar;
        case "Megabar":
          return HbarUnit.Megabar;
        case "Gigabar":
          return HbarUnit.Gigabar;
        default:
          return HbarUnit.Hbar;
      }
    }

    async function computeValueLeft(): Promise<void> {
      const { Hbar } = await import("@hashgraph/sdk");
      let unitRight = state.selectedRight;
      let unitLeft = state.selectedLeft;
      let hRight = new Hbar(
        new BigNumber(state.valueRight),
        await getHbarUnit(unitRight)
      );
      state.valueLeft = hRight.to(await getHbarUnit(unitLeft)).toString();
    }

    async function computeValueRight(): Promise<void> {
      const { Hbar } = await import("@hashgraph/sdk");
      let unitRight = state.selectedRight;
      let unitLeft = state.selectedLeft;
      let hLeft = new Hbar(
        new BigNumber(state.valueLeft),
        await getHbarUnit(unitLeft)
      );
      state.valueRight = hLeft.to(await getHbarUnit(unitRight)).toString();
    }

    return {
      state,
      units,
      handleInputValueLeft,
      handleInputValueRight,
      handleSelect,
      computeValueLeft,
      computeValueRight,
      getHbarUnit,
    };
  },
});
</script>
