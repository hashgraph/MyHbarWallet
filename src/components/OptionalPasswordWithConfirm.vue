<template>
    <div class="password-container">
        <div class="header">
            <div class="text">
                {{ $t("common.password.password") }}
            </div>
            <div class="password-switch">
                <div class="text">
                    {{ $t("common.optional") }}
                </div>
                <SwitchButton
                    v-model="state.showPassword"
                    class="btn"
                    @change="handleToggleDisplay"
                />
            </div>
        </div>
        <div
            class="password-input"
            :class="{ expanded: state.showPassword }"
        >
            <transition name="fade">
                <PasswordWithConfirm
                    v-if="state.showPassword"
                    v-model="state.passwordWithConfirmState"
                    @valid="handlePasswordValid"
                    @change="handlePasswordChange"
                />
            </transition>
            <transition name="fade">
                <div
                    class="password-warning"
                    :v-if="state.showPassword && passwordWarning != null"
                >
                    <p>{{ passwordWarning }}</p>
                </div>
            </transition>
        </div>
    </div>
</template>

<script lang="ts">
import { createComponent, reactive } from "@vue/composition-api";
import TextInput from "../components/TextInput.vue";
import SwitchButton from "../components/SwitchButton.vue";
import PasswordWithConfirm, { State as PasswordWithConfirmState } from "../components/PasswordWithConfirm.vue";

export default createComponent({
    components: {
        TextInput,
        SwitchButton,
        PasswordWithConfirm
    },
    props: { passwordWarning: String },
    setup(props, context) {
        const state = reactive({
            showPassword: false,
            passwordWarning: props.passwordWarning,
            passwordWithConfirmState: {
                password: "",
                confirmationPassword: "",
                passwordStrength: 0,
                passwordSuggestion: ""
            }
        });

        function handleToggleDisplay(show: boolean): void {
            state.passwordWithConfirmState.password = "";
            state.passwordWithConfirmState.confirmationPassword = "";
            state.showPassword = show;
        }

        function handlePasswordValid(valid: boolean): void {
            context.emit("valid", valid);
        }

        function handlePasswordChange(state: PasswordWithConfirmState): void {
            context.emit("change", state);
        }

        return { state, handleToggleDisplay, handlePasswordValid, handlePasswordChange };
    }
});
</script>

<style scoped lang="postcss">
.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.5s;
}

.fade-enter,
.fade-leave-to {
    opacity: 0;
}

.password-container {
    border-bottom: 2px solid var(--color-peral);
    border-top: 2px solid var(--color-peral);
    margin-block-end: 20px;
    padding: 20px 0;
}

.password-switch {
    align-items: center;
    align-self: flex-end;
    display: flex;

    & > .text {
        color: var(--color-melbourne-cup);
        font-size: 16px;
        margin-inline-end: 13px;
    }
}

.password-container > .header {
    align-items: center;
    display: flex;
    flex-grow: 0;
    justify-content: space-between;
    padding: 0 10px;
    width: 100%;

    & > .text {
        color: var(--color-washed-black);
        font-size: 16px;
        font-weight: 600;
    }
}

.password-input {
    padding: 0 10px;
    transition: all 0.3s ease;

    @media screen and (prefers-reduced-motion: reduce) {
        transition: none;
    }
}

.password-input:not(.expanded) {
    height: 0;
    opacity: 0;
    overflow-y: hidden;
    padding-block-start: 0;
}

.password-input.expanded {
    opacity: 1;
    padding-block-start: 30px;
}

.password-warning {
    color: var(--color-china-blue);
    margin-block-start: 20px;
    padding: 0 10px;
    pointer-events: none;
}

.password-input.expanded .password-warning {
    pointer-events: all;
}
</style>
