<template>
    <div class="accordion">
        <div class="title">
            <h2>{{ title }}</h2>
            <h5 v-if="subtitle !== ''">
                {{ subtitle }}<a v-if="more !== ''" :href="more">More</a>
            </h5>
        </div>
        <div class="support">
            <img :src="imageBell" alt="" />
            <h5>Customer Support [Modal]</h5>
        </div>
        <div v-for="record in records" :key="record.toString()" class="cards">
            <AccordionCard
                :title="record.title"
                :content="record.content"
                :link="record.link"
            />
        </div>
    </div>
</template>

<script lang="ts">
import Vue, { PropOptions } from "vue";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import imageBell from "@/assets/service-bell.svg";
import AccordionCard from "@/components/AccordionCard.vue";

interface Record {
    title: string;
    content: string;
    link: string;
}

interface Props {
    title: string;
    subtitle: string;
    more: string;
    records: Record[];
}

export default Vue.extend<{}, {}, {}, Props>({
    name: "Accordion",
    components: {
        AccordionCard
    },
    props: {
        title: { required: true, type: String },
        subtitle: { required: false, type: String, default: "" },
        more: { required: false, type: String, default: "" },
        records: {
            type: Array,
            required: true
        } as PropOptions<Record[]>
    },
    computed: {
        imageBell() {
            return imageBell;
        }
    }
});
</script>

<style lang="postcss" scoped>
.cards {
    padding: 10px;
}
</style>
