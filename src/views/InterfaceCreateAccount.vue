<template>
    <InterfaceForm title="Create Account">
        <TextInput
            v-model="balance"
            has-input
            label="Initial Balance"
            show-validation
            :min="0"
            :valid="validBalance"
            suffix="Hbar"
            type="number"
            @input="handleBalanceInput"
        />

        <TextInput
            v-model="publicKey"
            label="Public Key"
            show-validation
            :valid="validKey"
            @input="handleKeyInput"
        />

        <TextInput
            v-model="maxFee"
            label="Maximum Transaction Fee"
            :valid="validMaxFee"
            :min="0"
            show-validation
            suffix="Tinybar"
            type="number"
            @input="handleMaxFeeInput"
        />

        <template v-slot:footer>
            <Button :disabled="false" label="Create Account" />
        </template>
    </InterfaceForm>
</template>

<script lang="ts">
import TextInput from "../components/TextInput.vue";
import Button from "../components/Button.vue";
import InterfaceForm from "../components/InterfaceForm.vue";
import { createComponent, value } from "vue-function-api";

// make this a global const?
const ED25519_PREFIX = "302a300506032b6570032100";

export default createComponent({
    components: {
        TextInput,
        InterfaceForm,
        Button
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
