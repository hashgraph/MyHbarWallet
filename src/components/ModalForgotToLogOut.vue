<template>
    <Modal
        :is-open="isOpen"
        title="Oops"
        hide-decoration
        not-closable
        @change="this.$listeners.change"
    >
        <div class="modal-forgot-to-logout">
            <span>Oops!</span>
            <p>
                Looks like you forgot to log out of your account! For your
                security, either log out, or return to your account.
            </p>
            <div class="button-group">
                <Button
                    class="button-go-back"
                    label="Go back"
                    :outline="true"
                    @click="handleGoBack"
                />
                <Button
                    class="button-logout"
                    label="Log Out of Account"
                    :danger="true"
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
import { createComponent, PropType } from "@vue/composition-api";
import store from "../store";
import { LOG_OUT } from "../store/mutations";
import router from "../router";

interface Props {
    isOpen: boolean;
}

export default createComponent({
    components: {
        Button,
        Modal
    },
    model: {
        prop: "isOpen",
        event: "change"
    },
    props: {
        isOpen: (Boolean as unknown) as PropType<boolean>
    },
    setup() {
        function handleGoBack(): void {
            // have to wait till next tick so modal gives us back the scrollbar
            Vue.nextTick(() => router.push({ name: "interface" }));
        }

        function handleClickLogOut(): void {
            store.commit(LOG_OUT);
        }

        return {
            handleGoBack,
            handleClickLogOut
        };
    }
});
</script>

<style lang="postcss" scoped>
.button-group {
    display: grid;
    grid-column-gap: 15px;
    grid-template-columns: 1fr 1fr;
}

.button-go-back,
.button-logout {
    min-width: initial;
    width: 100%;
}

.modal-forgot-to-logout {
    align-items: stretch;
    display: flex;
    flex-direction: column;
}

span {
    color: var(--color-washed-black);
    font-size: 35px;
    font-weight: 700;
    margin-block-end: 15px;
    text-align: center;
}

p {
    color: var(--color-china-blue);
    font-size: 14px;
    margin: 0;
    padding-block-end: 30px;
    text-align: center;
}
</style>
