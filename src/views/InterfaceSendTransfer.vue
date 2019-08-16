<template>
    <InterfaceForm title="Send Transfer">
        <TextInput
            v-model="amount"
            has-input
            label="Amount"
            type="number"
            action="Entire Balance"
            show-validation
            :valid="true"
            @action="handleClickEnterBalance"
        />

        <TextInput
            v-model="toAccount"
            placeholder="shard.realm.account"
            label="To Account"
            show-validation
            :valid="isIdValid"
            can-copy
        />

        <TextInput
            label="Maximum Transaction Fee"
            show-validation
            :valid="true"
        />

        <template v-slot:footer>
            <!-- FIXME: Pluralize appropriately -->
            <Button
                :label="amount > 0 ? `Send ${amount} Hbars` : 'Send Hbars'"
                :disabled="false"
            />
        </template>
    </InterfaceForm>
</template>

<script lang="ts">
import TextInput from "../components/TextInput.vue";
import InterfaceForm from "../components/InterfaceForm.vue";
import Button from "../components/Button.vue";
import { createComponent, value, computed } from "vue-function-api";

export default createComponent({
    components: {
        TextInput,
        InterfaceForm,
        Button
    },
    setup(): {} {
        const amount = value("0");
        const toAccount = value("");
        const idRegex = /^\d+\.\d+\.\d+$/;

        const isIdValid = computed(() => idRegex.test(toAccount.value));

        function handleClickEnterBalance() {
            console.log("handleClickEnterBalance");
        }

        return {
            amount,
            toAccount,
            isIdValid,
            handleClickEnterBalance
        };
    }
});
</script>
