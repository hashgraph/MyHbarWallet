<template>
    <div class="faq">
        <div class="head">
            <div class="title">
                <h2>{{ title }}</h2>
                <h5 v-if="subtitle !== ''">
                    {{ subtitle }} <a v-if="more !== ''" :href="more">More</a>
                </h5>
            </div>
            <CustomerSupportLink />
        </div>
        <div class="cards">
            <div v-for="record in records" :key="record.toString()">
                <Accordion
                    :title="record.title"
                    :content="record.content"
                    :link="record.link"
                    class="accordion"
                />
            </div>
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
a {
    color: var(--color-melbourne-cup);
    text-decoration: none;
}

.head {
    align-items: center;
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-between;

    @media (max-width: 1025px) {
        align-items: flex-start;
        flex-direction: column;
    }
}

.title {
    & h2 {
        color: var(--color-black);
        font-size: 30px;
        font-weight: 400;
        margin-block-end: 15px;
    }

    & h5 {
        color: var(--color-china-blue);
        font-size: 14px;
        font-weight: 400;
    }
}

.cards {
    align-content: center;
    border-top: 1px solid var(--color-jupiter);
    display: flex;
    flex-flow: column nowrap;

    @media (max-width: 1025px) {
        margin-block-start: 30px;
    }
}

.accordion {
    border-bottom: 1px solid var(--color-jupiter);
}
</style>
