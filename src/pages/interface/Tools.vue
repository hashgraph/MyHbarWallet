<template>
  <Headline :title="$t('InterfaceTools.header')" />

  <div class="flex flex-wrap mt-6">
    <ToolTile
      v-if="hasPrivateKey"
      data-cy-tool-associate
      :title="$t('InterfaceToolTile.associateToken.title')"
      :description="$t('InterfaceToolTile.associateToken.description')"
      :to="{ name: 'tools.associate.token' }"
    />

    <ToolTile
      :title="$t('InterfaceToolTile.createAccount.title')"
      :description="$t('InterfaceToolTile.createAccount.description')"
      :to="{ name: 'tools.create.account' }"
    />

    <ToolTile
      v-if="hasPrivateKey"
      :title="$t('InterfaceToolTile.upload.title')"
      :description="$t('InterfaceToolTile.upload.description')"
      :to="{ name: 'tools.upload' }"
    />

    <ToolTile
      v-if="hasPrivateKey"
      :title="$t('InterfaceToolTile.download.title')"
      :description="$t('InterfaceToolTile.download.description')"
      :to="{ name: 'tools.download' }"
    />

    <ToolTile
      v-if="hasPrivateKey"
      :title="$t('InterfaceToolTile.convert.title')"
      :description="$t('InterfaceToolTile.convert.description')"
      :to="{ name: 'tools.convert.units' }"
    />

    <ToolTile
      v-if="hasPrivateKey"
      :title="$t('InterfaceToolTile.export.title')"
      :description="$t('InterfaceToolTile.export.description')"
      :to="{ name: 'tools.export.keystore'}"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from "vue";

import { useStore } from "../../store";
import Headline from "../../components/interface/Headline.vue";
import ToolTile from "../../components/interface/ToolTile.vue";

export default defineComponent({
  name: "Tools",
  components: {
    Headline,
    ToolTile,
  },
  setup() {
    const store = useStore();

    // Some hedera functionality not supported on HW wallets
    const hasPrivateKey = computed(() => store.wallet?.hasPrivateKey());

    return {
      hasPrivateKey
    }
  }
});
</script>
