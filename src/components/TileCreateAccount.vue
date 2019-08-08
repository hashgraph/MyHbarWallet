<template>
    <div class="tile-create-account">
        <InterfaceForm title="Create Account">
            <div class="field">
                <TextInput
                    v-model="balance"
                    has-input
                    label="Initial Balance"
                    type="number"
                    compact
                />
                <div v-if="true" class="warning">
                    Not enough Hbar to create.
                </div>
            </div>

            <div class="field">
                <TextInput
                    v-model="publicKey"
                    placeholder="shard.realm.account"
                    validate-id
                    label="Public Key"
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
        </InterfaceForm>
    </div>
</template>

<script lang="ts">
import Vue from "vue";
import TextInput from "../components/TextInput.vue";
import InterfaceForm from "../components/InterfaceForm.vue";

export default Vue.extend({
    components: {
        TextInput,
        InterfaceForm
    },
    data() {
        return {
            balance: "0",
            publicKey: "",
            maxFee: "1,000,000 HBar"
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
