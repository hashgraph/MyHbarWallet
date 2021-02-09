<template>
    <div class="asset-input">
        <!-- Asset -->
        <Select
            v-model="state.asset"
            class="select"
            :options="availableAssets"
        />

        <!-- Amount -->
        <TextInput
            class="input"
            compact
            :value="state.amount"
            :valid="state.amountValid"
            :error="state.amountErrorMessage"
            has-input
            show-validation
            @input="handleAmount"
        />
    </div>
</template>

<script lang="ts">
import {
    defineComponent,
    reactive,
    onMounted,
    computed
} from "@vue/composition-api";
import { BigNumber } from "bignumber.js";

import { Asset } from "../../domain/transfer";
import { actions, getters } from "../store";

import Select from "./Select.vue";
import TextInput from "./TextInput.vue";

export default defineComponent({
    name: "AssetInput",
    props: {
        asset: { type: String },
        amount: { type: String }
    },
    components: {
        Select,
        TextInput
    },
    setup(props, context) {
        onMounted(() => {
            if (getters.currentUser() != null) {
                if (getters.currentUserTokens() == null) {
                    actions.refreshBalancesAndRate();
                }
            }
        });

        const tokens = computed(() => getters.currentUserTokens() || []);

        const availableAssets = computed(() => {
            if (tokens.value.length > 0) {
                return [ Asset.Hbar, ...tokens.value.map(({ tokenId }) => tokenId.toString()) ];
            }

            return [ Asset.Hbar ];
        });

        const state = reactive({
            asset: props.asset ?? Asset.Hbar,
            amount: props.amount ?? "0.0",
            amountValid: null as boolean | null,
            amountErrorMessage: null as string | null
        });

        const currentToken = computed(() => {
            if (state.asset === Asset.Hbar) return null;

            if (tokens.value != null) {
                return tokens.value.filter(
                    (token) => token.tokenId.toString() === state.asset
                )[ 0 ];
            }

            return null;
        });

        const currentTokenDecimals = computed(() => {
            if (currentToken.value != null) return currentToken.value.decimals;
            if (state.asset === Asset.Hbar) return 8;
            return 0;
        });

        const scaleFactor = computed(() => new BigNumber(
            Math.pow(10, currentTokenDecimals.value)
        ));

        function validateAssetBalance(bigAmount: BigNumber): boolean {
            const adjustedAmount = bigAmount.multipliedBy(scaleFactor.value);
            if (state.asset === Asset.Hbar) return getters.currentUserBalance()?.asTinybar().isGreaterThan(adjustedAmount) ?? false;
            if (currentToken.value != null) return currentToken.value.balance.isGreaterThan(adjustedAmount);
            return false;
        }

        // eslint-disable-next-line unicorn/consistent-function-scoping
        function validate(): boolean {
            // eslint-disable-next-line unicorn/expiring-todo-comments
            // TODO: Check user did not supply more decimals than possible for this asset
            // const bigAmount = new BigNumber(state.amount);
            // return (
            //     !bigAmount.isNaN() &&
            //         bigAmount.isGreaterThan(new BigNumber(0)) &&
            //         validateAssetBalance(bigAmount)
            // );
            return true;
        }

        function handleAmount(newAmount: string): void {
            state.amountErrorMessage = null;
            state.amount = newAmount;

            if (validate()) {
                state.amountValid = true;
                context.emit("asset", state.asset);
                context.emit("amount", new BigNumber(state.amount));
            } else {
                state.amountErrorMessage = context.root.$t("common.error.invalidAmount").toString();
            }
        }

        return {
            state,
            availableAssets,
            handleAmount
        };
    }
});
</script>

<style lang="postcss" scoped>
.asset-input {
    align-items: center;
    display: flex;
}

.select {
    width: 200px;
}

.input {

}
</style>
