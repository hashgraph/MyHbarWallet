<template>
  <Layout
    title="Keystore File"
    class="max-w-lg"
    :back="{ name: 'create' }"
  >
    <form class="grid gap-5 auto-rows-min">
      <p class="dark:text-white">
        {{ $t("BaseOptionalPasswordInput.label1") }}
      </p>
      <PasswordInput
        v-model="password"
        :placeholder="$t('BasePasswordInput.input1.placeholder4')"
        confirm
        show-eye
        @valid="handleValid"
      />

      <InputError v-if="errorMessage.length > 0">
        {{ errorMessage }}
      </InputError>

      <Button
        data-cy-keystore-submit
        color="green"
        class="w-full p-3 mt-14"
        :disabled="!ready"
        @click="handleSubmit"
      >
        {{ $t("BaseButton.continue") }}
      </Button>

      <div class="mt-10 text-sm text-black-out dark:text-white">
        <span class="font-semibold text-Megaman-Helmet">
          {{ $t("Keystore.create.note.dnf") }}
        </span>

        {{ $t("Keystore.create.note") }}
      </div>
    </form>
  </Layout>
</template>

<script lang="ts">
import {
    defineComponent,
    getCurrentInstance,
    ref,
    computed,
    nextTick,
} from "vue";
import { debouncedWatch } from "@vueuse/core";
import { useRouter } from "vue-router";

import { useStore } from "../../store";
import { KeystoreSoftwareWallet } from "../../domain/wallet/software-keystore";
import Button from "../../components/base/Button.vue";
import PasswordInput from "../../components/base/PasswordInput.vue";
import InputError from "../../components/base/InputError.vue";
import Layout from "../../components/access/Layout.vue";

declare const __TEST__: boolean;

export default defineComponent({
    name: "CreateKeystore",
    components: { Layout, PasswordInput, InputError, Button },
    setup() {
        const keystore = ref<Uint8Array | null>(null);
        const keystoreLink = ref<HTMLAnchorElement | null>(null);
        const password = ref("");
        const errorMessage = ref("");
        const passwordReady = ref(false);

        const ready = computed(() => {
            return passwordReady.value && keystore.value != null;
        });

        const store = useStore();
        const router = useRouter();

        debouncedWatch(
            () => password.value,
            async (newPassword) => {
                keystore.value = null;
                const { PrivateKey } = await import("@hashgraph/sdk");
                const key = PrivateKey.generate();
                const keyStore = await key.toKeystore(newPassword);
                keystore.value = keyStore;
            },
            { debounce: 500 }
        );

        async function downloadKeystore() {
            errorMessage.value = "";

            if (keystore.value != null) {
                const blob = new Blob([keystore.value.buffer]);
                const url = URL.createObjectURL(blob);
                keystoreLink.value = document.createElement("a");
                keystoreLink.value.href = url;
                if(__TEST__) {
                    keystoreLink.value.download = 'keystore'
                } else {
                    keystoreLink.value.download = `keystore-${new Date().toISOString()}`;
                }
                const root = getCurrentInstance();
                root?.vnode.el?.appendChild(keystoreLink);
                keystoreLink.value.click();
                root?.vnode.el?.removeChild(keystoreLink);

            }
            keystoreLink.value = null;
        }

        function handleValid(valid: boolean): void {
            passwordReady.value = valid;
        }

        async function handleSubmit() {
            if (keystore.value == null) return;
            if (password.value.length < 9) return;

            await downloadKeystore();

            nextTick(async () => {
                try {
                    if (keystore.value != null) {
                        const wallet = new KeystoreSoftwareWallet(keystore.value, password.value);
                        store.setWallet(wallet);
                        router.push({ name: "access.account" });
                    }
                } catch (error) {
                    errorMessage.value = await store.errorMessage(error);
                }
            });
        }

        return {
            password,
            ready,
            errorMessage,
            handleValid,
            handleSubmit,
        };
    },
});
</script>
