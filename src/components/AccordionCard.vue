<template>
    <div class="accordion-card">
        <div class="title">
            <h3>{{ title }}</h3>
            <div class="expand">x</div>
        </div>
        <div class="content">
            <p>{{ content }}</p>
            <p v-if="link !== null && !link.isEmpty()">
                For more information, click <a :href="link">here</a>.
            </p>
        </div>
    </div>
</template>

<script lang="ts">
import Vue from "vue";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { faPlus, faMinus } from "@fortawesome/free-solid-svg-icons";

export default Vue.extend({
    name: "Footer",
    components: {
        FontAwesomeIcon
    },
    props: {
        title: { required: true, type: String },
        content: { required: true, type: String },
        link: { required: false, type: String }
    },
    computed: {}
});
</script>

<style lang="postcss" scoped></style>
