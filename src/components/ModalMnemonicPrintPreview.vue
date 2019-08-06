<template>
    <Modal
        :is-open="isOpen"
        :large="true"
        title="Print Preview"
        @change="this.$listeners.change"
    >
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
            <strong>Password + Mnemonic Phrase</strong> to access your wallet.
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
    model: {
        prop: "isOpen",
        event: "change"
    },
    props: {
        isOpen: { type: Boolean },
        words: {
            type: Array,
            default: () => ["", "", "", "", "", "", "", "", "", "", "", ""]
        }
    }
});
</script>

<style scoped lang="postcss">
.logo-contents {
    align-items: center;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    font-size: 16px;
    justify-content: space-between;
}

.logo {
    font-size: 24px;

    & > strong {
        font-weight: 600;
    }

    & > span {
        color: var(--color-melbourne-cup);
        font-size: 14px;
        font-weight: 700;
    }
}

.support-email {
    color: var(--color-basalt-grey);
    margin-inline-start: 5px;

    & > img {
        padding: 0 3px 0 3px;
    }
}

.password-disclaimer {
    color: var(--color-basalt-grey);
    font-size: 14px;
    margin-block-end: 30px;

    & > strong {
        color: red;
        font-weight: 700;
    }

    & > h3 {
        color: black;
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
