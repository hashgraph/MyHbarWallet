<template>
  <Headline :title="$t('InterfaceConvertUnits')" parent="tools" />
  <div
    class="
      mt-8
      font-medium
      text-carbon
      pb-10
      border-b border-cerebral-grey
      dark:border-midnight-express
    "
  >
    <div class="page-subtitle m-4">
      {{ $t("ourHelpfulConversionTool") }}
    </div>

    <div class="flex flex-wrap">
      <div class="block-left">
        <div class="input-block">
          <TextInput
            v-model="state.valueLeft"
            placeholder="$t('common.amount')"
            :modelValue="$t('common.amount')"
            @update:modelValue="handleInputValueLeft"
          />
        </div>

        <div class="select-block">
          <DropdownSelector
            v-model = "state.selectedLeft"
            :options="state.units"
            :modelValue="state.units[0].name"
            @update:modelValue="handleSelect"
          />
        </div>
      </div>

      <div class="block-center m-1">
        <img src="../../assets/swap.svg" alt="Swap" />
      </div>

      <div class="block-right m-1">
        <TextInput
          v-model="state.valueRight"
          placeholder="1"
          :modelValue="'1'"
          @update:modelValue="handleInputValueRight"
        />
        <div class="select-block">
          <DropdownSelector
            v-model = "state.selectedRight"
            :options="state.units"
            :modelValue="state.units[2].name"
            @update:modelValue = "handleSelect"
          />
        </div>
      </div>
    </div>

    <div class="unit-table">
      <table class="table-auto m-auto min-w-full">
        <tbody>
          <tr v-for="unit in state.unitRefs" :key="unit.key">
            <td class="w-1/3">{{ unit.name }}</td>
            <td class="w-1/3">{{ unit.amount }} {{ unit.symbol }}</td>
            <td class="w-1/3">{{ unit.amountInHbar }} ℏ</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>


<script lang= "ts">
import { defineComponent, reactive } from "vue";
import Headline from "../../components/interface/Headline.vue";
// import { convert, Unit } from "../../services/units.ts";

import TextInput from "../../components/base/TextInput.vue";
import DropdownSelector from "../../components/base/DropdownSelector.vue";
import { Hbar, HbarUnit } from "@hashgraph/sdk";
import BigNumber from "bignumber.js";
import { useI18n } from "vue-i18n";

export default defineComponent({
  name: "ConvertUnits",
  components: {
    Headline,
    TextInput,
    DropdownSelector,
  },
  setup() {
    const i18n = useI18n();
    let state = reactive({
      selectedLeft: "Tinybar",
      selectedRight: "Hbar",
      valueLeft: "100000000",
      valueRight: "1",
      units: [
        {
          name: "Tinybar",
          iconLight: null,
          iconDark: null,
        },

        {
          name: "Milibar",
          iconLight: null,
          iconDark: null,
        },

        {
          name: "Hbar",
          iconLight: null,
          iconDark: null,
        },
        {
          name: "Kilobar",
          iconLight: null,
          iconDark: null,
        },
        {
          name: "Megabar",
          iconLight: null,
          iconDark: null,
        },
        {
          name: "Gigabar",
          iconLight: null,
          iconDark: null,
        },
      ],

      unitRefs: [
        {
          name: "Tinybar",
          symbol: "tℏ",
          amount: "100,000,000",
          amountInHbar: "1",
        },
        {
          name: "Microbar",
          symbol: "μℏ",
          amount: "1,000,000",
          amountInHbar: "1",
        },
        {
          name: "Milibar",
          symbol: "mℏ",
          amount: "1,000",
          amountInHbar: "1",
        },
        {
          name: "Hbar",
          symbol: "ℏ",
          amount: "1",
          amountInHbar: "1",
        },
        {
          name: "Kilobar",
          symbol: "kℏ",
          amount: "1",
          amountInHbar: "1,000",
        },
        {
          name: "Megabar",
          symbol: "Mℏ",
          amount: "1",
          amountInHbar: "1,000,000",
        },
        {
          name: "Gigabar",
          symbol: "Gℏ",
          amount: "1",
          amountInHbar: "1,000,000,000",
        },
      ],
    });

    function handleInputValueLeft(value: string, e: Event): void {
      console.log(`Left ${value}`);
      if (isNaN(value)) {
        console.log("Left input is not a number");
      }
    }

    function handleInputValueRight(value: string, e: Event): void {
      console.log(`Right ${value}`);
      if (isNaN(value)) {
        console.log("Right input is not a number");
      }
    }

    function handleSelect(): void {
        let hLeft = new Hbar(new BigNumber(state.valueLeft), state.selectedLeft);
        let hRight = new Hbar(new BigNumber(state.valueRight), state.selectedRight);


        console.log(`valueRight: ${state.valueRight}, selectedRight: ${state.selectedRight}`);
        console.log(hRight);
        state.valueRight = hRight.toTinybars().toString();
        console.log(state.valueRight);

    }
    return { state, handleInputValueLeft, handleInputValueRight, handleSelect };
  },
});
</script>



