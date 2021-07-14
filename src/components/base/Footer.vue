<template>
  <footer
    class="px-4 py-8 text-sm font-semibold bg-husky dark:bg-midnight-express md:px-0 lg:py-24 text-andrea-blue"
  >
    <div class="flex flex-col h-32 mx-auto max-w-screen-2xl content-evenly lg:h-0 lg:justify-around lg:flex-row md:px-16">
      <div class="m-auto mb-6 text-center sm:mb-0">
        <router-link
          v-t="'SiteFooter.privacy'"
          data-cy-link-privacy
          :to="{ name: 'privacy' }"
          class="hover:opacity-50 hover:no-underline"
        />

        <span class="mx-2">{{ "•" }}</span>

        <router-link
          v-t="'SiteFooter.terms'"
          data-cy-link-terms
          :to="{ name: 'terms' }"
          class="hover:opacity-50 hover:no-underline"
        />

        <span class="mx-2">{{ "•" }}</span>

        <a
          class=" hover:opacity-50 hover:no-underline whitespace-nowrap"
          href="https://github.com/hashgraph/MyHbarWallet"
          rel="noopener"
          target="_blank"
        >
          v{{ appVersion }}+{{ appLastCommitShortHash }}
        </a>
      </div>

      <div
        class="flex justify-around w-40 m-auto mb-6 sm:mb-0 lg:order-2"
      >
        <div>
          <a
            href="https://twitter.com/myhbarwallet"
            rel="noopener"
            target="_blank"
          >
            <img
              class="hover:opacity-50"
              src="../../assets/icon_twitter.svg"
            >
          </a>
        </div>

        <div>
          <a
            href="https://github.com/hashgraph/MyHbarWallet"
            rel="noopener"
            target="_blank"
          >
            <img
              class="hover:opacity-50"
              src="../../assets/icon_github.svg"
            >
          </a>
        </div>

        <div>
          <a
            href="https://medium.com/myhbarwallet"
            rel="noopener"
            target="_blank"
          >
            <img
              class="hover:opacity-50"
              src="../../assets/icon_medium.svg"
            >
          </a>
        </div>
      </div>

      <div
        class="m-auto text-sm font-medium text-center text-carbon dark:text-white"
      >
        {{ $t("SiteFooter.copyright") }}
      </div>
    </div>
  </footer>
</template>

<script lang="ts">
import { defineComponent } from "vue";

// from vite.config.js
declare const __APP_VERSION__: string;
declare const __APP_LAST_COMMIT_SHORT_HASH__: string;

export default defineComponent({
  name: "Footer",
  setup() {
    return {
      appVersion: __APP_VERSION__,
      appLastCommitShortHash: __APP_LAST_COMMIT_SHORT_HASH__,
    };
  },
});
</script>
