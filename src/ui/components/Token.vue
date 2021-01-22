<template>
    <div class="token">
        <div class="info">
            <div class="title">
                <span class="id">{{ token.tokenId }}</span>
            </div>
        </div>
        <div class="balance">
            <InfoButton
                v-if="balanceIsNaN"
                class="warning"
                :message="$t('token.couldNotCalculateBalance')"
            />
            <span v-else>{{ formattedBalance }}</span>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, PropType, computed } from "@vue/composition-api";

import { Token } from "../../domain/token";
import { formatTokenBalance } from "../../service/format";

import MaterialDesignIcon from "./MaterialDesignIcon.vue";
import InfoButton from "./InfoButton.vue";

export default defineComponent({
    name: "Token",
    components: { MaterialDesignIcon, InfoButton },
    props: {
        token: {
            type: Object as PropType<Token>,
            required: true
        }
    },
    setup(props) {
        const formattedBalance = computed(() => formatTokenBalance(
            props.token.balance.toNumber(),
            props.token.decimals
        ));

        const balanceIsNaN = computed(() => formattedBalance.value === "NaN");

        return { formattedBalance, balanceIsNaN };
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

.balance {
    align-items: center;
    display: flex;
    justify-content: space-between;
}

.warning {
    padding-inline-start: 5px;
}
</style>
