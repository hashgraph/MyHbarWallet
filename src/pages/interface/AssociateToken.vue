<template>
  <Headline title="Associate Token" parent="tools" />

  <Hint :text="$t('InterfaceToolTile.associateToken.hint')" class="mt-4" />

  <!-- TODO: TokenIdInput -->
  <div class="mt-10 flex flex-col max-w-lg m-auto">
    <label class="font-medium text-squant dark:text-argent">
      {{ $t("InterfaceToolTile.associateToken.label.tokenID") }}</label
    >
    <EntityIdInput
      type="token"
      v-model="state.tokenID"
      placeholder="shard.realm.num"
    />
  </div>

  <div class="mt-48 border-b border-cerebral-grey"></div>

  <div class="flex flex-col items-center max-w-lg m-auto">
    <Button color="green" class="w-full p-4 mt-10" @click="associateToken">
      {{ $t("InterfaceToolTile.associateToken.title") }}
    </Button>

    <Button color="white" :to="{ name: 'tools' }" class="w-36 p-2 mt-4">
      {{ $t("BaseButton.cancel") }}
    </Button>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, computed } from "vue";
import Headline from "../../components/interface/Headline.vue";
import Hint from "../../components/interface/Hint.vue";
import Button from "../../components/base/Button.vue";
import EntityIdInput from "../../components/base/EntityIdInput.vue";
import { useStore } from "../../store";
import { TokenAssociateTransaction } from "@hashgraph/sdk";

export default defineComponent({
  name: "AssociateToken",
  components: {
    Headline,
    Hint,
    Button,
    EntityIdInput,
  },
  setup() {
    const store = useStore();

    const accountID = computed(() => store.accountId);
    const publicKey = computed(() => store.publicKey);
    const client = computed(() => store.client);
    const state = reactive({
      tokenID: null as string | null,
    });

    function associateToken() {
      if (client == null || store == null) {
        throw new Error("'client' is null.");
        return;
      }
      console.log(client);
      // let tokenHandler = new TokenAssociateTransaction().setAccountId(accountID).setTokenIds([tokenID]);
      // tokenHandler.signWith(client.value);
    }

    return { state, associateToken, accountID };
  },
});
</script>
