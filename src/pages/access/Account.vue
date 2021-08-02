<template>
  <Layout
    :title="$t('Account.HederaAccount')"
    :back="{ name: 'marketing' }"
    class="max-w-[36.5rem]"
  >
    <div>
      <div class="mb-5 text-black-out dark:text-white">
        {{ $t("Account.EnterAccountId") }}
      </div>

      <AccountIdInput
        v-model="state.accountId"
        data-cy-account-input
        :show-eye="false"
        class="w-full"
        :error="state.error"
        :placeholder="$t('Account.ShardRealmNum')"
      />

      <InputError v-if="state.error">
        {{ state.errorMessage.length > 0 ? state.errorMessage : $t("Account.UnknownError") }}
      </InputError>
    </div>

    <Button
      data-cy-account-submit
      color="green"
      class="w-full p-3 mt-12 mb-4"
      :disabled="state.accountId == null || state.publicKey == null || state.wallet == null"
      :busy="state.busy"
      @click="onContinue"
    >
      {{ state.busyMessage.length > 0 ? state.busyMessage : $t("Account.Continue") }}
    </Button>

    <template v-if="state.publicKey != null">
      <div class="flex items-center justify-between w-full mt-8 mb-6">
        <div class="h-0 border-b w-52 border-cerebral-grey" />
        <div class="text-sm text-carbon dark:text-white">
          {{ $t("Account.Or") }}
        </div>
        <div class="h-0 border-b w-52 border-cerebral-grey" />
      </div>

      <div class="mb-2 text-black-out dark:text-white">
        {{ $t("Account.RequestCreate") }}
      </div>

      <div class="mb-5 text-sm leading-relaxed text-squant">
        {{ $t("Account.GivePublicKey") }}
      </div>

      <div class="flex items-center justify-center m-10">
        <QrCode
          data-cy-qr-code
          :size="200"
          :value="state.publicKey.toString().slice(24)"
        />
      </div>

      <div
        data-cy-public-key
        class="break-all border border-cerebral-grey text-sm font-roboto rounded px-5 py-3.5 bg-white text-carbon"
      >
        {{ state.publicKey.toString().slice(24) }}
      </div>

      <div
        v-if="hasLedgerWallet && state.publicKey == null"
        class="flex items-center justify-center"
      >
        <Button
          class="mt-4 px-5 py-2"
          color="white"
          @click="handleExportPublicKey"
        >
          {{ $t("Access.Account.ExportPublicKey") }}
        </Button>
      </div>
    </template>

    <div
      v-if="state.hasMorePublicKeys"
      class="mt-1.5"
    >
      <div class="mb-5 ml-4 text-xs leading-relaxed text-squant">
        {{ $t("Account.IfTheAbove") }}
        <span
          class="font-medium cursor-pointer text-mountain-meadow hover:text-opacity-60"
          @click="onShowMorePublicKeys"
        >{{ $t("Account.ClickHere") }}</span>
        {{ $t("Account.ViewPossibleKeys") }}
      </div>

      <template v-if="state.morePublicKeys">
        <div class="mb-5 text-black-out dark:text-white">
          {{ $t("Account.PossiblePublicKeys") }}
        </div>

        <div class="space-y-1.5">
          <div
            v-for="publicKey in state.morePublicKeys"
            :key="publicKey.toString()"
            class="break-all border border-cerebral-grey text-sm font-roboto rounded px-5 py-3.5 bg-white text-carbon"
          >
            {{ publicKey.toString().slice(24) }}
          </div>
        </div>
      </template>
    </div>

    <div class="flex items-center justify-between w-full mt-8 mb-6">
      <div class="h-0 border-b w-52 border-cerebral-grey" />
      <div class="text-sm text-carbon dark:text-white">
        {{ $t("Account.Or") }}
      </div>
      <div class="h-0 border-b w-52 border-cerebral-grey" />
    </div>
    
    <CustomerSupportButton class="text-center text-mountain-meadow" />
  </Layout>
</template>

<script lang="ts">
import type { AccountId, PublicKey } from "@hashgraph/sdk";
import { defineComponent, reactive, watch, onMounted, computed } from "vue";
import { useRouter } from "vue-router";
import { useI18n } from "vue-i18n";
import QrCode from "qrcode.vue";

