<template>
    <div class="faq">
        <div>
            <div>
                <h2>{{ title }}</h2>
                <h5 v-if="subtitle !== ''">
                    {{ subtitle }} <a v-if="more !== ''" :href="more">More</a>
                </h5>
            </div>
            <CustomerSupportLink />
        </div>
        <div v-for="record in records" :key="record.toString()" class="cards">
            <Accordion
                :title="record.title"
                :content="record.content"
                :link="record.link"
            />
        </div>
    </div>
</template>

<script lang="ts">
import Vue, { PropOptions } from "vue";
import Accordion from "@/components/Accordion.vue";
import CustomerSupportLink from "@/components/CustomerSupportLink.vue";

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
    name: "FAQ",
    components: {
        Accordion,
        CustomerSupportLink
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
