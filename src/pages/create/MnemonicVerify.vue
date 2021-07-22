<template>
  <Layout
    :title="$t('Mnemonic.VerifyTitle')"
    class="max-w-lg"
    :back="{ name: 'create.software.mnemonic' }"
  >
    <form
      class="grid gap-5 auto-rows-min"
      @submit.prevent="handleSubmit"
    >
      <MnemonicInput
        v-model="verifyPhrase"
        :word-count="mnemonicPhrase.length"
      />

      <PasswordInput
        v-model="verifyPassword"
        :placeholder="$t('Mnemonic.Password')"
      />

      <InputError v-if="errorMessage.length > 0">
        {{ errorMessage }}
      </InputError>

      <Button
        type="submit"
        color="green"
        class="mt-14 w-full p-4"
      >
        {{ $t("Mnemonic.Verify") }}
      </Button>
    </form>
  </Layout>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from "vue";
import { useI18n } from "vue-i18n";
import { useRouter } from "vue-router";

import { MnemonicSoftwareWallet } from "../../domain/wallet/software-mnemonic";
import Layout from "../../components/access/Layout.vue";
import Button from "../../components/base/Button.vue";
import PasswordInput from "../../components/base/PasswordInput.vue";
import MnemonicInput from "../../components/base/MnemonicInput.vue";
import InputError from "../../components/base/InputError.vue";
import { useStore } from "../../store";

export default defineComponent({
  name: "MnemonicVerify",
  components: {
    Button,
    MnemonicInput,
    Layout,
    PasswordInput,
    InputError
  },
  setup() {
    const store = useStore();
    const i18n = useI18n();
    const router = useRouter();

    const errorMessage = ref("");

    const password = ref("");
    const verifyPassword = ref("");

    const mnemonicPhrase = ref<string[]>([]);
    const verifyPhrase = ref<string[]>([]);

    onMounted(() => {
      if (store.wallet != null) {
        try {
          mnemonicPhrase.value = (store.wallet as MnemonicSoftwareWallet).getMnemonic().words;
          password.value = (store.wallet as MnemonicSoftwareWallet).getPassword();
        } catch (error) {
          router.push({ name: "create" });
        }
      } else {
        router.push({ name: "create" });
      }
    });

    async function handleSubmit(): Promise<void> {
      errorMessage.value = "";

      if (mnemonicPhrase.value.join(",") !== verifyPhrase.value.join(",")) {
        errorMessage.value = i18n.t('Mnemonic.MnemonicsDontMatch').toString();
        return;
      }

      if (password.value !== verifyPassword.value) {
        errorMessage.value = i18n.t('Mnemonic.PasswordsDontMatch').toString();
        return;
      }

      router.push({ name: "access.account" });
    }

    return {
      verifyPassword,
      errorMessage,
      mnemonicPhrase,
      verifyPhrase,
      handleSubmit,
    };
  },
});
</script>
