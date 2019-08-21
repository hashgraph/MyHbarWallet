<template>
    <div class="modal-create-by-mnemonic-phrase">
        <Modal
            :is-open="state.modalIsOpen"
            not-closable
            title="By Keystore File"
            @change="handleModalChangeIsOpen"
        >
            <div class="modal-save-my-keystore-cards">
                <span class="modal-body-title">Save My Keystore File</span>

                <div class="modal-card">
                    <img alt="" class="card-image" :src="noLoseIcon" />
                    <div class="card-body-wrapper">
                        <span class="card-header">Don't Lose It</span>
                        <p class="card-body">
                            Be careful, it can not be recovered if you lose it.
                        </p>
                    </div>
                </div>

                <div class="modal-card">
                    <img alt="" class="card-image" :src="noShareIcon" />
                    <div class="card-body-wrapper">
                        <span class="card-header">Don't Share It</span>
                        <p class="card-body">
                            Your funds will be stolen if you use this file on a
                            malicious phishing site.
                        </p>
                    </div>
                </div>

                <div class="modal-card">
                    <img alt="" class="card-image" :src="makeBackupIcon" />
                    <div class="card-body-wrapper">
                        <span class="card-header">Make a Backup</span>
                        <p class="card-body">
                            Secure it like the millions of dollars it may one
                            day be worth.
                        </p>
                    </div>
                </div>
            </div>

            <div class="button-container">
                <Button
                    label="Download Keystore File"
                    :busy="state.isBusy"
                    class="download-button"
                    @click="$emit('submit')"
                />
            </div>
        </Modal>
    </div>
</template>

<script lang="ts">
import Vue from "vue";
import Modal from "../components/Modal.vue";
import Button from "../components/Button.vue";
import noLoseIcon from "../assets/icon-no-lose.svg";
import noShareIcon from "../assets/icon-no-share.svg";
import makeBackupIcon from "../assets/icon-make-backup.svg";

export interface State {
    modalIsOpen: boolean;
    isBusy: boolean;
}

export default Vue.extend({
    components: {
        Modal,
        Button
    },
    model: {
        prop: "state",
        event: "change"
    },
    props: {
        state: { type: Object, required: true }
    },
    computed: {
        noLoseIcon() {
            return noLoseIcon;
        },
        noShareIcon() {
            return noShareIcon;
        },
        makeBackupIcon() {
            return makeBackupIcon;
        }
    },
    methods: {
        handleModalChangeIsOpen(isOpen: boolean) {
            this.$emit("change", { ...this.state, modalIsOpen: isOpen });
        }
    }
});
</script>

<style lang="postcss" scoped>
.modal-save-my-keystore-cards {
    display: flex;
    flex-flow: column nowrap;
    margin-block-end: 40px;
}

.modal-body-title {
    color: var(--color-washed-black);
    font-size: 20px;
    font-weight: 500;
    margin-block-end: 40px;
    margin-inline: auto;
}

.modal-card {
    align-items: center;
    background-color: var(--color-peral);
    border-radius: 4px;
    display: flex;
    flex-flow: row nowrap;
    margin-block-end: 7px;
    padding: 10px 20px;
}

.card-image {
    height: 80px;
    margin: 0 auto;
    margin-inline-end: 20px;
}

.card-body-wrapper {
    display: flex;
    flex-flow: column;
    text-align: start;
}

.card-header {
    font-family: Montserrat, sans-serif;
    font-size: 16px;
    font-weight: 500;
    margin-block-end: 5px;
}

.card-body {
    color: var(--color-china-blue);
    font-family: Montserrat, sans-serif;
    font-size: 14px;
    margin: 0;
    padding: 0;
}

.button-container {
    display: flex;
    flex-flow: row nowrap;
}

.download-button {
    margin: 0 auto;
}
</style>
