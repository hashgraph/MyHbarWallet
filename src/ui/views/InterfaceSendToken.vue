<template>
    <InterfaceForm :title="$t('interfaceSendToken.title')">
        <div
            v-if="hasTokens"
            class="content"
        >
            <TextInput
                ref="amountInput"
                class="amount"
                :value="state.amount"
                :valid="isAmountValid"
                :error="state.amountError"
                has-input
                :label="$t('common.amount')"
                show-validation
                @input="handleAmount"
            />

            <span
                class="label"
            >
                {{ $t('token.token') }}
            </span>
            <Select
                v-model="state.tokenSelected"
                class="select"
                :options="tokenIds"
            />

            <IDInput
                ref="idInput"
                class="account"
                :error="state.accountError"
                :valid="state.accountValid"
                :label="$t('common.toAccount')"
                show-validation
                @input="handleAccount"
                @valid="handleAccountValid"
            />

            <OptionalMemoField
                v-model="state.memo"
            />
        </div>
        <div v-else>
            <Notice :symbol="mdiHelpCircleOutline">
                {{ $t("interfaceTokenBalances.noTokens") }}
            </Notice>
        </div>
        <template v-slot:footer>
            <Button
                :busy="state.busy"
                :disabled="state.disabled || !hasTokens || !isAmountValid || !state.accountValid"
                :label="$t('interfaceSendToken.send')"
                @click="handleSubmit"
            />
        </template>
    </InterfaceForm>
</template>

<script lang="ts">
import { defineComponent, reactive, ref, onMounted, computed } from "@vue/composition-api";
import { mdiHelpCircleOutline } from "@mdi/js";
import { AccountId, Client, TokenId } from "@hashgraph/sdk";
import { BigNumber } from "bignumber.js";

import Button from "../components/Button.vue";
import InterfaceForm from "../components/InterfaceForm.vue";
import IDInput from "../components/IDInput.vue";
import TextInput from "../components/TextInput.vue";
import Notice from "../components/Notice.vue";
import OptionalMemoField from "../components/OptionalMemoField.vue";
import Select from "../components/Select.vue";
import { actions, getters } from "../store";
import { sendToken } from "../../service/hedera";

export default defineComponent({
    name: "InterfaceSendToken",
    components: { Button, InterfaceForm, TextInput, Notice, IDInput, OptionalMemoField, Select },
    setup(_, context) {
        onMounted(() => {
            if (getters.currentUserTokens() == null) {
                actions.refreshBalancesAndRate();
            }
        });

        const tokens = computed(() => getters.currentUserTokens());

        const hasTokens = computed(() => {
            if (tokens.value != null) {
                return tokens.value.length > 0;
            }

            return false;
        });

        const tokenIds = computed(() => {
            if (tokens.value != null) return tokens.value.map(({ tokenId }) => tokenId.toString());
            return [];
        });

        const firstToken = computed(() => {
            if (tokenIds.value != null) return tokenIds.value[ 0 ];
            return null;
        });

        const state = reactive({
            amount: null as string | null,
            busy: null as boolean | null,
            disabled: !hasTokens.value || false,
            tokenSelected: firstToken.value,
            accountValid: null as boolean | null,
            amountError: null as string | null,
            accountError: null as string | null,
            memo: null as string | null,
            recipient: null as AccountId | null
        });

        const idInput = ref(null);
        const amountInput = ref(null);

        function handleAccount(account: AccountId): void {
            state.accountError = null;
            state.recipient = account;
        }

        function handleAccountValid(valid: boolean): void {
            state.accountValid = valid;
        }

        function validateTokenBalance(amount: BigNumber): boolean {
            if (tokens.value != null) {
                return tokens.value.filter(
                    (token) => token.tokenId.toString() === state.tokenSelected
                )[ 0 ].balance.isGreaterThan(amount);
            }
            return false;
        }

        const isAmountValid = computed(() => {
            if (state.amount) {
                const bigAmount = new BigNumber(state.amount);
                return (
                    !bigAmount.isNaN() &&
                    bigAmount.isGreaterThan(new BigNumber(0)) &&
                    validateTokenBalance(bigAmount)
                );
            }
            return false;
        });

        function handleAmount(amount: string): void {
            state.amountError = null;
            state.amount = amount;

            if (!isAmountValid.value) {
                if (state.amount === "") {
                    state.amountError = null;
                } else if (
                    // slight reproduction of effort
                    new BigNumber(state.amount).isNaN() ||
                    new BigNumber(state.amount).isLessThanOrEqualTo(new BigNumber(0))) {
                    state.amountError = context.root.$t("interfaceSendToken.invalidAmount").toString();
                } else {
                    state.amountError = context.root.$t("interfaceSendToken.insufficientTokenBalance").toString();
                }
            }
        }

        async function handleSubmit(): Promise<void> {
            state.busy = true;

            try {
                await sendToken(
                    TokenId.fromString(state.tokenSelected!),
                    state.recipient!,
                    getters.currentUser().session.client as Client,
                    new BigNumber(
                        state.amount!
                    ).multipliedBy(
                        new BigNumber(
                            tokens.value!.filter(
                                (token) => token.tokenId.toString() === state.tokenSelected
                            )[ 0 ].decimals
                        )
                    ),
                    state.memo
                );

                actions.alert({
                    message: context.root.$t("interfaceSendToken.sentToken").toString(),
                    level: "success"
                });
            } catch (error) {
                const result = await actions.handleHederaError({ error, showAlert: false });
                state.accountError = result.message;
            }

            state.busy = false;
        }

        return { isAmountValid, mdiHelpCircleOutline, tokens, hasTokens, tokenIds, state, idInput, amountInput, handleAccount, handleAccountValid, handleAmount, handleSubmit };
    }
});
</script>

<style lang="postcss" scoped>
.account {
    padding-block: 10px;
}

.amount {
    padding-block-end: 10px;
}

.content {
    display: flex;
    flex-direction: column;
}

.label {
    display: block;
    font-size: 16px;
    font-weight: 600;
    height: 24px;
    margin-block-end: 13px;
    padding: 0 8px;
}

.select {
    min-width: 100px;
    width: 100%;
}
</style>
