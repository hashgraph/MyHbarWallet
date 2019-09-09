<template>
    <div id="faqs" class="faqs">
        <div class="wrap">
            <div class="page-container">
                <div class="head">
                    <div class="title">
                        <div class="title-text">{{ $t("common.faqs") }}</div>
                        <div class="subtitle-text">
                            {{ $t("faqs.answersToMostFAQs") }}
                        </div>
                    </div>
                    <CustomerSupportLink class="customer-support-link" />
                </div>
                <div class="cards">
                    <Accordion>
                        <template v-slot:title>
                            {{ $t("faqs.howDoICreateANewAccountQuestion") }}
                        </template>
                        <template v-slot:content>
                            {{ $t("faqs.howDoICreateANewAccountAnswer") }}
                        </template>
                    </Accordion>
                    <Accordion>
                        <template v-slot:title>
                            {{ $t("faqs.canMHWWorkWithOtherWalletsQuestion") }}
                        </template>
                        <template v-slot:content>
                            {{ $t("faqs.canMHWWorkWithOtherWalletsAnswer") }}
                        </template>
                    </Accordion>
                    <Accordion>
                        <template v-slot:title>
                            {{ $t("faqs.howCanISendATransactionQuestion") }}
                        </template>
                        <template v-slot:content>
                            {{ $t("faqs.howCanISendATransactionAnswer") }}
                        </template>
                    </Accordion>
                    <Accordion>
                        <template v-slot:title>
                            {{
                                $t(
                                    "faqs.iForgotMyPassphrase/PrivateKeyWhatCanIDoQuestion"
                                )
                            }}
                        </template>
                        <template v-slot:content>
                            {{
                                $t(
                                    "faqs.iForgotMyPassphrase/PrivateKeyWhatCanIDoAnswer"
                                )
                            }}
                        </template>
                    </Accordion>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { createComponent } from "@vue/composition-api";
import Accordion from "../components/Accordion.vue";
import CustomerSupportLink from "../components/CustomerSupportLink.vue";

export default createComponent({
    components: {
        Accordion,
        CustomerSupportLink
    }
});
</script>

<style lang="postcss" scoped>
a {
    color: var(--color-melbourne-cup);
    text-decoration: none;
}

.faqs {
    background-color: var(--color-white);
}

.wrap {
    padding: 80px 0;

    @media (max-width: 1024px) {
        padding: 50px 0;
    }
}

.page-container {
    align-self: center;
    margin: 0 auto;
    max-width: 1024px;
    padding: 0 20px;

    @media (max-width: 1024px) {
        padding: 0 25px;
    }
}

.head {
    align-items: center;
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-between;

    @media (max-width: 1024px) {
        align-items: flex-start;
        flex-direction: column;
    }
}

.title {
    margin-block-end: 30px;
}

.title-text {
    color: var(--color-black);
    font-size: 30px;
    font-weight: 500;
    margin-block-end: 15px;
}

.subtitle-text {
    color: var(--color-china-blue);
    font-size: 14px;
    font-weight: 400;
}

.cards {
    align-content: center;
    border-top: 1px solid var(--color-jupiter);
    display: flex;
    flex-flow: column nowrap;

    @media (max-width: 1024px) {
        margin-block-start: 30px;
    }
}

.customer-support-link {
    align-self: initial;
}
</style>
