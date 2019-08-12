<template>
    <div class="sign-message">
        <div class="title-container">
            <div class="title">Sign Message</div>
        </div>
        <div class="content">
            <div class="description">
                Include your nickname and where you use the nickname so someone
                else cannot use it. Include a specific reason for the message so
                it cannot be reused for a different purpose.
            </div>
            <div class="text-input-label">Message</div>
            <TextInput v-model="messageText" :multiline="true" />
            <div v-if="!disableErr" class="validation-error">
                The message field is required
            </div>
            <!-- TODO: Get messageText and do something with it? -->
            <div class="bottom-content-container">
                <Button
                    class="sign-button"
                    label="Sign"
                    :disabled="disable"
                    @click="$emit('sign', messageText)"
                ></Button>
                <div class="bottom-text">
                    Have any issues?
                    <router-link :to="{ name: 'help-center' }"
                        >Help Center</router-link
                    >
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import TextInput from "../components/TextInput.vue";
import Button from "../components/Button.vue";
import { createComponent, watch, value } from "vue-function-api";

export default createComponent({
    components: {
        TextInput,
        Button
    },
    setup() {
        const messageText = value(null);
        const disable = value(true);
        const disableErr = value(true);

        const classObject = () => {
            if (disable) return "hidden";
        };

        watch(
            () => messageText.value,
            val => {
                if (val) disable.value = false;
                else disable.value = true;

                if (val === "") disableErr.value = false;
            }
        );

        return { messageText, disable, classObject, disableErr };
    }
});
</script>

<style lang="postcss" scoped>
.sign-message {
    background-color: var(--color-white);
}

.title {
    border-left: 5px solid var(--color-melbourne-cup);
    font-size: 24px;
    font-weight: 500;
    padding-inline-start: 27px;
}

.title-container {
    border-block-end: 2px solid var(--color-peral);
    padding-block: 15px;
}

.content {
    font-size: 14px;
    padding: 40px;
}

.description {
    color: var(--color-china-blue);
    margin-block-end: 40px;
    padding-inline: 8px;
}

.text-input-label {
    color: var(--color-washed-black);
    font-size: 16px;
    font-weight: 600;
    margin-block-end: 15px;
    padding-inline: 8px;
}

.bottom-content-container {
    display: flex;
    flex-flow: column wrap;
    margin-block-start: 30px;
    margin-block-start: 60px;
}

.sign-button {
    margin-inline: auto;
}

.bottom-text {
    color: var(--color-china-blue);
    margin-block-start: 20px;
    margin-inline: auto;
}

button:first-child {
    min-width: 300px;
}

a {
    color: var(--color-melbourne-cup);
    text-decoration: none;

    &:hover,
    &:focus {
        text-decoration: underline;
    }
}

.validation-error {
    color: var(--color-washed-black);
}
</style>
