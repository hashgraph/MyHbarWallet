<template>
    <div class="tile-create-account">
        <InterfaceForm title="Create Account">
            <div class="field">
                <NumberInput
                    v-model="balance"
                    has-input
                    label="Initial Balance"
                    show-validation
                    :valid="validBalance"
                    compact
                    suffix="ħ"
                    @input="handleBalanceInput"
                />
            </div>

            <div class="field">
                <TextInput
                    v-model="publicKey"
                    validate-id
                    label="Public Key"
                    show-validation
                    :valid="validKey"
                    compact
                    @input="handleKeyInput"
                />
            </div>

            <div class="field">
                <NumberInput
                    v-model="maxFee"
                    label="Maximum Transaction Fee"
                    :valid="validMaxFee"
                    show-validation
                    compact
                    suffix="ħ"
                    @input="handleMaxFeeInput"
                />
            </div>
        </InterfaceForm>
    </div>
</template>

<script lang="ts">
import TextInput from "../components/TextInput.vue";
import NumberInput from "@/components/NumberInput.vue";
import InterfaceForm from "../components/InterfaceForm.vue";
import { createComponent, value } from "vue-function-api";

// make this a global const?
const ED25519_PREFIX = "302a300506032b6570032100";

export default createComponent({
    components: {
        TextInput,
        InterfaceForm,
        NumberInput
    },
    setup() {
        // fixme: get actual user balance
        const userBalance = 10;

        // 5 is used a default starting balance
        const validBalance = value<boolean>(5 <= userBalance);
        const validKey = value<boolean>(false);
        const validMaxFee = value<boolean>(100000 <= userBalance);

        function handleBalanceInput(input: number) {
            validBalance.value = input >= 0 && input <= userBalance;
        }

        function handleKeyInput(input: string) {
            // todo: public key validation
            validKey.value = input.startsWith(ED25519_PREFIX);
        }

        function handleMaxFeeInput(input: number) {
            if (input === null) {
                validMaxFee.value = false;
            }

            console.log(input);

            validMaxFee.value = input >= 0 && input <= userBalance;
        }

        return {
            balance: 5,
            publicKey: "",
            maxFee: 10,
            validBalance,
            validKey,
            validMaxFee,
            handleBalanceInput,
            handleKeyInput,
            handleMaxFeeInput
        };
    }
});
</script>

<style scoped>
.warning {
    color: var(--color-lightish-red);
    font-size: 14px;
    margin-inline: 15px 7px;
}

.field {
    margin-block-end: 30px;
}
</style>
