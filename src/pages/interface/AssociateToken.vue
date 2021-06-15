<template>
  <Headline title="Associate Token" parent="tools" />

  <Hint
    text="To send or receive a token, you need to first associate your account with
    the token."
    class="mt-4"
  />

  <!-- TODO: TokenIdInput -->
  <div class="mt-10 flex flex-col max-w-lg m-auto">
    <label class="font-medium text-squant dark:text-argent">Token ID</label>
    <EntityIdInput type="token" />
  </div>

  <div class="mt-48 border-b border-cerebral-grey"></div>

  <div class="flex flex-col items-center max-w-lg m-auto">
    <Button color="green" class="w-full p-4 mt-10" @click="associateToken">
      Associate Token
    </Button>

    <Button color="white" :to="{ name: 'tools' }" class="w-36 p-2 mt-4">
      Cancel
    </Button>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive } from "vue";
import Headline from "../../components/interface/Headline.vue";
import Hint from "../../components/interface/Hint.vue";
import Button from "../../components/base/Button.vue";
import EntityIdInput from "../../components/base/EntityIdInput.vue";

export default defineComponent({
  name: "AssociateToken",
  components: {
    Headline,
    Hint,
    Button,
    EntityIdInput,
  },
  setup() {
    const state = reactive({
      tokenID: null as string | null,
    });

    function associateToken() {
      console.log("associate token function");
    }

    return { state, associateToken };
  },
});
</script>
