<template>
    <div class="accordion">
        <div class="head">
            <div class="title">
                <h2 class="title-header">{{ title }}</h2>
                <h5 v-if="subtitle !== ''" class="subtitle-header">
                    {{ subtitle }} <a v-if="more !== ''" :href="more">More</a>
                </h5>
            </div>
            <div class="support">
                <FontAwesomeIcon :icon="iconBell" class="icon" size="lg" />
                <h5>Customer Support [Modal]</h5>
            </div>
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
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { faConciergeBell } from "@fortawesome/free-solid-svg-icons";

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
        AccordionCard,
        FontAwesomeIcon
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
        },
        iconBell() {
            return faConciergeBell;
        }
    }
});
</script>

<style lang="postcss" scoped>
.accordion {
    color: var(--color-china-blue);
}

.head {
    align-items: center;
    border-bottom: 1px solid var(--color-jupiter);
    display: flex;
}

.title {
    flex-grow: 1;
}

.support {
    align-items: center;
    color: var(--color-melbourne-cup);
    display: flex;
    margin: 0 auto;
}

.title-header {
    color: var(--color-black);
    font-size: 30px;
    font-weight: 400;
    margin-block-end: 15px;
}

.subtitle-header {
    font-size: 14px;
    font-weight: 400;
}

.cards {
    border-bottom: 1px solid var(--color-jupiter);
    padding: 30px 10px;
}
</style>
