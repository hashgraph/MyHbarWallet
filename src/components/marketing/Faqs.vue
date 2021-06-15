<template>
  <div class="px-5 md:pt-24 pt-14 mb-20 md:pb-40">
    <div class="mx-auto">
      <div
        class="
          text-3xl text-center text-carbon
          dark:text-white
          font-semibold
          mb-8
        "
      >
        {{ $t("Marketing.faqs.header") }}
      </div>

      <div
        class="
          text-center text-abbadon-black
          dark:text-white
          font-medium
          text-base
          mb-8
          md:mb-12
        "
      >
        {{ $t("Marketing.faqs.paragraph") }}
      </div>

      <div
        class="
          flex flex-col
          items-center
          lg:items-start
          justify-center
          lg:flex-row
        "
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
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Faq from "./Faq.vue";
import Image from "../base/Image.vue";
import faqsLight from "../../assets/img_faqs.svg";
import faqsDark from "../../assets/dark/img_faqs.svg";

export default defineComponent({
  name: "Faqs",
  components: { Image, Faq },
  setup() {
    return {
      faqsLight,
      faqsDark,
    };
  },
});
</script>
