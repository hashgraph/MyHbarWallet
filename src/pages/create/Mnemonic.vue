<template>
  <Layout
    :title="$t('MnemonicPhrase.title')"
    class="max-w-lg"
    :back="{ name: 'create' }"
  >
    <div class="grid gap-5 auto-rows-min">
      <MnemonicInput
        v-if="mnemonicPhrase"
        :model-value="mnemonicPhrase.words"
        :word-count="24"
        read-only
      />

      <OptionalPasswordInput
        v-model="password"
        :label="$t('BaseOptionalPasswordInput.label1')"
        :placeholder="$t('BasePasswordInput.input1.placeholder4')"
        confirm
      />

      <Button
        color="green"
        class="w-full p-4"
        @click="handleSubmit"
      >
        {{ $t("MnemonicPhrase.create.button") }}
      </Button>
    </div>
  </Layout>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import type { Mnemonic } from "@hashgraph/sdk";

import router from "../../router";
import Layout from "../../components/access/Layout.vue";
import Button from "../../components/base/Button.vue";
import OptionalPasswordInput from "../../components/base/OptionalPasswordInput.vue";
import MnemonicInput from "../../components/base/MnemonicInput.vue";
import { MnemonicSoftwareWallet } from "../../domain/wallet/software-mnemonic";
import { useStore } from "../../store";

export default defineComponent({
  name: "CreateMnemonic",
  components: {
    Button,
    MnemonicInput,
    Layout,
    OptionalPasswordInput,
  },
  setup() {
    const password = ref("");
    const mnemonicPhrase = ref<Mnemonic | null>(null);
    const store = useStore();

    function handleSubmit() {
      // TODO: router.push({ name: "create.mnemonic.verify" });

      const wallet = new MnemonicSoftwareWallet(
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                mnemonicPhrase.value! as Mnemonic,
                password.value
      );

      store.setWallet(wallet);

      router.push({ name: "access.account" });
    }

    import("@hashgraph/sdk").then(({ Mnemonic }) =>
      Mnemonic.generate().then((mnemonic) => {
        mnemonicPhrase.value = mnemonic;
      })
    );

    return {
      password,
      mnemonicPhrase,
      handleSubmit,
    };
  },
});
</script>
