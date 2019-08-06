<template>
    <Modal is-open title="Print Preview">
        <template v-slot:content>
            <div class="logo-contents">
                <div class="logo">
                    My<strong>Hedera</strong>Wallet |
                    <span>Mnemonic Phrase</span>
                </div>
                <div class="support-email">
                    <img
                        alt=""
                        class="icon"
                        src="../assets/icon-bell.svg"
                    />support@myhbarwallet.com
                </div>
            </div>
            <div class="password-disclaimer">
                <h3>
                    Please Keep This Sheet in a Very Safe Place. It is your
                    property!
                </h3>
                We <strong>CAN NOT</strong> change your password. Please
                <strong>DO NOT FORGET</strong> to save your password. It is your
                <strong>PRIVATE KEY</strong>. You will need this
                <strong>Password + Mnemonic Phrase</strong> to access your
                wallet.
            </div>

            <MnemonicInput :editable="editable" :words="words" :value="value" />
            <div class="button-container">
                <Button class="button-print" label="Print" />
            </div>
        </template>
    </Modal>
</template>

<script lang="ts">
import Vue from "vue";
import Button from "../components/Button.vue";
import Modal from "./Modal.vue";
import MnemonicInput from "@/components/MnemonicInput.vue";

export default Vue.extend({
    components: {
        Button,
        Modal,
        MnemonicInput
    },
    data() {
        return {
            editable: false,
            words: 12,
            value: []
        };
    }
});
</script>

<style scoped lang="postcss">
.logo-contents {
    display: flex;
    flex-direction: column;
    flex-wrap: nowrap;
}

.logo {
    font-size: 26px;

    & > strong {
        font-weight: 600;
    }

    & > span {
        color: #05c0a5;
        font-size: 14px;
        font-weight: 700;
    }
}

.support-email {
    color: #506175;
    font-size: 16px;
    margin-inline-start: 5px;

    & > img {
        padding: 0 3px 0 3px;
    }
}

.password-disclaimer {
    margin-block-end: 30px;

    & > strong {
        color: red;
        font-weight: 700;
    }

    & > h3 {
        font-size: 16px;
        font-weight: 700;
    }
}

.button-container {
    display: flex;
    flex-direction: column;
    flex-wrap: nowrap;
    margin-block-start: 30px;
}

.button-print {
    align-self: center;
}
</style>
