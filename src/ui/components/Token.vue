<template>
    <div class="token">
        <div class="info">
            <div class="title">
                <span class="symbol">{{ token.symbol }}</span>
                <span class="id">{{ token.tokenId }}</span>
            </div>
            <div class="statuses">
                <Tooltip
                    v-if="!token.kycStatus"
                    :message="$t('token.requiresKYC')"
                >
                    <MaterialDesignIcon
                        class="icon"
                        :icon="mdiAccountLock"
                    />
                </Tooltip>
                <Tooltip
                    v-if="token.freezeStatus"
                    :message="$t('token.frozen')"
                >
                    <MaterialDesignIcon
                        class="icon"
                        :icon="mdiExclamation"
                    />
                </Tooltip>
            </div>
        </div>
        <div class="balance">
            <span>{{ formatNumber(token.balance) }}</span>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "@vue/composition-api";
import { mdiAccountLock, mdiExclamation } from "@mdi/js";

import { Token } from "../../domain/token";
import { formatNumber } from "../../service/format";

import MaterialDesignIcon from "./MaterialDesignIcon.vue";
import Tooltip from "./Tooltip.vue";

export default defineComponent({
    name: "Token",
    components: { MaterialDesignIcon, Tooltip },
    props: {
        token: {
            type: Object as PropType<Token>,
            required: true
        }
    },
    setup() {
        return {
            formatNumber,
            mdiAccountLock,
            mdiExclamation
        };
    }
});
</script>

<style lang="postcss" scoped>
.token {
    align-items: center;
    border: 1px solid var(--color-ashen-wind);
    border-radius: 5px;
    display: flex;
    justify-content: space-between;
    padding-block: 10px;
    padding-inline: 5px;
    width: 100%;
}

.head {
    align-self: flex-start;
    padding-block-end: 5px;
    font-weight: 600;
}

.symbol {
    border: 1px solid var(--color-melbourne-cup);
    border-radius: 50px;
    padding: 5px;
    margin-inline-end: 10px;
}

.id {
    font-style: italic;
}

.balance {
    display: flex;
    flex-direction: column;
    font-weight: 600;
}
</style>
