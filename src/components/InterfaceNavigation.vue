<template>
    <nav>
        <InterfaceNavigationSection
            :image="sendImage"
            :image-active="sendImageActive"
            title="Send"
            :routes="sendRoutes"
        />

        <InterfaceNavigationSection
            :image="contractImage"
            :image-active="contractImageActive"
            title="Contract"
            :routes="contractRoutes"
        />

        <InterfaceNavigationSection
            :image="messageImage"
            :image-active="messageImageActive"
            title="Message"
            :routes="messageRoutes"
        />
    </nav>
</template>

<script lang="ts">
import Vue from "vue";
import InterfaceNavigationSection from "./InterfaceNavigationSection.vue";
import sendImage from "../assets/send.svg";
import sendImageActive from "../assets/send-active.svg";
import contractImage from "../assets/contract.svg";
import contractImageActive from "../assets/contract-active.svg";
import messageImage from "../assets/message.svg";
import messageImageActive from "../assets/message-active.svg";

export default Vue.extend({
    components: {
        InterfaceNavigationSection
    },
    computed: {
        sendRoutes() {
            return [{ name: "send-transfer", label: "Send Transfer" }];
        },

        sendImage() {
            return sendImage;
        },

        sendImageActive() {
            return sendImageActive;
        },

        contractRoutes() {
            return [
                { name: "deploy-contract", label: "Deploy Contract" },
                {
                    name: "interact-with-contract",
                    label: "Interact with Contract"
                }
            ];
        },

        contractImage() {
            return contractImage;
        },

        contractImageActive() {
            return contractImageActive;
        },

        messageRoutes() {
            return [
                { name: "sign-message", label: "Sign Message" },
                { name: "verify-message", label: "Verify Message" }
            ];
        },

        messageImage() {
            return messageImage;
        },

        messageImageActive() {
            return messageImageActive;
        }
    }
});
</script>

<style lang="postcss" scoped>
nav {
    background: var(--color-white);
    display: flex;
    flex-direction: column;
    flex-shrink: 0;
    padding: 40px 0;
    width: 270px;
}
</style>
