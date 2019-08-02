<template>
    <div class="mnemonic-phrase">
        <Modal title="Access by Mnemonic Phrase" :is-open="true">
            <template v-slot:banner>
                <Warning title="NOT RECOMMENDED">
                    <div class="warning-description">
                        This is not a recommended way to access your wallet. Due
                        to the sensitivity of the information involved, these
                        options should only be used in offline settings by
                        experienced users.
                    </div>
                </Warning>
            </template>
            <template v-slot:content>
                <div class="instruction">
                    Please type in your mnemonic phrase
                </div>
                <div class="value-switch">
                    <SwitchButton
                        v-model="phrases"
                        class="btn"
                        :values="[12, 24]"
                    />
                    <div class="text">Value</div>
                </div>
                <MnemonicInput
                    v-model="values"
                    class="phrase-input"
                    :words="phrases"
                    :editable="true"
                />
                <div class="password-container">
                    <div class="header">
                        <div class="text">
                            Password
                        </div>
                        <div class="password-switch">
                            <div class="text">
                                Optional
                            </div>
                            <SwitchButton v-model="showPassword" class="btn" />
                        </div>
                    </div>
                    <div class="optional-container">
                        <TextInput
                            v-model="password"
                            class="password-input"
                            placeholder="Please Enter Password"
                            :class="{ 'is-open': showPassword }"
                            obscure
                            compact
                        />
                    </div>
                </div>
                <Button class="continue-btn" label="Continue" />
                <CustomerSupportLink class="support " />
            </template>
        </Modal>
    </div>
</template>

<script lang="ts">
import Vue from "vue";
import Modal from "../components/Modal.vue";
import SwitchButton from "../components/SwitchButton.vue";
import MnemonicInput from "../components/MnemonicInput.vue";
import Button from "../components/Button.vue";
import CustomerSupportLink from "../components/CustomerSupportLink.vue";
import Warning from "../components/Warning.vue";
import TextInput from "../components/TextInput.vue";

export default Vue.extend({
    name: "MnemonicPhrase",
    components: {
        Modal,
        MnemonicInput,
        SwitchButton,
        Button,
        CustomerSupportLink,
        Warning,
        TextInput
    },
    data() {
        return {
            phrases: 12,
            values: [],
            showPassword: false,
            password: ""
        };
    }
});
</script>

<style scoped lang="postcss">
/* .instruction { */

/*    color: var(--color-china-blue); */

/*    font-size: 14px; */

/*    margin-block-end: 20px; */

/* } */

/* .value-switch { */

/*    align-items: center; */

/*    display: flex; */

/*    & > .btn { */

/*        margin-inline-end: 10px; */

/*    } */

/*    & > .text { */

/*        color: var(--color-boathouse); */

/*        font-size: 14px; */

/*    } */

/* } */

/* .phrase-input { */

/*    margin-block-end: 40px; */

/* } */

/* @media screen and (prefers-reduced-motion: reduce) { */

/*    .password-container { */

/*        border-bottom: 2px solid var(--color-peral); */

/*        border-top: 2px solid var(--color-peral); */

/*        margin-block-end: 20px; */

/*        padding: 20px 0; */

/*        transition: none; */

/*    } */

/* } */

/* .password-container { */

/*    border-bottom: 2px solid var(--color-peral); */

/*    border-top: 2px solid var(--color-peral); */

/*    margin-block-end: 20px; */

/*    padding: 20px 0; */

/*    transition: all 0.3s ease; */

/* } */

/* @media screen and (prefers-reduced-motion: reduce) { */

/*    .optional-container { */

/*        transition: none; */

/*    } */

/* } */

/* .optional-container { */

/*    transition: all 0.3s ease; */

/* } */

/* .password-container > .header { */

/*    display: flex; */

/*    flex-grow: 0; */

/*    justify-content: space-between; */

/*    width: 100%; */

/*    & > .text { */

/*        color: var(--color-washed-black); */

/*        font-size: 16px; */

/*        font-weight: 600; */

/*    } */

/* } */

/* .password-switch { */

/*    align-items: center; */

/*    align-self: flex-end; */

/*    display: flex; */

/*    flex-grow: 1; */

/*    flex-grow: 0; */

/*    & > .text { */

/*        color: var(--color-melbourne-cup); */

/*        font-size: 16px; */

/*        margin-inline-end: 10px; */

/*    } */

/* } */

/* .continue-btn { */

/*    margin-block-end: 20px; */

/*    width: 100%; */

/* } */

/* .support { */

/*    font-size: 14px; */

/* } */

/* .warning-description { */

/*    color: var(--color-china-blue); */

/*    font-size: 14px; */

/* } */

/* @media screen and (prefers-reduced-motion: reduce) { */

/*    .password-input { */

/*        padding: 10px 10px 0 10px; */

/*        pointer-events: all; */

/*        transition: none; */

/*        visibility: collapse; */

/*        &.is-open { */

/*            visibility: visible; */

/*        } */

/*    } */

/* } */

/* .password-input { */

/*    padding: 10px 10px 0 10px; */

/*    pointer-events: all; */

/*    transition: visibility 0.3s ease; */

/*    visibility: collapse; */

/*    &.is-open { */

/*        visibility: visible; */

/*    } */

/* } */
</style>
