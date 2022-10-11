<template>
  <Layout
    :title="$t('MnemonicPhrase.title')"
    class="max-w-lg"
    :back="{ name: 'create' }"
  >
    <form
      class="grid gap-5 auto-rows-min"
      @submit.prevent="handleSubmit"
    >
      <MnemonicInput
        v-if="mnemonicPhrase"
        :model-value="[...mnemonicPhrase.toString().split(' ')]"
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
        type="submit"
        color="green"
        class="w-full p-4 relative"
      >
        {{ $t("MnemonicPhrase.create.button") }}
      </Button>

      <!-- 'Not Recommended' banner for Software method -->
      <NotRecommendedBanner>
        <span>
          {{ $t("MnemonicPhrase.create.note.dnf") + $t("MnemonicPhrase.create.note") }}
        </span>
      </NotRecommendedBanner>
    </form>
  </Layout>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from "vue";
import type { Mnemonic } from "@hashgraph/sdk";

import { MnemonicSoftwareWallet } from "../../domain/wallet/software-mnemonic";
import { useStore } from "../../store";
import { Wallet } from "../../domain/wallet/abstract";
import router from "../../router";
import Layout from "../../components/access/Layout.vue";
import Button from "../../components/base/Button.vue";
import OptionalPasswordInput from "../../components/base/OptionalPasswordInput.vue";
import MnemonicInput from "../../components/base/MnemonicInput.vue";
import NotRecommendedBanner from '../../components/base/NotRecommendedBanner.vue';

export default defineComponent({
  name: "CreateMnemonic",
  components: {
    Button,
    MnemonicInput,
    Layout,
    OptionalPasswordInput,
    NotRecommendedBanner,
  },
  setup() {
    const store = useStore();
    const mnemonicPhrase = ref<Mnemonic | null>(null);
    const password = ref("");
    const wallet = ref<Wallet | null>(null);

    onMounted(() => {
      if (store.wallet != null) {
        try {
          mnemonicPhrase.value = (store.wallet as MnemonicSoftwareWallet).getMnemonic();
          password.value = (store.wallet as MnemonicSoftwareWallet).getPassword();
          wallet.value = store.wallet;
        } catch (error) {
          router.push({ name: "create" });
        }
      }

      import("@hashgraph/sdk").then(({ Mnemonic }) =>
        Mnemonic.generate().then((mnemonic) => {
          if (wallet.value == null) {
            mnemonicPhrase.value = mnemonic;
            password.value = "";
          }
        })
      );
    })

    function handleSubmit() {
      wallet.value = new MnemonicSoftwareWallet(
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        mnemonicPhrase.value! as Mnemonic,
        password.value
      );

      store.setWallet(wallet.value);

      router.push({ name: "create.software.mnemonic.verify" });
    }

    return {
      password,
      mnemonicPhrase,
      handleSubmit,
    };
  },
});
</script>
