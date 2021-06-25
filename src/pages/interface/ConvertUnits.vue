<template>
  <Headline :title="$t('InterfaceConvertUnits')" parent="tools" />
  <div
    class="
      mt-8
      m-16
      font-medium
      text-carbon
      pb-10
      border-b border-cerebral-grey
      dark:border-midnight-express
      dark:text-white
      items-center
    "
  >
    <div class="page-subtitle mt-8 w-full">
      {{ $t("ourHelpfulConversionTool") }}
    </div>

    <div class="flex-wrap flex items-stretch mt-8 w-full">
      <div class="block-left w-5/12 m-auto">
        <div class="input-block">
          <TextInput
            class="m-1"
            v-model="state.valueLeft"
            :modelValue="$t('common.amount')"
            @update:modelValue="handleInputValueLeft"
          />
        </div>

        <div class="select-block">
          <DropdownSelector
            class="m-2"
            v-model="state.selectedLeft"
            :options="state.units"
            :modelValue="state.units[0].name"
            @update:modelValue="handleSelect"
          />
        </div>
      </div>

      <div class="block-center self-center">
        <img src="../../assets/swap.svg" alt="Swap" />
      </div>

      <div class="block-right w-5/12 m-auto">
        <TextInput
          class="m-1"
          v-model="state.valueRight"
          :modelValue="1"
          @update:modelValue="handleInputValueRight"
        />
        <div class="select-block">
          <DropdownSelector
            class="m-2 w-full"
            v-model="state.selectedRight"
            :options="state.units"
            :modelValue="state.units[2].name"
            @update:modelValue="handleSelect"
          />
        </div>
      </div>
    </div>

    <div class="unit-table items-center w-full p-6">
      <div class="unit-table-header mt-16 mb-6 font-semibold text-center">
        {{ $t("referenceGuideTitle") }}
      </div>

      <div class="table min-w-full m-auto">
        <div
          v-for="unit in state.units"
          :key="unit.key"
          class="table-row-group"
        >
          <div class="table-row">
            <span class="table-cell w-1/3 border-b border-cerebral-grey py-3">{{
              unit.name
            }}</span>
            <span class="table-cell w-1/3 border-b border-cerebral-grey py-3">
              {{ unit.amount }} {{ unit.symbol }}
            </span>
            <span class="table-cell w-1/3 border-b border-cerebral-grey py-3"
              >{{ unit.amountInHbar }} ℏ</span
            >
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<script lang= "ts">
import { defineComponent, reactive } from "vue";
import Headline from "../../components/interface/Headline.vue";
import TextInput from "../../components/base/TextInput.vue";
import DropdownSelector from "../../components/base/DropdownSelector.vue";
import { HbarUnit, Hbar } from "@hashgraph/sdk";
import BigNumber from "bignumber.js";
// import Hbar from "../../utils/test-bignumber.js";
import Long from "long";

export default defineComponent({
  name: "ConvertUnits",
  components: {
    Headline,
    TextInput,
    DropdownSelector,
  },
  setup() {
    BigNumber.config({
      EXPONENTIAL_AT: 1e9,
      DECIMAL_PLACES: 64,
    });

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
      ],
    });

    function handleInputValueLeft(value: string, e: Event): void {
      if (isNaN(value)) {
        return;
      }
      state.valueLeft = value;
      computeValueRight();
      computeValueLeft();
    }

    function handleInputValueRight(value: string, e: Event): void {
      if (isNaN(value)) {
        return;
      }
      state.valueRight = value;
      computeValueLeft();
      computeValueRight();
    }

    function handleSelect(): void {
      let unitRight = state.selectedRight;
      let unitLeft = state.selectedLeft;
      let hLeft = new Hbar(
        new BigNumber(state.valueLeft),
        getHbarUnit(unitLeft)
      );
      state.valueRight = hLeft.to(getHbarUnit(unitRight)).toString();
      console.log(state.valueRight);
    }

    function getHbarUnit(value: string): HbarUnit {
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

    function getMultiplier(unit: string) {
      switch (unit) {
        case "Tinybar":
          return 1;
        case "Microbar":
          return 100;
        case "Millibar":
          return 100000;
        case "Hbar":
          return 1000000;
        case "Kilobar":
          return 100000000000;
        case "Megabar":
          return 100000000000000;
        case "Gigabar":
          return 100000000000000000;
        default:
          return 1;
      }
    }


    function checkBounds(unit: Hbar): Boolean {
      let test = new BigNumber(unit.toTinybars());

      if (test > 500000000000000000) {
        return false;
      }
      return true;
    }

    function computeValueLeft(): void {
      let unitRight = state.selectedRight;
      let unitLeft = state.selectedLeft;

      let hRight = new Hbar(
        new BigNumber(state.valueRight),
        getHbarUnit(unitRight)
      );
      let hLeft = new Hbar(new BigNumber(state.valueLeft), getHbarUnit(unitLeft));

      if (checkBounds(hRight) && checkBounds(hLeft)) {
        state.valueLeft = hRight.to(getHbarUnit(unitLeft)).toString();
      } else {
        state.valueLeft = "0";
        state.valueRight = "0";
        throw Error("Converted units has exceeded 50,000,000 Hbars");
      }
    }

    function computeValueRight(): void {
      let unitRight = state.selectedRight;
      let unitLeft = state.selectedLeft;
      let hLeft = new Hbar(
        new BigNumber(state.valueLeft),
        getHbarUnit(unitLeft)
      );
      let hRight = new Hbar(new BigNumber(state.valueRight), getHbarUnit(unitRight));

      if (checkBounds(hLeft) && checkBounds(hRight)) {
        state.valueRight = hLeft.to(getHbarUnit(unitRight)).toString();
      } else {
        state.valueRight = "0";
        state.valueLeft = "0";
        throw Error("Converted units has exceeded 50,000,000 Hbars");
      }
    }

    return {
      state,
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



