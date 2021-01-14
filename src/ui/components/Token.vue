<template>
    <div class="token">
        <div class="info">
            <div class="title">
                <span class="id">{{ token.tokenId }}</span>
            </div>
        </div>
        <div class="balance">
            <span>{{ formatTokenBalance(token.balance, token.decimals) }}</span>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "@vue/composition-api";

import { Token } from "../../domain/token";
import { formatTokenBalance } from "../../service/format";

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
        return { formatTokenBalance };
    }
});
</script>

<style lang="postcss" scoped>
.token {
    align-items: center;
    border-bottom: 1px solid var(--color-jupiter);
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
}

.symbol {
    border: 1px solid var(--color-melbourne-cup);
    border-radius: 50px;
    padding: 5px;
    margin-inline-end: 10px;
}

.id {
}

.balance {
    display: flex;
    flex-direction: column;
}
</style>
