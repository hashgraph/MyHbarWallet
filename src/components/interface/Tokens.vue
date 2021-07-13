<template>
  <Token
    class="border-t border-jupiter dark:border-midnight-express dark:text-argent"
    :img="hedera"
    token="HBAR"
    blurb="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla eget venenatis dui. Vivamus gravida ex eget erat ornare consequat."
    :associated="false"
  />
  
  <Token
    class="border-t border-jupiter dark:border-midnight-express dark:text-argent"
    :img="token"
    token="TOKEN"
    blurb="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla eget venenatis dui. Vivamus gravida ex eget erat ornare consequat."
    :associated="false"
  />
  
  <Token
    class="border-t border-jupiter dark:border-midnight-express dark:text-argent"
    :img="hedera"
    token="HBAR"
    blurb="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla eget venenatis dui. Vivamus gravida ex eget erat ornare consequat."
    :associated="true"
  />
  
  <Token
    class="border-t border-jupiter dark:border-midnight-express dark:text-argent"
    :img="token"
    token="TOKEN"
    blurb="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla eget venenatis dui. Vivamus gravida ex eget erat ornare consequat."
    :associated="true"
  />
</template>

<script lang="ts">
import { defineComponent } from "vue";

import hedera from "../../assets/icon_hedera.svg";
import token from "../../assets/img_token_gen.svg";

import Token from "./Token.vue";

export default defineComponent({
  name: "Tokens",
  components: { Token },
  setup() {
    return {
      hedera,
      token,
    };
  },
});
</script>
