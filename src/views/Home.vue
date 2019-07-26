<template>
    <div class="home">
        <img alt="Vue logo" src="../assets/logo.png" />
        <HelloWorld name="World" />

        <div class="buttons">
            <SubmitButton label="Choose a Hardware" />
            <SubmitButton label="Next" :rightIcon="faArrowRight" />
            <SubmitButton
                label="Access Wallet"
                @click="handleAccessWallet"
                :isBusy="isAccessWalletBusy"
            />
        </div>
    </div>
</template>

<script lang="ts">
import Vue from "vue";
import HelloWorld from "@/components/HelloWorld.vue";
import SubmitButton from "@/components/Button.vue";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";

export default Vue.extend({
    name: "home",
    components: {
        HelloWorld,
        SubmitButton
    },
    data() {
        return {
            isAccessWalletBusy: false
        };
    },
    computed: {
        faArrowRight() {
            return faArrowRight;
        }
    },
    methods: {
        handleAccessWallet() {
            this.isAccessWalletBusy = true;

            setTimeout(() => {
                this.isAccessWalletBusy = false;
            }, 1500);
        }
    }
});
</script>

<style lang="postcss">
.home {
    display: flex;
    flex-direction: column;
    align-items: center;
}

.buttons > * {
    margin-top: 25px;
    display: flex;
    flex-direction: column;
    align-items: center;
}
</style>
