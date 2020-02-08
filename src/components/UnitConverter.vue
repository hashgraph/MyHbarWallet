<template>
  <div class="unit-input">
    <div class="wrap">
      <div class="block-left">
        <div class="input-block">
          <TextInput
            :placeholder="$t('common.amount')"
            :value="state.valueLeft"
            compact
            step="any"
            white
            @input="handleInputValueLeft"
          />
        </div>
        <div class="select-block">
          <Select
            v-model="state.selectedLeft"
            :left="true"
            :options="options"
            @change="handleInputValueLeft"
          />
        </div>
      </div>

      <div class="block-center">
        <div class="convert-icon">
          <img
            alt=""
            src="../assets/swap.svg"
          >
        </div>
      </div>

      <div class="block-right">
        <div class="input-block">
          <TextInput
            :placeholder="$t('common.amount')"
            :value="state.valueRight"
            compact
            step="any"
            white
            @input="handleInputValueRight"
          />
        </div>
        <div class="select-block">
          <Select
            v-model="state.selectedRight"
            :left="false"
            :options="options"
            @change="handleInputValueRight"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { createComponent, reactive } from "@vue/composition-api";
import BigNumber from "bignumber.js";

import { convert, Unit } from "../units";

import Select from "./Select.vue";
import TextInput from "./TextInput.vue";

interface State {
    selectedLeft: Unit;
    selectedRight: Unit;
    valueLeft: string;
    valueRight: string;
}

export default createComponent({
    name: "UnitConverter",
    components: {
        Select,
        TextInput
    },
    setup() {
        const options = Object.values(Unit);

        const numericRegex = /^\d*\.?\d*$/u;

        const state = reactive<State>({
            selectedLeft: Unit.Tinybar,
            selectedRight: Unit.Hbar,
            valueLeft: "100000000",
            valueRight: "1"
        });

        function boundInput(
            event: Event,
            inputValue: string,
            stateValue: string
        ): void {
            // If the computed value from the round-trip from {input} -> left -> right
            // is different than {input} then we should replace {input} so as
            // to prevent typing more

            const computedValueNum = new BigNumber(stateValue);
            const valueNum = new BigNumber(inputValue);

            if (!computedValueNum.eq(valueNum)) {
                // Computed value is different from input value; replace
                (event.target as HTMLInputElement).value = stateValue;
            } else {
                // Strip non-digit chars from input
                (event.target as HTMLInputElement).value = inputValue.replace(
                    /[^\d.]/u,
                    ""
                );
            }
        }

        function computeValueLeft(): void {
            state.valueLeft = convert(
                state.valueRight,
                state.selectedRight,
                state.selectedLeft,
                false
            );
        }

        function computeValueRight(): void {
            state.valueRight = convert(
                state.valueLeft,
                state.selectedLeft,
                state.selectedRight,
                false
            );
        }

        function handleInputValueLeft(value: string, event: Event): void {
            let _value = value;
            if (!numericRegex.test(_value)) _value = state.valueLeft;

            state.valueLeft = _value;

            computeValueRight();
            computeValueLeft();

            boundInput(event, _value, state.valueLeft);
        }

        function handleInputValueRight(value: string, event: Event): void {
            let _value = value;
            if (!numericRegex.test(_value)) _value = state.valueRight;

            state.valueRight = _value;

            computeValueLeft();
            computeValueRight();

            boundInput(event, _value, state.valueRight);
        }

        return {
            state,
            options,
            handleInputValueRight,
            handleInputValueLeft
        };
    }
});
</script>

<style lang="postcss" scoped>
    .wrap {
        align-items: center;
        display: grid;
        grid-template-columns: 4fr 1fr 4fr;

        @media (max-width: 800px) {
            display: block;
        }
    }

    .select-block {
        position: relative;
    }

    .input-block {
        margin-block-end: 5px;

        @media (max-width: 800px) {
            margin-inline-end: 0;
        }
    }

    .block-left {
        @media (max-width: 800px) {
            display: flex;
            flex-direction: column;
        }
    }

    .block-center {
        text-align: center;
    }

    .block-right {
        @media (max-width: 800px) {
            display: flex;
            flex-direction: column;
        }
    }

    @media screen and (max-width: 800px) {
        .block-center {
            margin: 20px 0;
        }

        .convert-icon > img {
            transform: rotate(90deg);
        }
    }
</style>
