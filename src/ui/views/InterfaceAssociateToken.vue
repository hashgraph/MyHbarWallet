<template>
    <InterfaceForm :title="$t('interfaceAssociateToken.title')">
        <IDInput
            ref="input"
            :error="state.errorMessage"
            :valid="state.valid"
            can-copy
            :label="$t('interfaceAssociateToken.tokenId')"
            show-validation
            @valid="handleValid"
            @input="handleAccount"
        />

        <template v-slot:footer>
            <Button
                :busy="state.busy"
                :label="$t('interfaceAssociateToken.associateToken')"
                @click="handleSubmit"
            />
        </template>
    </InterfaceForm>
</template>

<script lang="ts">
import type { Client, TokenId } from "@hashgraph/sdk";
import { defineComponent, reactive, Ref, ref } from "@vue/composition-api";

import { associateTokenWithAccount } from "../../service/hedera";
import Button from "../components/Button.vue";
import IDInput, { IdInputElement } from "../components/IDInput.vue";
import InterfaceForm from "../components/InterfaceForm.vue";
import { actions, getters } from "../store";

export default defineComponent({
    name: "InterfaceAssociateToken",
    components: { Button, IDInput, InterfaceForm },
    setup(_, context) {
        const input: Ref<IdInputElement | null> = ref(null);
        const state = reactive({
            tokenId: null as TokenId | null,
            valid: null as boolean | null,
            busy: null as boolean | null,
            errorMessage: null as string | null
        });

        function handleValid(valid: boolean): void {
            state.valid = valid;
        }

        function handleAccount(token: TokenId): void {
            state.valid = null;
            state.errorMessage = null;
            state.tokenId = token;
        }

        async function handleSubmit(): Promise<void> {
            state.busy = true;

            if (state.tokenId != null) {
                try {
                    await associateTokenWithAccount(
                        state.tokenId,
                        getters.currentUser().session.account,
                        getters.currentUser().session.client as Client
                    );

                    actions.alert({
                        message: context.root.$t("interfaceAssociateToken.tokenAssociated").toString(),
                        level: "success"
                    });

                    if (input.value != null) {
                        input.value.clear();
                    }
                } catch (error) {
                    const result = await actions.handleHederaError({ error, showAlert: false });
                    state.errorMessage = result.message;
                }
            }

            state.busy = false;
        }

        return { input, state, handleValid, handleAccount, handleSubmit };
    }
});
</script>

<style lang="postcss" scoped>
</style>
