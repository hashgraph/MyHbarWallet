<template>
    <div class="nav-section">
        <div class="nav-section-header" @click="handleHeaderClick">
            <material-design-icon
                alt
                class="icon"
                :class="isSectionActive"
                :icon="icon"
            />
            <span class="nav-title" :class="isSectionActive">{{ title }}</span>
            <transition name="fade" mode="out-in">
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
                class="nav-item"
                :to="{ name: item.name }"
                @click.native="handleClick"
                >{{ item.label }}</router-link
            >
        </template>
    </div>
</template>

<script lang="ts">
import {
    createComponent,
    PropType,
    computed,
    SetupContext
} from "@vue/composition-api";
import MaterialDesignIcon from "../components/MaterialDesignIcon.vue";
import { mdiChevronDown, mdiChevronUp } from "@mdi/js";
import { mutations } from "../store";

interface InterfaceNavigationItem {
    name: string;
    label: string;
}

interface Props {
    icon: string;
    title: string;
    routes: InterfaceNavigationItem[];
}

// Yes, it is used
// eslint-disable-next-line @typescript-eslint/no-unused-vars
function handleClick(): void {
    mutations.SET_INTERFACE_MENU_IS_OPEN(false);
}

export default createComponent({
    components: {
        MaterialDesignIcon
    },
    props: {
        icon: (String as unknown) as PropType<string>,
        title: (String as unknown) as PropType<string>,
        routes: (Array as unknown) as PropType<InterfaceNavigationItem[]>
    },
    watch: {},
    setup(props: Props, context: SetupContext) {
        const isSectionActive = computed(() => {
            if (
                props.routes.some(
                    route =>
                        route.name ===
                        (context.root.$route == undefined
                            ? null
                            : context.root.$route.name)
                )
            ) {
                return "active";
            }
        });

        function handleHeaderClick(): void {
            const firstRoute = props.routes[0];

            // If the first route is active, do nothing
            if (
                firstRoute.name ===
                (context.root.$route == undefined
                    ? null
                    : context.root.$route.name)
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
