<template>
    <form @submit.prevent="$emit('submit', state.password)">
        <PasswordWithConfirm
            v-model="state"
            @valid="handleValid"
        />
        <div class="btn-container">
            <Button
                :disabled="isDisabled"
                :label="$t('common.next')"
                :trailing-icon="mdiArrowRight"
                class="btn"
            />
        </div>
    </form>
</template>

<script lang="ts">
import { defineComponent, ref } from "@vue/composition-api";
import Button from "./Button.vue";
import PasswordWithConfirm, { State as PasswordConfirmState } from "./PasswordWithConfirm.vue";
import { mdiArrowRight } from "@mdi/js";

export default defineComponent({
    props: {},
    components: {
        Button,
        PasswordWithConfirm
    },
    setup() {
        const state: PasswordConfirmState = {
            password: "",
            confirmationPassword: "",
            passwordStrength: 0,
            passwordSuggestion: ""
        };
        const isDisabled = ref(true);
        function handleValid(valid: boolean): void {
            isDisabled.value = !valid;
        }
        return { state, isDisabled, handleValid, mdiArrowRight };
    }
});
</script>

<style lang="postcss" scoped>
.btn-container {
    align-items: center;
    display: flex;
    justify-content: center;
}

.btn {
    margin-block: 40px;
}

</style>
