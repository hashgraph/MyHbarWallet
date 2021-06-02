<template>
  <div
    class="
      pb-8
      bg-gradient-to-b
      from-first-snow
      dark:from-midnight-express
      to-white
      dark:to-black
      overflow-x-hidden
      w-full
    "
  >
    <div
      class="
        flex flex-col-reverse
        md:flex-row
        lg:justify-between
        items-center
        md:items-start
        container
        mx-auto
        px-5
        xl:max-w-screen-xl
      "
    >
      <div
        class="
          lg:pt-36
          md:pt-20
          pt-5
          md:pl-5
          lg:max-w-[425px]
          max-w-[325px]
          md:flex-shrink-0
        "
      >
        <div class="font-semibold text-abbadon-black dark:text-white">
          <div class="text-4xl">{{ $t("Marketing.hero.header1") }}</div>
          <div class="text-5xl mt-3">{{ $t("Marketing.hero.header2") }}</div>
        </div>

        <div class="font-medium my-10 text-carbon dark:text-white">
          {{ $t("Marketing.hero.paragraph") }}
        </div>

        <router-link :to="{ name: 'create' }">
          <Button :to="{ name: 'create' }" class="p-2 w-40" color="green">
            {{ $t("Marketing.hero.button") }}
          </Button>
        </router-link>
      </div>

      <Image
        :dark="heroDark"
        :light="heroLight"
        alt="man at computer"
        class="
          flex-1
          relative
          lg:top-[-141px]
          md:top-[-90px]
          md:mt-0
          mt-[-70px]
          max-w-[371px]
          md:max-w-[580px]
          lg:max-w-[741px]
        "
      />
    </div>
  </div>
  <About id="about" />
  <Features class="px-5" />
  <Faqs id="faqs" />
</template>

<script lang="ts">
import { defineComponent } from "vue";

import heroLight from "../assets/img_hero.svg";
import heroDark from "../assets/dark/img_hero.svg";

import Button from "../components/base/Button.vue";
import Image from "../components/base/Image.vue";
import About from "../components/marketing/About.vue";
import Features from "../components/marketing/Features.vue";
import Faqs from "../components/marketing/Faqs.vue";

export default defineComponent({
  components: {
    About,
    Features,
    Faqs,
    Image,
    Button,
  },
  setup() {
    return {
      heroLight,
      heroDark,
    };
  },
});
</script>
