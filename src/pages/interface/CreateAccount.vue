<template>
  <Headline />
  
  <Hint />
  
  <form @submit.prevent="handleSubmit">
    <AssetInput />

    <InputError />
    
    <Button
      type="submit"
      @click.stop="handleSubmit"
    />
  </form>
</template>

<script lang="ts">
import { defineComponent, reactive } from "vue";

import Headline from "../../components/interface/Headline.vue";
import Hint from "../../components/interface/Hint.vue";
import AssetInput from "../../components/interface/AssetInput.vue";
import InputError from "../../components/base/InputError.vue";
import Button from "../../components/base/Button.vue";

export default defineComponent({
  name: "CreateAccount",
  components: {
    Headline,
    Hint,
    AssetInput,
    InputError,
    Button
  },
  setup() {
    const state = reactive({
    });

    return {
      state
    }
  }
})
</script>