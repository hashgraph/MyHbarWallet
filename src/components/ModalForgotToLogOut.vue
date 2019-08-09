<template>
    <Modal
        :is-open="isOpen"
        title="Oops"
        :hide-decoration="true"
        :not-closable="true"
    >
        <div class="modal-forgot-to-logout">
            <span>Oops!</span>
            <p>
                It seems like you forgot to logout of your account. For the
                security of your account, please log to continue. Otherwise, go
                back to your account.
            </p>
            <div class="button-group">
                <router-link to="/interface">
                    <Button
                        class="button-go-back"
                        label="Go back"
                        :outline="true"
                        :medium="true"
                    />
                </router-link>
                <Button
                    class="button-logout"
                    label="Log Out of Account"
                    :danger="true"
                    :medium="true"
                    @click="handleClickLogOut"
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
        prop: "isOpen"
    },
    props: {
        isOpen: { type: Boolean }
    },
    methods: {
        handleClickLogOut() {
            // todo: Actually log the user out
            this.isOpen = false;
        }
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

.modal-forgot-to-logout {
    align-items: stretch;
    display: flex;
    flex-direction: column;
    margin-block-start: -20px;
}

span {
    color: var(--color-washed-black);
    font-size: 35px;
    font-weight: 700;
    margin-block-end: 20px;
    text-align: center;
}

p {
    color: var(--color-china-blue);
    font-size: 14px;
    padding-block-end: 30px;
    text-align: center;
}
</style>
