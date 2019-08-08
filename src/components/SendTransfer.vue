<template>
    <div class="send-transaction">
        <InterfaceTile title="Send Transfer">
            <div class="field">
                <TextInput
                    v-model="amount"
                    has-input
                    label="Amount"
                    type="number"
                    compact
                    action="Entire Balance"
                    @action="entireBalanceActionClick"
                />
                <div v-if="true" class="warning">Not enough Hbar to send.</div>
            </div>

            <div class="field">
                <TextInput
                    v-model="toAccount"
                    placeholder="shard.realm.account"
                    validate-id
                    label="To Account"
                    compact
                    can-copy
                />
            </div>

            <div class="field">
                <div class="label">
                    Maximum Transaction Fee
                </div>
                <div class="fee-container">
                    <div class="fee">
                        {{ maxFee }}
                    </div>
                    <div class="conversion">
                        {{ rate }}
                    </div>
                </div>
            </div>
        </InterfaceTile>
    </div>
</template>

<script lang="ts">
import TextInput from "../components/TextInput.vue";
import InterfaceTile from "../components/InterfaceTile.vue";
import { createComponent, value } from "vue-function-api";

export default createComponent({
    components: {
        TextInput,
        InterfaceTile
    },
    setup(): {} {
        const amount = value("0");
        const toAccount = value("");
        const maxFee = value("1,000,000 HBar");
        const rate = value("Cost 1 HBar = $0.12");

        function entireBalanceActionClick() {
            console.log("entireBalanceActionClick");
        }

        function copyAccountActionClick() {
            console.log("copyAccountActionClick");
        }

        return {
            amount,
            toAccount,
            maxFee,
            rate,
            entireBalanceActionClick,
            copyAccountActionClick
        };
    }
});
</script>

<style scoped>
.warning {
    color: var(--color-red);
    font-size: 14px;
    margin-block-start: 7px;
    margin-inline-start: 15px;
}

.field {
    margin-block-end: 30px;
}

.fee-container {
    align-items: center;
    display: flex;
    justify-content: space-between;
    padding: 0 10px;
    width: 100%;
}

.label {
    cursor: pointer;
    display: block;
    font-size: 16px;
    font-weight: 600;
    margin-block-end: 13px;
    padding: 0 10px;
}
</style>
