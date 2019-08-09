<template>
    <div class="interface-form">
        <InterfaceFormTitle :title="title" />
        <div class="interface-form-container"><slot></slot></div>
    </div>
</template>

<script lang="ts">
import Vue from "vue";
import InterfaceFormTitle from "../components/InterfaceFormTitle.vue";

export default Vue.extend({
    components: {
        InterfaceFormTitle
    },

    props: {
        title: { type: String, required: true }
    }
});
</script>

<style lang="postcss" scoped>
.interface-form {
    background-color: white;
    border-radius: 5px;
}

.interface-form-container {
    padding: 40px;
}
</style>
