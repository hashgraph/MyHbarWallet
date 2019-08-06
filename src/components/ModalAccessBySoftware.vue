<template>
    <Modal
        :is-open="isOpen"
        title="Access by Software"
        @change="this.$listeners.change"
    >
        <template v-slot:banner>
            <Warning title="NOT RECOMMENDED">
                This is not a recommended way to access your wallet. Due to the
                sensitivity of the information involved, these options should
                only be used in offline settings by experienced users.
            </Warning>
        </template>
        <template>
            <div class="modal-access-by-software">
                <RadioButtonGroup
                    v-model="optionSelected"
                    name="software-access-option"
                    :options="options"
                />
                <div class="hardware-link">
                    <div>
                        Purchase a hardware wallet for the highest security when
                        accessing your crypto.
                    </div>
                    <router-link :to="{ name: 'hardware-wallet-affiliates' }">
                        Purchase a hardware wallet....
                    </router-link>
                </div>
                <Button
                    :disabled="optionSelected == null"
                    label="Continue"
                    @click="$emit('submit', optionSelected)"
                />
                <CustomerSupportLink class="support-link" />
            </div>
        </template>
    </Modal>
</template>

<script lang="ts">
import Vue from "vue";
import Button from "../components/Button.vue";
import RadioButtonGroup from "../components/RadioButtonGroup.vue";
import imageKey from "../assets/button-key.svg";
import imagePhrase from "../assets/button-phrase.svg";
import imageFile from "../assets/button-file.svg";
import Modal from "../components/Modal.vue";
import Warning from "../components/Warning.vue";
import CustomerSupportLink from "../components/CustomerSupportLink.vue";

export enum AccessSoftwareOption {
    File = "file",
    Phrase = "phrase",
    Key = "key"
}

export default Vue.extend({
    components: {
        RadioButtonGroup,
        Button,
        Modal,
        CustomerSupportLink,
        Warning
    },
    model: {
        prop: "isOpen",
        event: "change"
    },
    props: {
        isOpen: { type: Boolean }
    },
    data() {
        return {
            optionSelected: null
        };
    },
    computed: {
        options() {
            return [
                {
                    label: "Keystore File",
                    value: AccessSoftwareOption.File,
                    image: imageFile
                },
                {
                    label: "Mnemonic Phrase",
                    value: AccessSoftwareOption.Phrase,
                    image: imagePhrase
                },
                {
                    label: "Private Key",
                    value: AccessSoftwareOption.Key,
                    image: imageKey
                }
            ];
        }
    }
});
</script>

<style lang="postcss" scoped>
.modal-access-by-software {
    align-items: stretch;
    display: flex;
    flex-direction: column;
}

.hardware-link {
    color: var(--color-china-blue);
    font-size: 14px;
    padding: 20px;
    text-align: center;
}

a {
    color: var(--color-melbourne-cup);
    text-decoration: none;

    &:hover,
    &:focus {
        text-decoration: underline;
    }
}

.support-link {
    margin-block-start: 20px;
}
</style>
