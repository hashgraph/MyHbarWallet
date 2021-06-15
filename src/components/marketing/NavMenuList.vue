<template>
  <div class="flex flex-wrap">
    <router-link
      v-t="'MarketingHeader.home'"
      class="
        hidden
        xl:block
        rounded-full
        font-medium
        text-squant
        dark:text-white
        hover:text-opacity-60
        outline-none
        focus-visible:ring-2 focus-visible:ring-cerebral-grey
        mx-0.5
        px-3
        py-1.5
        transition-colors
      "
      to="/"
    />

    <router-link
      v-t="'MarketingHeader.about'"
      class="
        hidden
        xl:block
        rounded-full
        font-medium
        text-squant
        dark:text-white
        hover:text-opacity-60
        outline-none
        focus-visible:ring-2 focus-visible:ring-cerebral-grey
        mx-0.5
        px-3
        py-1.5
        transition-colors
      "
      to="/#about"
    />

    <router-link
      v-t="'MarketingHeader.faqs'"
      class="
        hidden
        xl:block
        rounded-full
        font-medium
        text-squant
        dark:text-white
        hover:text-opacity-60
        outline-none
        focus-visible:ring-2 focus-visible:ring-cerebral-grey
        mx-0.5
        px-3
        py-1.5
        transition-colors
      "
      to="/#faqs"
    />

    <router-link
      v-t="'MarketingHeader.accessWallet'"
      data-cy-access-link
      to="/access"
      class="
        text-mountain-meadow
        font-semibold
        rounded-full
        ml-1
        mr-4
        hover:text-opacity-60
        outline-none
        focus-visible:ring-2 focus-visible:ring-mountain-meadow
        px-3
        py-1.5
        transition-colors
      "
    />

    <router-link
      v-t="'MarketingHeader.createWallet'"
      data-cy-create-link
      to="/create"
      class="
        bg-mountain-meadow
        text-white
        font-semibold
        ml-0.5
        px-5
        py-2
        rounded-full
        hover:bg-opacity-90
        outline-none
        focus-visible:ring-2
        focus-visible:ring-mountain-meadow
        focus-visible:ring-offset-2
        transition-colors
      "
    />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "NavMenuList",
});
</script>
