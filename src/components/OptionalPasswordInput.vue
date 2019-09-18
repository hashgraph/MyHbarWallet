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
                    v-model="showPassword"
                    class="btn"
                    @change="handleChangeShowPassword"
                />
            </div>
        </div>
        <div class="password-input" :class="{ expanded: showPassword }">
            <TextInput
                ref="input"
                :value="value"
                :placeholder="$t('optionalPasswordInput.pleaseEnterPassword')"
                obscure
                compact
                :tabindex="showPassword ? null : '-1'"
                @input="handleInput"
            />
            <div class="password-warning" :v-if="passwordWarning !== null">
                <p>{{ passwordWarning }}</p>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { createComponent, reactive } from "@vue/composition-api";
import { SetupContext } from "@vue/composition-api/dist/types/vue";
import TextInput from "../components/TextInput.vue";
import SwitchButton from "../components/SwitchButton.vue";

interface Context extends SetupContext {
    refs: {
        input: HTMLInputElement;
    };
}

export default createComponent({
    components: {
        TextInput,
        SwitchButton
    },
    props: {
        value: { type: String, default: "" },
        passwordWarning: { type: String, default: null }
    },
    setup(props, context) {
        const showPassword = reactive(false);

        function handleInput(password: string): void {
            context.emit("input", password);
        }

        function handleChangeShowPassword(showPassword: boolean): void {
            if (showPassword) {
                // If we are now showing the password,
                // focus the password input
                if (((context as unknown) as Context).refs.input != undefined) {
                    ((context as unknown) as Context).refs.input.focus();
                }
            }
        }

        return { showPassword, handleInput, handleChangeShowPassword };
    }
});
</script>

<style scoped lang="postcss">
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
    padding-inline: 10px;
    transition: max-height 0.3s ease, padding-block-start 0.3s ease;

    @media screen and (prefers-reduced-motion: reduce) {
        transition: none;
    }
}

.password-input:not(.expanded) {
    max-height: 0;
    opacity: 0;
    padding-block-start: 0;
}

.password-input.expanded {
    max-height: 800px;
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
