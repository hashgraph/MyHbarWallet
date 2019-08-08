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
                />
                <div v-if="true" class="warning">Not enough Hbar to send.</div>
            </div>

            <div class="field">
                <TextInput
                    v-model="toAccount"
                    placeholder="shard.realm.account"
                    validate-id
                    label="To Accouunt"
                    compact
                />
            </div>

            <div class="field">
                <TextInput
                    :value="maxFee"
                    label="Maximum Transaction Fee"
                    compact
                />
            </div>
        </InterfaceTile>
    </div>
</template>

<script lang="ts">
import Vue from "vue";
import TextInput from "../components/TextInput.vue";
import InterfaceTile from "../components/InterfaceTile.vue";

export default Vue.extend({
    components: {
        TextInput,
        InterfaceTile
    },
    data() {
        return {
            amount: "0",
            toAccount: "",
            maxFee: "1,000,000 HBar"
        };
    }
});
</script>

<style scoped>
.warning {
    color: var(--color-red);
    font-size: 14px;
    margin-inline: 15px 7px;
}

.field {
    margin-block-end: 30px;
}
</style>
