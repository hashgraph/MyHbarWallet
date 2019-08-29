<template>
    <Modal :is-open="isOpen" hide-decoration>
        <div class="success-creating-keypair">
            <MaterialDesignIcon
                :icon="mdiCheck"
                class="large-checkbox"
                :size="200"
            />
            <PageTitle title="Success">
                You have generated your key pair successfully.
            </PageTitle>
            <router-link :to="{ name: 'interface' }">
                <Button label="Continue" />
            </router-link>
        </div>
    </Modal>
</template>

<script lang="ts">
import { createComponent } from "@vue/composition-api";
import Modal from "../components/Modal.vue";
import Button from "../components/Button.vue";
import PageTitle from "../components/PageTitle.vue";
import { mdiCheck } from "@mdi/js";
import MaterialDesignIcon from "../components/MaterialDesignIcon.vue";

export default createComponent({
    components: {
        Modal,
        MaterialDesignIcon,
        Button,
        PageTitle
    },
    model: {
        prop: "isOpen",
        event: "change"
    },
    props: {
        isOpen: { type: Boolean }
    },
    setup() {
        return {
            mdiCheck
        };
    }
});
</script>

<style lang="postcss" scoped>
.success-creating-keypair {
    align-items: center;
    display: flex;
    flex-direction: column;
}

.description {
    margin-block-end: 40px;
}

.large-checkbox {
    border-color: var(--color-melbourne-cup);
    border-radius: 1200px;
    border-style: solid;
    color: var(--color-melbourne-cup);
    margin-block-end: 15px;
    padding: 25px;
}
</style>
