<template>
    <InterfaceForm :title="$t('interfaceTokenBalances.title')">
        <Tokens :tokens="tokens" />
        <template v-slot:footer>
            <Button
                class="refresh"
                :label="$t('interfaceTokenBalances.refresh')"
                @click="handleRefresh"
            />
        </template>
    </InterfaceForm>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted } from "@vue/composition-api";

import Button from "../components/Button.vue";
import InterfaceForm from "../components/InterfaceForm.vue";
import Tokens from "../components/Tokens.vue";
import { actions, getters } from "../store";

function handleRefresh(): void {
    void actions.refreshBalancesAndRate();
}

export default defineComponent({
    name: "InterfaceTokenBalances",
    components: { Button, InterfaceForm, Tokens },
    setup() {
        onMounted(async() => {
            if (getters.currentUserTokens() == null) {
                await actions.refreshBalancesAndRate();
            }
        });

        const tokens = computed(() => getters.currentUserTokens());

        return { tokens, handleRefresh };
    }
});
</script>
