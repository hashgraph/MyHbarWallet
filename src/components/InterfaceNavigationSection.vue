<template>
    <div class="nav-section">
        <div class="nav-section-header" @click="handleHeaderClick">
            <img alt :src="isSectionActive ? imageActive : image" />
            <span class="nav-title">{{ title }}</span>
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
import { createComponent, PropType, computed } from "vue-function-api";
import MaterialDesignIcon from "@/components/MaterialDesignIcon.vue";
import { mdiChevronDown, mdiChevronUp } from "@mdi/js";
import store from "@/store";
import { SET_INTERFACE_MENU_IS_OPEN } from "@/store/mutations";

interface InterfaceNavigationItem {
    name: string;
    label: string;
}

interface Props {
    image: string;
    imageActive: string;
    title: string;
    routes: InterfaceNavigationItem[];
}

export default createComponent({
    components: {
        MaterialDesignIcon
    },
    props: {
        image: (String as unknown) as PropType<string>,
        imageActive: (String as unknown) as PropType<string>,
        title: (String as unknown) as PropType<string>,
        routes: (Array as unknown) as PropType<InterfaceNavigationItem[]>
    },
    watch: {},
    setup(props: Props, context) {
        const isSectionActive = computed(() =>
            props.routes.some(route => route.name === context.root.$route.name)
        );

        function handleHeaderClick() {
            const firstRoute = props.routes[0];

            // If the first route is active, do nothing
            if (firstRoute.name === context.root.$route.name) {
                return;
            }

            context.root.$router.push({ name: firstRoute.name });
        }

        function handleClick() {
            store.commit(SET_INTERFACE_MENU_IS_OPEN, false);
        }

        return {
            isSectionActive,
            mdiChevronUp,
            mdiChevronDown,
            handleHeaderClick,
            handleClick
        };
    }
});
</script>

<style lang="postcss" scoped>
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
    flex-grow: 1;
    font-size: 16px;
    font-weight: 500;
    margin-inline-start: 10px;
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
