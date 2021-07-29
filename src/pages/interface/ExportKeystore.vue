<template>
  <Headline
    :title="$t('InterfaceToolTile.export.keystore.title')"
    parent="tools"
  />

  <p class="dark:text-silver-polish mt-8 mb-8 sm:mb-0">
    {{ $t("InterfaceExportKeystore.prompt") }}
  </p>

  <div class="dark:text-silver-polish text-center w-full sm:p-8">
    <PasswordInput
      v-model="state.password"
      show-eye
      :confirm="true"
      class="mb-8"
      @valid="passwordValid"
    />

    <Hint :text="$t('InterfaceExportKeystore.hint')" />

    <Button
      color="green"
      class="p-3 m-auto w-3/4 mt-4"
      :disabled="!state.valid"
      @click="downloadKeystore"
    >
      {{ $t("InterfaceToolTile.export.keystore.title") }}
    </Button>

    <InputError class="m-auto">
      {{ state.errorMessage }}
    </InputError>
  </div>
</template>

<script lang = "ts">
import { defineComponent, ref, reactive } from "vue";

import { useStore } from "../../store";
import Headline from "../../components/interface/Headline.vue";
import InputError from "../../components/base/InputError.vue";
import Button from "../../components/base/Button.vue";
import PasswordInput from "../../components/base/PasswordInput.vue";
import Hint from "../../components/interface/Hint.vue";



export default defineComponent({
    name: "ExportKeystore",
    components: {
        Headline,
        InputError,
        Button,
        PasswordInput,
        Hint
    },

    setup(){
      const store = useStore();
      const keystoreLink = ref<HTMLAnchorElement | null>(null);
      const keystore = ref<Uint8Array | null | undefined>(null);
      
      const state = reactive({
        errorMessage: "" as string | null,
        password: "" as string | undefined,
        valid: false,
      });

      function passwordValid(valid: boolean): void {
        state.valid = valid;
      }

      async function downloadKeystore(): Promise<void>{
        state.errorMessage = "";
        try{
          keystore.value = await store.client?.getPrivateKey()?.toKeystore(state.password);
          if(keystore.value){
            const blob = new Blob([keystore.value.buffer]);
            const url = URL.createObjectURL(blob);
            keystoreLink.value = document.createElement("a");
            keystoreLink.value.href = url;
            keystoreLink.value.download = `keystore-${new Date().toISOString()}`;
            keystoreLink.value.click();
          }
        } catch(error){
          state.errorMessage = await store.errorMessage(error);
        }
      }

      return{
        state,
        downloadKeystore,
        passwordValid
      };
    }
});

</script>