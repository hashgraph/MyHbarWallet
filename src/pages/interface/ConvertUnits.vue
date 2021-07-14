<template>
  <Headline
    :title="$t('InterfaceConvertUnits')"
    parent="tools"
  />
  <div
    class="items-center pb-10 mt-8 font-medium border-b text-carbon border-cerebral-grey dark:border-midnight-express"
  >
    <div class="m-16 page-subtitle">
      {{ $t("ourHelpfulConversionTool") }}
    </div>

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
            :options="state.units"
            :placeholder="state.units[0].name"
            @update:modelValue="handleSelect"
          />
        </div>
      </div>

      <div class="self-center block-center">
        <img
          src="../../assets/swap.svg"
          alt="Swap"
        >
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
            :options="state.units"
            @update:modelValue="handleSelect"
          />
        </div>
      </div>
    </div>

    <div class="items-center m-16 unit-table">
      <div
        class="mt-16 mb-6 font-semibold text-center unit-table-header"
      >
        {{ $t("referenceGuideTitle") }}
      </div>

      <div class="table min-w-full m-auto">
        <div
          v-for="unit in state.units"
          :key="unit.name"
          class="table-row-group"
        >
          <div class="table-row">
            <span
              class="table-cell w-1/3 py-3 pl-6 border-b border-cerebral-grey"
            >{{ unit.name }}</span>
            <span class="table-cell w-1/3 py-3 pl-10 border-b border-cerebral-grey">
              <!-- {{ unit.amount }} {{ unit.symbol }} -->
            </span>
            <!-- <span
              class="table-cell w-1/3 py-3 pl-16 border-b border-cerebral-grey"
                        >{{ unit.amountInHbar }} ℏ</span>-->
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive } from "vue";
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

        const state = reactive({
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
            ] as unknown as Option[],
        });

        function handleInputValueLeft(value: string): void {
            state.valueLeft = value;
            computeValueRight();
            computeValueLeft();
        }

        function handleInputValueRight(value: string): void {
            state.valueRight = value;
            computeValueLeft();
            computeValueRight();
        }

        async function handleSelect(): Promise<void> {
            const { Hbar, HbarUnit } = await import("@hashgraph/sdk");
            let unitRight = state.selectedRight;
            let unitLeft = state.selectedLeft;
            let hLeft = new Hbar(
                new BigNumber(state.valueLeft),
                await getHbarUnit(unitLeft)
            );
            state.valueRight = hLeft.to(await getHbarUnit(unitRight)).toString();
            console.log(state.valueRight);

            let test = new Hbar(111, HbarUnit.Gigabar);
            console.log(`Test: ${test.to(HbarUnit.Tinybar).toString()}`);
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
