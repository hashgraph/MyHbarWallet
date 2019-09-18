<template>
    <div class="network">
        <img :src="hedera" />
        <div class="content">
            <div class="top">
                <div class="title">
                    {{ $t("networkCard.network") }}
                </div>
                <div class="subtitle">
                    {{ networkName }}
                </div>
                <div class="subtitle">
                    {{ networkAddress }}
                </div>
            </div>
            <div class="actions">
                <Tooltip
                    :pinnable="false"
                    :message="$t('networkCard.changeNetwork')"
                >
                    <button v-if="false" class="change">
                        {{ $t("common.change") }}
                    </button>
                </Tooltip>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import Tooltip from "./Tooltip.vue";
import { createComponent } from "@vue/composition-api";
import hedera from "../assets/icon-hedera-outline.svg";
import settings from "../settings";

export default createComponent({
    components: {
        Tooltip
    },
    setup() {
        return {
            hedera,
            networkName: settings.network.name,
            networkAddress: settings.network.address
        };
    }
});
</script>

<style scoped lang="postcss">
.network {
    background-color: var(--color-lynx-screen-blue);
    border-radius: 4px;
    color: var(--color-white);
    display: flex;
    padding: 25px;

    @media (max-width: 1024px) {
        padding: 20px;
    }
}

img {
    align-self: flex-start;
    flex-shrink: 0;
    margin-block-start: 10px;
    margin-inline-end: 25px;
    user-select: none;
    width: 60px;

    @media (max-width: 1024px) {
        display: none;
    }
}

.title {
    font-size: 22px;
    font-weight: 500;
    user-select: none;

    @media (max-width: 1024px) {
        margin-block-end: 15px;
    }
}

.subtitle {
    font-size: 14px;
    user-select: none;

    @media (min-width: 1025px) {
        & + .subtitle {
            margin-block-end: 12px;
            opacity: 0.5;
        }
    }
}

.change {
    border: 1px solid white;
    border-radius: 4px;
    color: var(--color-white);
    cursor: pointer;
    font-size: 12px;
    font-weight: 500;
    outline: none;
    padding: 4px 8px;
    user-select: none;
}

.content {
    display: flex;
    flex-direction: column;
    flex-grow: 1;
    justify-content: space-between;

    @media (max-width: 1024px) {
        flex-direction: row;
    }
}

.actions {
    align-items: center;
    display: flex;
}
</style>
