<template>
    <div class="tokens">
        <div
            v-if="hasTokens"
            class="token-list"
        >
            <template v-for="token in tokens">
                <TokenDisplay
                    :key="token.tokenId.toString()"
                    class="token"
                    :token="token"
                />
            </template>
        </div>
        <div
            v-else
            class="empty"
        >
            <Notice :symbol="mdiHelpCircleOutline">
                {{ $t("interfaceTokenBalances.noTokens") }}
            </Notice>
        </div>
    </div>
</template>

<script lang="ts">
import { computed, defineComponent, PropType } from "@vue/composition-api";
import { mdiHelpCircleOutline } from "@mdi/js";

import { Token } from "../../domain/token";

import Notice from "./Notice.vue";
import TokenDisplay from "./Token.vue";

export default defineComponent({
    name: "Tokens",
    components: { Notice, TokenDisplay },
    props: {
        tokens: {
            type: Array as PropType<Token[]>,
            required: true
        }
    },
    setup(props) {
        const hasTokens = computed(() => {
            if (props.tokens != null) return props.tokens.length > 0;
            return false;
        });

        return { hasTokens, mdiHelpCircleOutline };
    }
});
</script>

<style lang="postcss" scoped>
    .tokens {
        align-items: center;
        display: flex;
        justify-content: center;
        width: 100%;
    }

    .token {
        margin-block-end: 5px;
    }

    .token-list {
        align-items: center;
        display: flex;
        flex-direction: column;
        width: 100%;
    }

    .empty {
        width: 100%;
    }
</style>
