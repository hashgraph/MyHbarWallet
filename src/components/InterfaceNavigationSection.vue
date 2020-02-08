<template>
  <div class="nav-section">
    <div
      class="nav-section-header"
      @click="handleHeaderClick"
    >
      <material-design-icon
        :class="isSectionActive"
        :icon="icon"
        alt
        class="icon"
      />
      <span
        :class="isSectionActive"
        class="nav-title"
      >{{ title }}</span>
      <transition
        mode="out-in"
        name="fade"
      >
        <MaterialDesignIcon
          :key="isSectionActive"
          :icon="isSectionActive ? mdiChevronUp : mdiChevronDown"
          class="indicator"
        />
      </transition>
    </div>
    <template v-if="isSectionActive">
      <router-link
        v-for="item in routes"
        :key="item.route"
        :to="{ name: item.name }"
        class="nav-item"
        @click.native="handleClick"
      >
        {{ item.label }}
      </router-link>
    </template>
  </div>
</template>

<script lang="ts">
import { computed, createComponent, SetupContext } from "@vue/composition-api";
import { mdiChevronDown, mdiChevronUp } from "@mdi/js";

import { mutations } from "../store";
import MaterialDesignIcon from "../components/MaterialDesignIcon.vue";

interface InterfaceNavigationItem {
    name: string;
    label: string;
}

interface Props {
    icon: string;
    title: string;
    routes: InterfaceNavigationItem[];
}

function handleClick(): void {
    mutations.setInterfaceMenuIsOpen(false);
}

export default createComponent({
    name: "InterfaceNavigationSection",
    components: { MaterialDesignIcon },
    props: {
        icon: String,
        title: String,
        routes: Array
    },
    watch: {},
    setup(props: Props, context: SetupContext) {
        const isSectionActive = computed(() => {
            if (
                props.routes.some((route) => route.name ===
                        (context.root.$route == null ?
                            null :
                            context.root.$route.name))
            ) {
                return "active";
            }
            return null;
        });

        function handleHeaderClick(): void {
            const firstRoute = props.routes[ 0 ];

            // If the first route is active, do nothing
            if (
                firstRoute.name ===
                    (context.root.$route == null ?
                        null :
                        context.root.$route.name)
            ) {
                return;
            }

            context.root.$router.push({ name: firstRoute.name });
        }

        return {
            isSectionActive,
            mdiChevronUp,
            mdiChevronDown,
            handleClick,
            handleHeaderClick
        };
    }
});
</script>

<style lang="postcss" scoped>
    .icon {
        color: var(--color-silver-polish);

        &.active {
            color: var(--color-green-jelly);
        }
    }

    .nav-section {
        display: flex;
        flex-direction: column;
        margin-block-end: 40px;
    }

    .nav-section-header {
        align-items: center;
        cursor: pointer;
        display: flex;
        padding: 0 20px;
        user-select: none;
    }

    .nav-title {
        color: var(--color-silver-polish);
        flex-grow: 1;
        font-size: 16px;
        font-weight: 500;
        margin-inline-start: 10px;

        &.active {
            color: inherit;
        }
    }

    .indicator {
        color: var(--color-silver-polish);
    }

    .nav-item {
        color: var(--color-silver-polish);
        font-size: 14px;
        margin-block-start: 10px;
        padding-inline-start: 40px;
        text-decoration: none;
        user-select: none;

        &.router-link-exact-active {
            color: inherit;
        }
    }
</style>
