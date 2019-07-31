<template>
    <div class="accordian">
        <div class="title">
            <h2>{{ title }}</h2>
            <h5>Need additonal information? <a href="https://www.google.com">More</a></h5>
        </div>
        <div class="support">
            <img :src="imageBell" />
            <h5>Customer Support [Modal]</h5>
        </div>
        <div class="cards" v-for="record in records">
            <AccordionCard :title="record.title" :content="record.content" :link="record.link" />
        </div>
    </div>
</template>

<script lang="ts">
import Vue from "vue";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import {} from "@fortawesome/free-brands-svg-icons";
import imageBell from "@/assets/service-bell.svg";
import AccordionCard from "@/components/AccordionCard.vue";

export default Vue.extend({
    name: "Accordion",
    props: {
        title: {required: true, type: String},
        records:
    },
    components: {
        AccordionCard,
        FontAwesomeIcon
    },
    computed: {
        imageBell() {
            return imageBell;
        }
    }
});
</script>

<style lang="postcss" scoped>

</style>
