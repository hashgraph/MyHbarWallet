<template>
  <div class="px-5 mb-20 md:pt-24 pt-14 md:pb-40 min-w-[400px]">
    <div class="mx-auto">
      <div
        class="mb-8 text-3xl font-semibold text-center text-carbon dark:text-white"
      >
        {{ $t("Marketing.faqs.header") }}
      </div>

      <div
        class="mb-8 text-base font-medium text-center text-abbadon-black dark:text-white md:mb-12"
      >
        {{ $t("Marketing.faqs.paragraph") }}
      </div>

      <div
        class="flex flex-col items-center justify-center lg:items-start lg:flex-row"
      >
        <Image
          class="
                        w-[200px]
                        h-[200px]
                        md:w-[300px]
                        md:h-[300px]
                        lg:mt-16
                        lg:mr-20
                        lg:mb-0
                        mb-8
                        md:mb-12
                    "
          :light="faqsLight"
          :dark="faqsDark"
          alt="questions"
        />

        <div class="max-w-[600px]">
          <Faq
            :question="$t('Marketing.faqs.section1.header')"
            :answer="$t('Marketing.faqs.section1.paragraph1')"
          />

          <Faq
            :question="$t('Marketing.faqs.section2.header')"
            :answer="$t('Marketing.faqs.section2.paragraph1')"
          />

          <Faq
            :question="$t('Marketing.faqs.section3.header')"
            :answer="$t('Marketing.faqs.section3.paragraph1')"
          />

          <Faq
            :question="$t('Marketing.faqs.section4.header')"
            :answer="$t('Marketing.faqs.section4.paragraph1')"
          />

          <FaqWithLink
            :question="$t('Marketing.faqs.section5.header')"
            :first-answer="$t('Marketing.faqs.section5.paragraph1.1')"
            :second-answer="$t('Marketing.faqs.section5.paragraph1.2')"
            :link="faq5Href"
          />

          <FaqWithLink
            :question="$t('Marketing.faqs.section6.header')"
            :first-answer="$t('Marketing.faqs.section6.paragraph1.1')"
            :second-answer="$t('Marketing.faqs.section6.paragraph1.2')"
            :link="faq6Href"
          />
        </div>
      </div>
    </div>
    <div class="mt-4">
      <div
        class="mb-4 text-3xl font-semibold text-center text-carbon dark:text-white"
      >
        {{ $t("Marketing.faqs.needMoreHelp") }}
      </div>
    
      <CustomerSupportButton class="font-semibold text-center text-mountain-meadow" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

import Image from "../base/Image.vue";
import CustomerSupportButton from "../interface/CustomerSupportButton.vue";
import faqsLight from "../../assets/img_faqs.svg";
import faqsDark from "../../assets/dark/img_faqs.svg";

import Faq from "./Faq.vue";
import FaqWithLink from "./FaqWithLink.vue"

export default defineComponent({
  name: "Faqs",
  components: { Image, Faq, FaqWithLink, CustomerSupportButton },
  setup() {
    const faq5Href = 'https://v1.myhbarwallet.com'
    const faq6Href = 'https://launchbadge.com/blog/how-to-create-ledger-account-through-mhw'
    return {
      faqsLight,
      faqsDark,
      faq5Href,
      faq6Href,
    };
  },
});
</script>
