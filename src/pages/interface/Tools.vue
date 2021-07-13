<template>
  <Headline :title="$t('InterfaceTools.header')" />

  <div class="flex flex-wrap mt-6">
    <ToolTile
      :title="$t('InterfaceToolTile.associateToken.title')"
      :description="$t('InterfaceToolTile.associateToken.description')"
      :to="{ name: 'tools.associate.token' }"
    />

    <!-- <ToolTile
      :title="$t('InterfaceConvertUnits')"
      description="Our helpful conversion tool and hbar unit reference allow you to calculate your total transaction cost."
      :to="{ name: 'tools.convert.units' }"
    /> -->
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

import Headline from "../../components/interface/Headline.vue";
import ToolTile from "../../components/interface/ToolTile.vue";

export default defineComponent({
  name: "Tools",
  components: {
    Headline,
    ToolTile,
  },
});
</script>
