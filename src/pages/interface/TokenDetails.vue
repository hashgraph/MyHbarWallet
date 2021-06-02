<template>
  <Headline :title="$t('InterfaceTokenDetails.header')" parent="tokens" />

  <div>
    <TokenTile
      :img="token"
      token="Token"
      blurb="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla eget venenatis dui. Vivamus gravida ex eget erat ornare consequat."
      :associated="false"
      class="mt-8"
    />
  </div>

  <div class="py-8">
    <div class="font-semibold text-lg text-black-out dark:text-white">
      {{ $t("InterfaceTokenDetails.subheader") }}
    </div>

    <div class="mt-8">
      <div
        class="
          pb-2
          text-sm
          font-medium
          border-cerebral-grey border-b
          dark:border-midnight-express
          lg:px-8
        "
      >
        <div class="grid grid-cols-5 text-carbon dark:text-white">
          <div>{{ $t("InterfaceTokenDetails.rank") }}</div>

          <div class="col-span-2">
            {{ $t("InterfaceTokenDetails.address") }}
          </div>

          <div class="col-span-2">
            {{ $t("InterfaceTokenDetails.quantity") }}
          </div>
        </div>
      </div>

      <div
        v-for="i in 5"
        :key="i"
        class="
          pt-4
          pb-2
          border-cerebral-grey border-b
          dark:border-midnight-express
          text-black-out
          dark:text-argent
        "
      >
        <div class="pb-2 grid grid-cols-5 font-medium lg:px-8">
          <div>#{{ i }}</div>

          <div class="col-span-2 text-andrea-blue">0.0.{{ i }}</div>

          <div class="col-span-2">424,446,229</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import token from "../../assets/img_token_gen.svg";
import Headline from "../../components/interface/Headline.vue";
import TokenTile from "../../components/interface/TokenTile.vue";

export default defineComponent({
  name: "TokenDetails",
  components: {
    TokenTile,
    Headline,
  },
  setup() {
    return {
      token,
    };
  },
});
</script>
