<template>
    <Modal
        :is-open="isOpen"
        title="Oops"
        :no-decoration="true"
        @change="this.$listeners.change"
    >
        <div class="modal-oops-logout">
            <h2>Oops!</h2>
            <p>
                It seems like you forgot to logout of your wallet. For the
                security of your wallet, please log out of your wallet to
                continue. Otherwise, go back to your wallet.
            </p>
            <div class="button-group">
                <Button class="button-go-back" label="Go back" outline="true" />
                <Button
                    class="button-logout"
                    label="Log Out of Wallet"
                    danger="true"
                />
            </div>
        </div>
    </Modal>
</template>

<script lang="ts">
import Vue from "vue";
import Button from "../components/Button.vue";
import Modal from "../components/Modal.vue";

export default Vue.extend({
    components: {
        Button,
        Modal
    },
    model: {
        prop: "isOpen",
        event: "change"
    },
    props: {
        isOpen: { type: Boolean }
    }
});
</script>

<style lang="postcss" scoped>
.button-group {
    display: flex;
    flex-flow: row;
    justify-content: space-around;
    width: 100%;
}

.button-go-back {
    margin-inline: 20px 10px;
}

.button-logout {
    margin-inline: 10px 20px;
}

.modal-oops-logout {
    align-items: stretch;
    display: flex;
    flex-direction: column;
    margin-block-start: -40px;
}

h2 {
    color: var(--color-washed-black);
    font-size: 35px;
    font-weight: 700;
    margin-block-end: 20px;
    text-align: center;
}

p {
    color: var(--color-china-blue);
    font-size: 14px;
    text-align: center;
}
</style>
