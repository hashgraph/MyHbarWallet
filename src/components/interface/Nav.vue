<template>
  <div class="flex flex-col p-2 md:p-5">
    <NavItem
      :icon="iconNavGreyHome"
      :active-icon="iconNavPurpleHome"
      :text="$t('RouterLink.home')"
      :to="{ name: 'home' }"
    />

    <NavItem
      :icon="iconNavGreyAssets"
      :active-icon="iconNavPurpleAssets"
      :text="$t('RouterLink.assets')"
      :to="{ name: 'assets' }"
    />

    <!-- <NavItem
      :icon="iconNavGreyTokens"
      :active-icon="iconNavPurpleTokens"
      :text="$t('RouterLink.tokens')"
      :to="{ name: 'tokens' }"
    /> -->

    <!-- <NavItem
      :icon="iconNavGreyPeople"
      :active-icon="iconNavPurplePeople"
      :text="$t('RouterLink.people')"
      :to="{ name: 'people' }"
    /> -->

    <NavItem
      :icon="iconNavGreyHistory"
      :active-icon="iconNavPurpleHistory"
      :text="$t('RouterLink.history')"
      :to="{ name: 'history' }"
    />

    <NavItem
      :icon="iconNavGreyKeys"
      :active-icon="iconNavPurpleKeys"
      :text="$t('RouterLink.keys')"
      :to="{ name: 'keys' }"
    />

    <NavItem
      data-cy-tools
      :icon="iconNavGreyTools"
      :active-icon="iconNavPurpleTools"
      :text="$t('RouterLink.tools')"
      :to="{ name: 'tools' }"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

import NavItem from "../base/NavItem.vue";
import iconNavGreyAssets from "../../assets/icon_nav_grey_assets.svg";
import iconNavGreyHistory from "../../assets/icon_nav_grey_history.svg";
import iconNavGreyHome from "../../assets/icon_nav_grey_home.svg";
import iconNavGreyKeys from "../../assets/icon_nav_grey_keys.svg";
import iconNavGreyPeople from "../../assets/icon_nav_grey_people.svg";
import iconNavGreyTokens from "../../assets/icon_nav_grey_tokens.svg";
import iconNavGreyTools from "../../assets/icon_nav_grey_tools.svg";
import iconNavPurpleAssets from "../../assets/icon_nav_purple_assets.svg";
import iconNavPurpleHistory from "../../assets/icon_nav_purple_history.svg";
import iconNavPurpleHome from "../../assets/icon_nav_purple_home.svg";
import iconNavPurpleKeys from "../../assets/icon_nav_purple_keys.svg";
import iconNavPurplePeople from "../../assets/icon_nav_purple_people.svg";
import iconNavPurpleTokens from "../../assets/icon_nav_purple_tokens.svg";
import iconNavPurpleTools from "../../assets/icon_nav_purple_tools.svg";
import { useScreen } from "../../hooks/screen";

export default defineComponent({
  name: "Nav",
  components: { NavItem },
  setup() {
    const lg = useScreen("lg");

    return {
      lg,
      iconNavGreyAssets,
      iconNavGreyHistory,
      iconNavGreyHome,
      iconNavGreyKeys,
      iconNavGreyPeople,
      iconNavGreyTokens,
      iconNavGreyTools,
      iconNavPurpleAssets,
      iconNavPurpleHistory,
      iconNavPurpleHome,
      iconNavPurpleKeys,
      iconNavPurplePeople,
      iconNavPurpleTokens,
      iconNavPurpleTools,
    };
  },
});
</script>
