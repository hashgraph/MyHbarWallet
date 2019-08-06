<template>
    <div class="nav-section">
        <div class="nav-section-header" @click="handleHeaderClick">
            <img alt="" :src="isSectionActive ? imageActive : image" />
            <span class="nav-title">{{ title }}</span>
            <MaterialDesignIcon :icon="icon" class="indicator" />
        </div>
        <template v-if="isSectionActive">
            <router-link
                v-for="item in routes"
                :key="item.route"
                class="nav-item"
                :to="{ name: item.name }"
            >
                {{ item.label }}
            </router-link>
        </template>
    </div>
</template>

<script lang="ts">
import Vue, { PropOptions } from "vue";
import MaterialDesignIcon from "@/components/MaterialDesignIcon.vue";
import { mdiChevronDown, mdiChevronUp } from "@mdi/js";

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

export default Vue.extend<{}, {}, {}, Props>({
    components: {
        MaterialDesignIcon
    },
    props: {
        image: { type: String, required: true },
        imageActive: { type: String, required: true },
        title: { type: String, required: true },
        routes: {
            type: Array,
            required: true
        } as PropOptions<InterfaceNavigationItem[]>
    },
    computed: {
        isSectionActive(): boolean {
            return this.routes.some(route => route.name === this.$route.name);
        },
        icon(): string {
            return this.isSectionActive ? mdiChevronUp : mdiChevronDown;
        }
    },
    methods: {
        handleHeaderClick() {
            const firstRoute = this.routes[0];

            // If the first route is active, do nothing
            if (firstRoute.name === this.$route.name) {
                return;
            }

            this.$router.push({ name: firstRoute.name });
        }
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
    color: #c7c7c7;
}

.nav-item {
    color: #c7c7c7;
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
