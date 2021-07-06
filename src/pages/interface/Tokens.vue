<template>
  <Headline :title="$t('InterfaceToken.header')" />

  <div class="flex mt-6 lg:px-6">
    <TextInput
      v-model="searchVal"
      :show-eye="false"
      class="w-full mr-4 text-lg lg:mr-8"
      :placeholder="$t('BaseTextInput.searchTokens')"
    />

    <Button
      color="green"
      class="px-7 lg:px-10 lg:text-lg"
    >
      {{
        $t("BaseButton.search")
      }}
    </Button>
  </div>

  <div class="flex justify-between mt-10 lg:px-6">
    <div class="font-semibold dark:text-white">
      {{ $t("InterfaceToken.tokensFound", { tokens: "500,000" }) }}
    </div>
    <div class="hidden lg:flex">
      <NavButton :value="$t('InterfaceToken.nav.first')" />

      <NavButton :value="$t('InterfaceToken.nav.left')" />

      <NavButton
        :value="
          $t('InterfaceToken.nav.current', {
            currentPage: '1',
            numOfPages: '20',
          })
        "
      />

      <NavButton :value="$t('InterfaceToken.nav.right')" />

      <NavButton :value="$t('InterfaceToken.nav.last')" />
    </div>
  </div>

  <div class="h-7 lg:h-4" />
  <Tokens />
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";

import NavButton from "../../components/interface/NavButton.vue";
import Headline from "../../components/interface/Headline.vue";
import Tokens from "../../components/interface/Tokens.vue";
import Button from "../../components/base/Button.vue";
import TextInput from "../../components/base/TextInput.vue";

export default defineComponent({
  name: "Tokens",
  components: {
    Headline,
    Button,
    TextInput,
    Tokens,
    NavButton,
  },
  setup() {
    const searchVal = ref("");

    return {
      searchVal,
    };
  },
});
</script>
