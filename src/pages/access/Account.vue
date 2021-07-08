<template>
  <Layout
    title="Select Account"
    :back="{ name: 'access' }"
    class="max-w-[36.5rem]"
  >
    <!--    <div class="text-black-out dark:text-white">Associated Accounts</div>-->

    <!--    <div class="mt-2 text-sm text-squant dark:text-white">-->
    <!--      No known associated accounts. This does not mean your key is not-->
    <!--      associated with an account.-->
    <!--    </div>-->

    <!--

      TODO: re-enable once this is **possible**

    <div class="mt-4">
      <AccessRadioOptionAccount
        v-for="(option, index) in accountOptions"
        :key="index"
        name="choice"
        :account-id="option.id"
        :balance="option.balance"
        @radio-change="() => console.log('does this work?')"
        @update:radio-option="() => handleOptionChange(index)"
      />
    </div>
  -->

    <!--    <div class="flex items-center justify-between w-full my-6">-->
    <!--      <div class="h-0 border-b w-52 border-cerebral-grey"></div>-->
    <!--      <div class="text-sm text-carbon dark:text-white">OR</div>-->
    <!--      <div class="h-0 border-b w-52 border-cerebral-grey"></div>-->
    <!--    </div>-->

    <div>
      <div class="mb-5 text-black-out dark:text-white">Enter Account ID</div>

      <AccountIdInput
        v-model="accountId"
        data-cy-account-input
        :show-eye="false"
        class="w-full"
        :error="accountIdMismatch"
        placeholder="0.0.1001 or shard.realm.num"
      />

      <InputError v-if="accountIdMismatch">
        This account is not associated with your wallet. Please try another
        account or reach out to support.
      </InputError>
    </div>

    <Button
      data-cy-account-submit
      color="green"
      class="w-full p-3 mt-12 mb-4"
      :disabled="accountId == null"
      :busy="busy != null"
      @click="onContinue"
    >
      {{ busy || "Continue" }}
    </Button>

    <div class="flex items-center justify-between w-full mt-8 mb-6">
      <div class="h-0 border-b w-52 border-cerebral-grey"></div>
      <div class="text-sm text-carbon dark:text-white">OR</div>
      <div class="h-0 border-b w-52 border-cerebral-grey"></div>
    </div>

    <div class="mb-2 text-black-out dark:text-white">
      Request to Create Account
    </div>

    <div class="mb-5 text-sm leading-relaxed text-squant">
      Give your public key to a current Hedera™ account owner so they can create
      another Account ID for you with your public key.
    </div>

    <div
      v-if="publicKey != null"
      class="
        break-all
        border border-cerebral-grey
        text-sm
        font-roboto
        rounded
        px-5
        py-3.5
        bg-white
        text-carbon
      "
    >
      {{ publicKey.toString().slice(24) }}
    </div>
    <div v-if="hasMorePublicKeys" class="mt-1.5">
      <div class="mb-5 ml-4 text-xs leading-relaxed text-squant">
        If the above does not match your expected public key, please note that
        Hashgraph wallet applications may derive keys from your phrase in
        multiple ways. MyHbarWallet will try each of these keys on login.
        <span
          class="
            font-medium
            cursor-pointer
            text-mountain-meadow
            hover:text-opacity-60
          "
          @click="onShowMorePublicKeys"
          >Click here</span
        >
        to view all possible public keys that will be attempted.
      </div>

      <!-- TODO: need a better design here for presenting ALL potential keys -->

      <template v-if="morePublicKeys">
        <div class="mb-5 text-black-out dark:text-white">
          Possible Public Keys
        </div>

        <div class="space-y-1.5">
          <div
            v-for="publicKey in morePublicKeys"
            :key="publicKey.toString()"
            class="
              break-all
              border border-cerebral-grey
              text-sm
              font-roboto
              rounded
              px-5
              py-3.5
              bg-white
              text-carbon
            "
          >
            {{ publicKey.toString().slice(24) }}
          </div>
        </div>
      </template>
    </div>
  </Layout>
</template>

<script lang="ts">
import type { AccountId, PublicKey } from "@hashgraph/sdk";
import { defineComponent, ref, watch, onMounted } from "vue";
import { useContainer } from "../../hooks/container";
import { useRouter } from "vue-router";
import { useStore } from "../../store";
import Layout from "../../components/access/Layout.vue";
import InputError from "../../components/base/InputError.vue";
import AccountIdInput from "../../components/base/AccountIdInput.vue";
import Button from "../../components/base/Button.vue";

export default defineComponent({
  name: "AccessAccount",
  components: {
    Layout,
    AccountIdInput,
    InputError,
    Button,
  },
  setup() {
    const container = useContainer();
    const store = useStore();
    const router = useRouter();

    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const wallet = store.wallet!;

    onMounted(() => {
      if (store.wallet == null) {
        router.push({ name: "access.software" });
      }
    });

    const publicKey = ref<PublicKey | null>(null);
    const hasMorePublicKeys = wallet ? wallet.minIndex < 0 : false;
    const morePublicKeys = ref<PublicKey[] | null>(null);

    const accountId = ref<AccountId | null>(null);
    const accountIdMismatch = ref(false);

    const busy = ref<string | null>(null);


    (async () => {
      publicKey.value = await wallet.getPublicKey(0);
    })();

    async function onShowMorePublicKeys() {
      if (wallet.minIndex < 0) {
        let moreKeys = [];

        for (let keyIdx = -1; keyIdx >= wallet.minIndex; keyIdx--) {
          moreKeys.push(await wallet.getPublicKey(keyIdx));
        }

        morePublicKeys.value = moreKeys;
      }
    }

    watch(accountId, () => {
      accountIdMismatch.value = false;
    });

    async function onContinue() {
      // note: this button should not be clickable if the account ID is invalid
      if (accountId.value == null) return;

      busy.value = "Verifying account …";
      accountIdMismatch.value = false;

      const atLeastDelay = new Promise((resolve) => setTimeout(resolve, 750));

      try {
        let client;

        for (let keyIndex = 0; keyIndex >= wallet.minIndex; keyIndex--) {
          try {
            client = await container.cradle.hedera.createClient({
              wallet,
              keyIndex,
              accountId: accountId.value,
              network: store.network,
            });
          } catch (error) {
            console.log(keyIndex);
            console.log(error);
          }

          if (client != null) break;
        }

        await atLeastDelay;

        if (client == null) {
          accountIdMismatch.value = true;
          return;
        }

        store.setClient(client);
        router.push({ name: "home" });
      } finally {
        busy.value = null;
      }
    }

    return {
      busy,
      accountId,
      publicKey,
      accountIdMismatch,
      morePublicKeys,
      hasMorePublicKeys,
      onShowMorePublicKeys,
      onContinue,
    };
  },
});
</script>
