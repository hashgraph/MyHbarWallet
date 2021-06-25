<template>
  <Headline :title="$t('InterfaceKeys.header')" />

<<<<<<< HEAD
  <div v-if="privateKey" class="md:px-8 py-4 my-8 max-w-3xl mx-auto">
=======
  <div v-if="privateKey" class="md:px-8 py-4 my-8 max-w-3xl w-full mx-auto">
>>>>>>> 0e31c2ba (Fixed merge conflicts, issues with router.)
    <KeyInput
      :model-value="privateKey"
      can-copy
      secret
      read-only
      :label="$t('InterfaceKeys.input1.label')"
    />
  </div>

  <div v-if="publicKey" class="md:px-8 py-4 my-8 max-w-3xl w-full mx-auto">
    <KeyInput
      :model-value="publicKey"
      can-copy
      read-only
      :label="$t('InterfaceKeys.input2.label')"
    />
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from "vue";
import { useStore } from "../../store";
import KeyInput from "../../components/base/KeyInput.vue";
import Headline from "../../components/interface/Headline.vue";

export default defineComponent({
  name: "Keys",
  components: { KeyInput, Headline },
  setup() {
    const store = useStore();

    // 302a300506032b6570032100...
    const publicKey = computed(() => store.publicKey?.toString()?.slice(25));

    // 302e020100300506032b657004220420...
    const privateKey = computed(() => store.privateKey?.toString()?.slice(33));

    return {
      publicKey,
      privateKey,
    };
  },
});
</script>
