<template>
    <Modal
        :is-open="isOpen"
        title="Create with Software"
        @change="this.$listeners.change"
    >
        <template v-slot:banner>
            <Warning />
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
import { createComponent, value, Wrapper } from "vue-function-api";
import Button from "../components/Button.vue";
import RadioButtonGroup from "../components/RadioButtonGroup.vue";
import imagePhrase from "../assets/button-phrase.svg";
import imageFile from "../assets/button-file.svg";
import Modal from "../components/Modal.vue";
import Warning from "../components/Warning.vue";
import CustomerSupportLink from "../components/CustomerSupportLink.vue";

export enum CreateSoftwareOption {
    File = "file",
    Phrase = "phrase"
}

export default createComponent({
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
    setup() {
        const optionSelected: Wrapper<CreateSoftwareOption | null> = value(
            null
        );

        const options = [
            {
                label: "Keystore File",
                value: CreateSoftwareOption.File,
                image: imageFile
            },
            {
                label: "Mnemonic Phrase",
                value: CreateSoftwareOption.Phrase,
                image: imagePhrase
            }
        ];

        return {
            optionSelected,
            options
        };
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
