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
                <TextInput
                    ref="input"
                    :value="value"
                    :placeholder="$t('optionalPasswordInput.pleaseEnterPassword')"
                    obscure
                    compact
                    :tabindex="state.showPassword ? null : '-1'"
                    @input="handleInput"
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
import { defineComponent, reactive, SetupContext, watch } from "@vue/composition-api";

import TextInput from "./TextInput.vue";
import SwitchButton from "./SwitchButton.vue";

interface Context extends SetupContext {
    refs: {
        input: HTMLInputElement;
    };
}

interface State {
    showPassword: boolean;
}

export default defineComponent({
    components: {
        TextInput,
        SwitchButton
    },
    props: {
        value: { type: String, default: "" },
        passwordWarning: { type: String, default: null }
    },
    setup(props, context) {
        const state = reactive({ showPassword: false });

        function handleInput(password: string): void {
            if (state.showPassword) context.emit("input", password);
        }

        function handleToggleDisplay(show: boolean): void {
            state.showPassword = show;
            if (!show) context.emit("input", "");
        }

        watch(
            () => state.showPassword,
            (showPassword: boolean) => {
                if (showPassword) {
                    // If we are now showing the password,
                    // focus the password input
                    if (
                        ((context as unknown) as Context).refs.input != null
                    ) {
                        ((context as unknown) as Context).refs.input.focus();
                    }
                }
            }
        );

        return { state, handleInput, handleToggleDisplay };
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
    overflow-y: hidden;
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
