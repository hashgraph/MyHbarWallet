<template>
    <div class="container">
        <div class="password-title">
            <div class="text">Your Password</div>
            <div class="icon" />
        </div>
        <div class="header">
            <Toggle lefttext="12" righttext="24" :colored="true" />
            <div class="refresh-container">
                <div class="icon" />
                <div class="text">Random</div>
            </div>
        </div>
        <div class="list-container">
            <div class="list-item">
                <span class="number">1.</span><span class="text">sup</span>
            </div>
            <div class="list-item">
                <span class="number">1.</span><span class="text">sup</span>
            </div>
            <div class="list-item">
                <span class="number">1.</span><span class="text">sup</span>
            </div>
            <div class="list-item">
                <span class="number">1.</span><span class="text">sup</span>
            </div>
            <div class="list-item">
                <span class="number">1.</span><span class="text">sup</span>
            </div>
            <div class="list-item">
                <span class="number">1.</span><span class="text">sup</span>
            </div>
            <div class="list-item">
                <span class="number">1.</span><span class="text">sup</span>
            </div>
            <div class="list-item">
                <span class="number">1.</span><span class="text">sup</span>
            </div>
            <div class="list-item">
                <span class="number">1.</span><span class="text">sup</span>
            </div>
            <div class="list-item">
                <span class="number">10.</span><span class="text">sup</span>
            </div>
            <div class="list-item">
                <span class="number">11.</span><span class="text">sup</span>
            </div>
            <div class="list-item">
                <span class="number">12.</span><span class="text">sup</span>
            </div>
        </div>
        <div class="password-input">
            <span class="text">Password</span>
            <div class="optional">
                <div class="text">Optional</div>
                <Toggle />
            </div>
        </div>
        <Button class="phrase-button" label="I Wrote Down My Mnemonic Phrase" />
        <div class="footer">
            <span class="red">DO NOT FORGET</span>
            to save your password. You will need this
        </div>
    </div>
</template>

<script lang="ts">
import Vue from "vue";
import Toggle from "@/components/Toggle.vue";
import Button from "@/components/Button.vue";

export default Vue.extend({
    name: "Mnemonic",
    components: {
        Toggle,
        Button
    }
});
</script>

<style scoped lang="postcss">
.optional {
    align-items: center;
    display: flex;

    & > .text {
        color: var(--color-melbourne-cup);
        margin-inline-end: 10px;
    }
}

.header {
    align-items: center;
    display: flex;
    justify-content: space-between;
    width: 100%;
}

.refresh-container {
    align-items: center;
    display: flex;

    & > .icon {
        background-color: var(--color-melbourne-cup);
        height: 20px;
        margin-inline-end: 5px;
        width: 20px;
    }

    & > .text {
        color: var(--color-melbourne-cup);
        font-size: 15px;
    }
}

.footer {
    color: var(--color-ghostlands-coal);
    font-size: 15px;

    & > .red {
        color: var(--color-lightish-red);
        font-size: 16px;
    }
}

.phrase-button {
    align-items: center;
    display: flex;
    margin-block-end: 20px;
    width: 100%;
}

.password-title {
    display: flex;
    margin-block-end: 40px;

    & > .text {
        align-items: center;
        display: flex;
        font-size: 22px;
        justify-content: center;
        margin-inline-end: 10px;
        text-align: center;
    }

    & > .icon {
        background-color: var(--color-basalt-grey);
        height: 25px;
        width: 25px;
    }
}

.password-input {
    border-bottom: 1px solid var(--color-zhen-zhu-bai-pearl);
    border-top: 1px solid var(--color-zhen-zhu-bai-pearl);
    display: flex;
    justify-content: space-between;
    margin-block-end: 20px;
    padding: 20px 0;
    width: 100%;

    & > .text {
        color: var(--color-ghostlands-coal);
        font-size: 20px;
        font-weight: bold;
    }
}

.container {
    align-items: center;
    background-color: var(--color-white);
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    max-width: 550px;
    padding: 50px;
}

.list-container {
    align-items: center;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-around;
    margin-block-end: 40px;
    max-width: 450px;

    & > .list-item {
        border-bottom: 1px solid var(--color-jupiter);
        color: var(--color-basalt-grey);
        flex-grow: 0;
        flex-shrink: 1;
        font-size: 18px;
        margin-block-end: 15px;
        padding: 15px 0;
        text-align: start;
        width: 29%;

        & > .number {
            margin-inline-end: 10px;
        }

        & > .text {
            color: var(--color-ghostlands-coal);
        }
    }
}
</style>