import { LedgerHardwareWallet } from "../../domain/wallet/hardware-ledger";
import { MnemonicSoftwareWallet } from "../../domain/wallet/software-mnemonic";
import { KeystoreSoftwareWallet } from "../../domain/wallet/software-keystore";
import { Wallet } from "../../domain/wallet/abstract";
import { useContainer } from "../../hooks/container";
import { useStore } from "../../store";
import Layout from "../../components/access/Layout.vue";
import InputError from "../../components/base/InputError.vue";
import AccountIdInput from "../../components/base/AccountIdInput.vue";
import Button from "../../components/base/Button.vue";
import CustomerSupportButton from "../../components/interface/CustomerSupportButton.vue";

interface State {
  wallet: Wallet | null;
  publicKey: PublicKey | null;
  hasMorePublicKeys: boolean;
  morePublicKeys: PublicKey[] | null;
  accountId: AccountId | null;
  error: boolean;
  errorMessage: string;
  busy: boolean;
  busyMessage: string;
}

export default defineComponent({
  name: "Account",
  components: {
    Layout,
    AccountIdInput,
    InputError,
    Button,
    CustomerSupportButton,
    QrCode,
  },
  setup() {
    const container = useContainer();
    const i18n = useI18n();
    const store = useStore();
    const router = useRouter();
    const state = reactive<State>({
      wallet: null,
      publicKey: null,
      hasMorePublicKeys: false,
      morePublicKeys: null,
      accountId: null,
      error: false,
      errorMessage: "",
      busy: false,
      busyMessage: ""
    });

    async function handleExportPublicKey(): Promise<void> {
      state.wallet = store.wallet;
      state.publicKey = null;
      state.busy = true;
      let key: PublicKey | undefined = undefined;

      for (let keyIdx = 0; keyIdx >= (state.wallet?.minIndex ?? 0); keyIdx--) {
        try {
          key = await state.wallet?.getPublicKey(keyIdx);
        } catch (error) {
          state.error = true;
          state.errorMessage = await store.errorMessage(error);
        }
        if (key) break;
      }

      if (key) state.publicKey = key;
      state.busy = false;
    }

    onMounted(async () => {
      if (store.wallet == null) {
        router.push({ name: "access" });
      } else {
        await handleExportPublicKey();

        // mnemonics and keystores are derivable
        if (state.wallet instanceof MnemonicSoftwareWallet ||
          state.wallet instanceof KeystoreSoftwareWallet) {
          state.hasMorePublicKeys = true;
        }
      }
    });

    watch(
      () => state.accountId,
      () => {
        state.error = false;
        state.errorMessage = "";
        state.busyMessage = "";
      });

    const hasLedgerWallet = computed(() => {
      return state.wallet instanceof LedgerHardwareWallet;
    });

    async function onShowMorePublicKeys() {
      if (state.wallet != null) {
        if (state.wallet.minIndex < 0) {
          let moreKeys = [];

          for (let keyIdx = 0; keyIdx >= state.wallet.minIndex; keyIdx--) {
            const key = await state.wallet.getPublicKey(keyIdx);
            if (key) moreKeys.push(key);
          }

          state.morePublicKeys = moreKeys;
        }
      }
    }

    async function onContinue() {
      if (state.accountId == null) return;
      state.busyMessage = "Verifying account …";
      state.error = false;
      state.errorMessage = "";

      try {
        let client;

        if (state.wallet != null) {
          for (
            let keyIndex = 0;
            keyIndex >= state.wallet.minIndex;
            keyIndex--
          ) {
            try {
              client = await container.cradle.hedera.createClient({
                wallet: state.wallet,
                keyIndex,
                accountId: state.accountId,
                network: store.network,
              });
            } catch (error) {
              console.warn(error);
            }

            if (client != null) break;
          }

          if (client == null) {
            state.error = true;
            state.errorMessage = i18n.t("Common.Error.AccountKeyMismatch").toString()
            return;
          }

          store.setClient(client);
          router.push({ name: "home" });
        }
      } finally {
        state.busy = false;
        state.busyMessage = "";
      }
    }

    return {
      state,
      onShowMorePublicKeys,
      onContinue,
      hasLedgerWallet,
      handleExportPublicKey
    };
  },
});
</script>
