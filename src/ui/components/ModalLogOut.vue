<template>
    <Modal
        :is-open="isOpen"
        hide-decoration
        :not-closable="forgot"
        @change="this.$listeners.change"
    >
        <div class="modal-forgot-to-logout">
            <span v-if="forgot">{{ $t("modalForgotToLogout.oops") }}</span>
            <span v-else>{{ $t("modalForgotToLogout.logOut") }}</span>
            <p v-if="forgot">
                {{ $t("modalForgotToLogout.looksLikeYouForgotToLogOut") }}
            </p>
            <p v-else>
                {{ $t("modalForgotToLogout.areYouSure") }}
            </p>
            <div class="button-group">
                <Button
                    v-if="forgot"
                    class="button-go-back"
                    :label="$t('common.goBack')"
                    :outline="true"
                    @click="handleGoBack"
                />
                <Button
                    class="button-logout"
                    :label="$t('modalForgotToLogout.logOut')"
                    :class="logoutBtnCenter"
                    :danger="true"
                    @click="handleClickLogOut"
                />
            </div>
        </div>
    </Modal>
</template>

<script lang="ts">
import Vue from "vue";
import { computed, defineComponent, SetupContext } from "@vue/composition-api";
import { mdiClose } from "@mdi/js";

import { mutations, actions } from "../store";

import Button from "./Button.vue";
import Modal from "./Modal.vue";
import MaterialDesignIcon from "./MaterialDesignIcon.vue";

interface Props {
    isOpen: boolean;
    forgot: boolean;
}

// Yes it is used
// eslint-disable-next-line @typescript-eslint/no-unused-vars
function handleGoBack(): void {
    // have to wait till next tick so modal gives us back the scrollbar
    Vue.nextTick(() => mutations.NAVIGATE_TO_INTERFACE());
}

export default defineComponent({
    components: {
        Button,
        Modal,
        MaterialDesignIcon
    },
    model: {
        prop: "isOpen",
        event: "change"
    },
    props: {
        isOpen: Boolean,
        forgot: Boolean
    },
    setup(props: Props, context: SetupContext) {
        function handleClickLogOut(): void {
            actions.logOut();
            if (!props.forgot) {
                Vue.nextTick(() => mutations.NAVIGATE_HOME());
                context.emit("change", !props.isOpen);
            }
        }

        function handleClose(): void {
            context.emit("change", false);
        }

        const logoutBtnCenter = computed(() => {
            if (!props.forgot) return "center-button";
            return "";
        });

        return {
            handleGoBack,
            handleClickLogOut,
            logoutBtnCenter,
            mdiClose,
            handleClose
        };
    }
});
</script>

<style lang="postcss" scoped>
.button-group {
    display: flex;
    justify-content: space-between;
    justify-self: center;

    @media (max-width: 600px) {
        align-items: center;
        flex-direction: column-reverse;
    }
}

.button-go-back,
.button-logout {
    min-width: initial;
    width: 48.2%;

    @media (max-width: 600px) {
        &:last-child {
            margin-block-end: 15px;
        }
    }
}

.modal-forgot-to-logout {
    display: flex;
    flex-direction: column;
    justify-content: center;

    @media (max-width: 600px) {
        margin-block-start: 50%;
    }
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

.center-button {
    margin-inline: auto;
    width: 85%;
}
</style>
