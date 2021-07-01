<template>
  <Headline :title="$t('InterfaceTools.header')" />

  <div class="mt-6 flex flex-wrap justify-items-center">
    <ToolTile
      :title="$t('InterfaceToolTile.associateToken.title')"
<<<<<<< HEAD
      :description="$t('InterfaceToolTile.associateToken.hint')"
=======
      description="To send or receive a token, you need to first associate your account with
      the token."
>>>>>>> 54f2556a (feat: update deps to 12)
      :to="{ name: 'tools.associate.token' }"
    />



    <ToolTile :title = "$t('InterfaceConvertUnits')" :description = "$t('ourHelpfulConversionTool')" :to = "{name: 'tools.convert.units'}"/>


<<<<<<< HEAD
<<<<<<< HEAD
    <ToolTile :title = "$t('InterfaceToolTile.download.title')" :description="$t('InterfaceToolTile.download.description')" :to = "{name: 'tools.download'}"/>
=======
    <ToolTile :title = "$t('InterfaceToolTile.download.title')"  :to = "{name: 'tools.download'}"/>
>>>>>>> 54f2556a (feat: update deps to 12)
=======
    <ToolTile :title = "$t('InterfaceToolTile.download.title')"  :to = "{name: 'tools.download'}"/>
>>>>>>> 0e31c2ba (Fixed merge conflicts, issues with router.)
    
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
