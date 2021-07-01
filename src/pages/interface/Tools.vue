<template>
  <Headline :title="$t('InterfaceTools.header')" />

<<<<<<< HEAD
  <div class="mt-6 flex flex-wrap justify-items-center">
=======
  <div class="mt-6 flex flex-wrap">
>>>>>>> 1071461646dafa61a6e27f9d6450406957b0577a
    <ToolTile
      :title="$t('InterfaceToolTile.associateToken.title')"
      description="To send or receive a token, you need to first associate your account with
      the token."
      :to="{ name: 'tools.associate.token' }"
    />



<<<<<<< HEAD
    <ToolTile :title = "$t('InterfaceConvertUnits')" :description = "$t('ourHelpfulConversionTool')" :to = "{name: 'tools.convert.units'}"/>


    <ToolTile :title = "$t('InterfaceToolTile.download.title')"  :to = "{name: 'tools.download'}"/>
=======
    <ToolTile :title = "$t('InterfaceConvertUnits')" description = "Our helpful conversion tool and hbar unit reference allow you to calculate your total transaction cost." :to = "{name: 'tools.convert.units'}"/>
>>>>>>> 1071461646dafa61a6e27f9d6450406957b0577a
    
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
