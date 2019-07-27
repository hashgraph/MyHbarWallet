<template>
    <div class="home">
        <img alt="Vue logo" src="../assets/logo.png" />
        <HelloWorld name="World" />

        <div class="section">
            <Button label="Choose a Hardware" />
            <Button label="Next" :rightIcon="faArrowRight" />
            <Button
                label="Access Wallet"
                @click="handleAccessWallet"
                :isBusy="isAccessWalletBusy"
            />
        </div>

        <div class="section">
            <TextInput obscure placeholder="Enter password" />
        </div>
    </div>
</template>

<script lang="ts">
import Vue from "vue";
import HelloWorld from "@/components/HelloWorld.vue";
import Button from "@/components/Button.vue";
import TextInput from "@/components/TextInput.vue";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";

export default Vue.extend({
    name: "home",
    components: {
        HelloWorld,
        Button,
        TextInput
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

.section {
    margin-top: 25px;
    display: flex;
    flex-direction: column;
    align-items: center;
}

.section > * {
    margin-top: 25px;
}
</style>
