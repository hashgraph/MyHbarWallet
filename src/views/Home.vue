<template>
    <div class="home">
        <Accordion
            :title="faqTitle"
            :subtitle="faqSubtitle"
            :more="faqMore"
            :records="faqs"
        />
    </div>
</template>

<script lang="ts">
import Vue from "vue";
import Accordion from "@/components/FAQ.vue";

export default Vue.extend({
    name: "Home",
    components: {
        Accordion
    },
    data: function() {
        return {
            faqs: [
                {
                    title: "How do I create a new wallet?",
                    content: "Carefully",
                    link: "https://www.google.com"
                },
                {
                    title: "Does MHW work with other wallets?",
                    content: "Yep, sure does",
                    link: ""
                },
                {
                    title: "How do I send a transaction?",
                    content: "Carefully",
                    link: ""
                },
                {
                    title: "I forgot my private key / password! What can I do?",
                    content: "Crai Errytiem",
                    link: ""
                }
            ]
        };
    },
    computed: {
        faqTitle() {
            return "FAQs";
        },
        faqSubtitle() {
            return "Need more information?";
        },
        faqMore() {
            return "https://kb.myhederawallet.com/";
        }
    }
});
</script>

<style lang="postcss" scoped>
.home {
    align-items: center;
    display: flex;
    flex-direction: column;
}
</style>
