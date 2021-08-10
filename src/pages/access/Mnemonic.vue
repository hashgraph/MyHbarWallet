<template>
  <Layout
    :title="$t('MnemonicPhrase.title')"
    class="max-w-lg"
    :back="{ name: 'access.software' }"
  >
    <p class="dark:text-white mb-8">
      {{ $t("MnemonicPhrase.access.prompt") }}
    </p>
    
    <div class="grid gap-5 auto-rows-min">
      <div class="flex space-x-2.5 items-center">
        <SegmentedSelector
          :model-value="wordCount"
          :options="[12, 22, 24]"
          @update:modelValue="onChangeWordCount"
        />
        
        <div class="text-sm text-black-out dark:text-white">
          words
        </div>
      </div>

      <MnemonicInput
        ref="mnemonicInputComponent"
        v-model="mnemonicPhrase"
        :word-count="wordCount"
        :warning-indices="warningIndices"
      />

      <div class="h-5" />
        
      <div
        :class="[
          'relative transition-all duration-300',
          {
            'h-0 mb-0': warningIndices.length === 0,
            'h-16 md:h-10 mb-12': warningIndices.length !== 0,
          },
        ]"
      >
        <Hint
          :class="[
            'transition-all duration-300 absolute w-full',
            {
              'opacity-0 invisible mb-0':
                warningIndices.length === 0,
            },
          ]"
          :text="$t('MnemonicPhrase.access.unknownWords')"
        />

        <Hint
          :class="[
            'transition-all duration-300 absolute w-full',
            {
              'opacity-0 invisible mb-0': !hasChecksumMismatch,
            },
          ]"
          :text="$t('MnemonicPhrase.access.checksum')"
        />
      </div>
    </div>

    <OptionalPasswordInput
      v-model="password"
      class="relative"
      :hint="false"
      :label="$t('BaseOptionalPasswordInput.label1')"
      :placeholder="$t('BasePasswordInput.input1.placeholder1')"
      @update:modelValue="handlePassword"
    />

    <Button
      data-cy-mnemonic-submit
      color="green"
      class="w-full p-3 mt-4"
      :disabled="
        mnemonicPhrase.filter((word) => word.length > 0).length <
          wordCount
      "
      @click="onSubmit"
    >
      {{ $t("BaseButton.accessWallet") }}
    </Button>
  </Layout>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from "vue";
import { useRouter } from "vue-router";

import { MnemonicSoftwareWallet } from "../../domain/wallet/software-mnemonic";
import { useStore } from "../../store";
import Layout from "../../components/access/Layout.vue";
import Button from "../../components/base/Button.vue";
import OptionalPasswordInput from "../../components/base/OptionalPasswordInput.vue";
import Hint from "../../components/interface/Hint.vue";
import MnemonicInput, {
  MnemonicInputComponent,
} from "../../components/base/MnemonicInput.vue";
import SegmentedSelector from "../../components/base/SegmentedSelector.vue";

export default defineComponent({
  name: "Mnemonic",
  components: {
    Layout,
    Button,
    OptionalPasswordInput,
    Hint,
    SegmentedSelector,
    MnemonicInput,
  },
  setup() {
    const password = ref("");
    const mnemonicPhrase = ref<string[]>([]);
    const warningIndices = ref<number[]>([]);
    const hasChecksumMismatch = ref<boolean>(false);
    const wordCount = ref<number>(24);
    const router = useRouter();
    const store = useStore();
    const mnemonicInputComponent = ref<MnemonicInputComponent | null>(null);

    function onChangeWordCount(newCount: number) {
      wordCount.value = newCount;

      // remove any execss words past the new word count
      mnemonicPhrase.value = mnemonicPhrase.value.splice(0, newCount);
      if (mnemonicInputComponent.value) {
        mnemonicInputComponent.value.handleFocus(newCount, null);
      }
    }

    watch(mnemonicPhrase, () => {
      // when the phrase is updated, clear any displayed warnings
      hasChecksumMismatch.value = false;
      warningIndices.value = [];
    });

    async function onSubmit() {
      const { BadMnemonicError, BadMnemonicReason, Mnemonic } =
                await import("@hashgraph/sdk");

      let mnemonic;

      try {
        mnemonic = await Mnemonic.fromWords(mnemonicPhrase.value);
      } catch (err) {
        if (err instanceof BadMnemonicError) {
          if (err.reason === BadMnemonicReason.ChecksumMismatch) {
            hasChecksumMismatch.value = true;
            return;
          } else if (err.reason === BadMnemonicReason.UnknownWords) {
            warningIndices.value = err.unknownWordIndices;
            return;
          }
        }

        throw err;
      }

      const wallet = new MnemonicSoftwareWallet(mnemonic, password.value);

      store.setWallet(wallet);

      router.push({ name: "access.account" });
    }

    function handlePassword(pass: string | null) {
      if (pass) password.value = pass;
      else password.value = "";
    }

    return {
      onSubmit,
      onChangeWordCount,
      wordCount,
      hasChecksumMismatch,
      password,
      warningIndices,
      mnemonicPhrase,
      mnemonicInputComponent,
      handlePassword
    };
  },
});
</script>
