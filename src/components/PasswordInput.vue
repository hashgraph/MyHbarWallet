<template>
    <div class="password-container">
        <div class="header">
            <div class="text">
                Password
            </div>
            <div class="password-switch">
                <div class="text">
                    Optional
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
                placeholder="Please Enter Password"
                obscure
                compact
                :tabindex="showPassword ? null : '-1'"
                @input="handleInput"
            />
        </div>
    </div>
</template>

<script lang="ts">
import Vue from "vue";
import TextInput from "../components/TextInput.vue";
import SwitchButton from "../components/SwitchButton.vue";

export default Vue.extend({
    name: "PasswordInput",
    components: {
        TextInput,
        SwitchButton
    },
    props: {
        value: { type: String, default: "" }
    },
    data() {
        return {
            showPassword: false
        };
    },
    methods: {
        handleInput(password: string) {
            this.$emit("input", password);
        },
        handleChangeShowPassword(showPassword: boolean) {
            if (showPassword) {
                // If we are now showing the password,
                // focus the password input
                (this.$refs.input as TextInput).focus();
            }
        }
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
    transition: max-height 0.3s ease;
    transition: padding-top 0.3s ease;

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
</style>
