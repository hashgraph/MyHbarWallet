<template>
    <div class="password-with-confirm">
        <TextInput
            ref="input"
            v-model="state.password"
            :placeholder="$t('common.password.nineCharacters')"
            class="input"
            obscure
            @input="handleInputPassword"
        />

        <TextInput
            v-model="state.confirmationPassword"
            :placeholder="$t('common.password.confirmPassword')"
            :error="passwordMismatch"
            obscure
            @input="handleInputConfirmPassword"
        />

        <div
            v-if="state.password.length > 0"
            class="password-hint-container"
        >
            {{ $t("passwordStrength") }}
            <span
                v-if="state.passwordStrength === 0"
                class="strength very-weak"
            >
                {{ $t("passwordStrength.veryWeak") }}
            </span>
            <span
                v-else-if="state.passwordStrength === 1"
                class="strength weak"
            >
                {{ $t("passwordStrength.weak") }}
            </span>
            <span
                v-else-if="state.passwordStrength === 2"
                class="strength good"
            >
                {{ $t("passwordStrength.good") }}
            </span>
            <span
                v-else-if="state.passwordStrength === 3"
                class="strength strong"
            >
                {{ $t("passwordStrength.strong") }}
            </span>
            <span
                v-else-if="state.passwordStrength === 4"
                class="strength excellent"
            >
                {{ $t("passwordStrength.excellent") }}
            </span>
        </div>

        <div
            v-if="state.password.length > 0 && state.password.length < 9"
            class="password-hint-container"
        >
            {{ $t("common.password.nineCharacters") }}
        </div>

        <div v-if="meritsSuggestions">
            <div
                v-for="(suggestion, index) in state.passwordSuggestion
                    .suggestions"
                :key="index"
                class="password-hint-container"
            >
                {{ suggestion }}
            </div>
        </div>
    </div>
</template>
<script lang="ts">
import Vue from "vue";
import { createComponent, PropType, ref, computed, watch } from "@vue/composition-api";
import TextInput from "./TextInput.vue";

const wordlist: string[] = [
    "hedera",
    "Hedera",
    "hashgraph",
    "hbar",
    "crypto",
    "cryptocoin",
    "wallet",
    "myhbarwallet",
    "myhederawallet",
    "password"
];

export interface State {
    password: string;
    confirmationPassword: string;
    passwordStrength: number;
    passwordSuggestion: string;
}

export default createComponent({
    name: "PasswordWithConfirm",
    props: { state: Object as unknown as PropType<State> },
    components: { TextInput },
    model: {
        prop: "state",
        event: "change"
    },
    setup(props, context) {
        const passwordMismatch = ref("");
        const confirmPassword = computed(() => props.state!.confirmationPassword === props.state!.password);
        const valid = computed(() => confirmPassword.value && props.state!.passwordStrength >= 2);

        async function handleInputPassword(value: string): Promise<void> {
            const zxcvbn = await import("zxcvbn");

            const passwordMetrics = zxcvbn[ "default" ](value, wordlist);

            context.emit("change", {
                ...props.state,
                password: value,
                passwordStrength: passwordMetrics.score,
                passwordSuggestion: passwordMetrics.feedback
            });

            context.emit("valid", valid.value);
        }

        async function handleInputConfirmPassword(value: string): Promise<void> {
            context.emit("change", {
                ...props.state,
                confirmationPassword: value
            });
            context.emit("valid", valid.value);
        }

        const meritsSuggestions = computed(() => props.state!.password.length >= 9 &&
                props.state!.passwordStrength <= 3);

        watch(
            () => confirmPassword.value,
            (newVal) => {
                if (newVal) {
                    Vue.nextTick(
                        () => {
                            passwordMismatch.value = "";
                        }
                    );
                } else {
                    Vue.nextTick(
                        () => {
                            passwordMismatch.value = context.root
                                .$t("password.noMatch")
                                .toString();
                        });
                }
            }
        );

        return {
            passwordMismatch,
            confirmPassword,
            handleInputPassword,
            handleInputConfirmPassword,
            meritsSuggestions
        };
    }
});
</script>
<style scoped lang="postcss">
.password-with-confirm {
    width: 100%;
}

.input {
    margin-block-end: 20px;
}

.strength {
    font-weight: 600;
    margin-inline-start: 10px;
    text-align: start;
}

.very-weak {
    color: var(--color-washed-black);
}

.weak {
    color: var(--color-coral-red);
}

.good {
    color: var(--color-bubble-bobble-p2);
}

.strong {
    color: var(--color-melbourne-cup);
}

.excellent {
    color: var(--color-melbourne-cup);
}

.password-hint-container {
    color: var(--color-basalt-grey);
    font-size: 14px;
    margin-block-start: 10px;
}
</style>
