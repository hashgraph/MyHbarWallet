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
                    />
                </router-link>
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
import Button from "../components/Button.vue";
import Modal from "../components/Modal.vue";
import { createComponent, PropType } from "vue-function-api";

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
    setup(props: Props, ctx) {
        function handleClickLogOut() {
            // todo: Actually log the user out
            ctx.emit("change", false);
        }

        return {
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
