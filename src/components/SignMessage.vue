<template>
    <div class="sign-message">
        <div class="title-container">
            <div class="title">Sign Message</div>
        </div>
        <div class="content">
            <div class="paragraph">
                Include your nickname and where you use the nickname so someone
                else cannot use it. Include a specific reason for the message so
                it cannot be reused for a different purpose.
            </div>
            <div class="text-area-label">Message</div>
            <TextArea class="text-area" />
            <div class="bottom-content-container">
                <button class="submit-button">Submit</button>
                <div class="bottom-text">
                    Have any issues? <router-link>Help Center</router-link>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import TextArea from "../components/TextArea.vue";
import { createComponent } from "vue-function-api";

export default createComponent({
    components: {
        TextArea
    }
});
</script>

<style lang="postcss" scoped>
.sign-message {
    background-color: var(--color-white);
    max-width: 1060.33px; /* remove */
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

.paragraph {
    color: var(--color-china-blue);
    margin-block-end: 40px;
    padding-inline: 8px;
}

.text-area-label {
    color: var(--color-washed-black);
    font-size: 16px;
    font-weight: 600;
    margin-block-end: 15px;
    padding-inline: 8px;
}

.text-area {
    color: var(--color-washed-black);
    margin-block-end: 30px;
}

.bottom-content-container {
    display: flex;
    justify-content: center;
    margin-block-start: 60px;
}

.submit-button {
    display: block;
}

.bottom-text {
    align-self: flex-end;
}
</style>
