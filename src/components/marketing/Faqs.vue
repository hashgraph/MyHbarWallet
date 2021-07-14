<template>
  <div class="px-5 mb-20 md:pt-24 pt-14 md:pb-40">
    <div class="mx-auto">
      <div
<<<<<<< HEAD
        class="mb-8 text-3xl font-semibold text-center  text-carbon dark:text-white"
=======
        class="mb-8 text-3xl font-semibold text-center text-carbon dark:text-white"
>>>>>>> f2c10c4df5318585ac3f75f3b2d0fce33b66cc11
      >
        {{ $t("Marketing.faqs.header") }}
      </div>

      <div
<<<<<<< HEAD
        class="mb-8 text-base font-medium text-center  text-abbadon-black dark:text-white md:mb-12"
=======
        class="mb-8 text-base font-medium text-center text-abbadon-black dark:text-white md:mb-12"
>>>>>>> f2c10c4df5318585ac3f75f3b2d0fce33b66cc11
      >
        {{ $t("Marketing.faqs.paragraph") }}
      </div>

      <div
<<<<<<< HEAD
        class="flex flex-col items-center justify-center  lg:items-start lg:flex-row"
=======
        class="flex flex-col items-center justify-center lg:items-start lg:flex-row"
>>>>>>> f2c10c4df5318585ac3f75f3b2d0fce33b66cc11
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
<<<<<<< HEAD
        </div>
      </div>
    </div>
=======

          <Faq
            :question="$t('Marketing.faqs.section5.header')"
            :answer="$t('Marketing.faqs.section5.paragraph1')"
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
>>>>>>> f2c10c4df5318585ac3f75f3b2d0fce33b66cc11
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

import Image from "../base/Image.vue";
<<<<<<< HEAD
=======
import CustomerSupportButton from "../interface/CustomerSupportButton.vue";
>>>>>>> f2c10c4df5318585ac3f75f3b2d0fce33b66cc11
import faqsLight from "../../assets/img_faqs.svg";
import faqsDark from "../../assets/dark/img_faqs.svg";

import Faq from "./Faq.vue";

export default defineComponent({
  name: "Faqs",
<<<<<<< HEAD
  components: { Image, Faq },
=======
  components: { Image, Faq, CustomerSupportButton },
>>>>>>> f2c10c4df5318585ac3f75f3b2d0fce33b66cc11
  setup() {
    return {
      faqsLight,
      faqsDark,
    };
  },
});
</script>
