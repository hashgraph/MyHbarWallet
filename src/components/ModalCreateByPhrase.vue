<template>
    <div class="modal-create-by-mnemonic-phrase">
        <Modal
            :is-open="isOpen"
            title="Create by Mnemonic Phrase"
            @change="this.$listeners.change"
        >
            <template v-slot:banner>
                <Warning title="NOT RECOMMENDED">
                    This is not a recommended way to access your wallet. Due to
                    the sensitivity of the information involved, these options
                    should only be used in offline settings by experienced
                    users.
                </Warning>
            </template>
            <!-- todo: tooltip where the (I) is -->
            <div class="password-info-header">Your Password (I)</div>
            <div class="value-switch">
                <!-- TODO: Component that wraps this with the understanding of mnemonic types -->
                <SwitchButton
                    :checked="numWords"
                    class="btn"
                    :values="[12, 24]"
                    @change="handleNumWordsChange"
                />
                <div class="text">Value</div>
                <div class="random-button">
                    <MaterialDesignIcon :size="16" :icon="cachedIcon" />
                    Random
                </div>
            </div>

            <MnemonicInput
                class="phrase-input"
                :words="numWords"
                :value="words"
                :editable="false"
            />

            <HiddenPasswordInput
                :value="passwordValue"
                @input="handlePasswordChange"
            />

            <Button class="continue-btn" label="Continue" />

            <div class="support">
                <CustomerSupportLink />
            </div>
        </Modal>
    </div>
</template>

<script lang="ts">
import Vue from "vue";
import Modal from "../components/Modal.vue";
import Warning from "../components/Warning.vue";
import MnemonicInput from "../components/MnemonicInput.vue";
import HiddenPasswordInput from "../components/OptionalPasswordInput.vue";
import CustomerSupportLink from "../components/CustomerSupportLink.vue";
import SwitchButton from "../components/SwitchButton.vue";
import Button from "../components/Button.vue";
import MaterialDesignIcon from "../components/MaterialDesignIcon.vue";
import { mdiCached } from "@mdi/js";

export default Vue.extend({
    components: {
        Modal,
        Warning,
        MnemonicInput,
        HiddenPasswordInput,
        CustomerSupportLink,
        SwitchButton,
        Button,
        MaterialDesignIcon
    },
    model: {
        prop: "isOpen",
        event: "change"
    },
    props: {
        isOpen: { type: Boolean, required: true }
    },
    data() {
        return {
            numWords: 12,
            passwordValue: "",
            words: [] as Array<string>
        };
    },
    computed: {
        cachedIcon() {
            return mdiCached;
        }
    },
    methods: {
        handleNumWordsChange(numWords: number) {
            this.numWords = numWords;
        },
        handlePasswordChange(password: string) {
            this.passwordValue = password;
        }
    }
});
</script>

<style lang="postcss" scoped>
.instruction {
    color: var(--color-china-blue);
    font-size: 14px;
    margin-block-end: 20px;
}

.value-switch {
    align-items: center;
    display: flex;
    margin-block-end: 10px;

    & > .btn {
        margin-inline-end: 10px;
    }

    & > .text {
        color: var(--color-boathouse);
        font-size: 14px;
    }
}

.phrase-input {
    margin-block-end: 40px;
}

.continue-btn {
    margin-block-end: 20px;
    width: 100%;
}

.support {
    align-items: center;
    display: flex;
    font-size: 14px;
    justify-content: space-around;
}

.password-info-header {
    align-items: center;
    display: flex;
    flex-direction: column;
    font-size: 20px;
    font-weight: 500;
    padding-block-end: 40px;
}

.random-button {
    color: var(--color-melbourne-cup);
    cursor: pointer;
    font-size: 14px;

    /* hack: this is basically a "spacer" */
    margin-inline-start: auto;
}
</style>
