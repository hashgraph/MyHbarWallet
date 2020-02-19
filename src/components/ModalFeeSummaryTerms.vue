<template>
    <div class="modal-fee-summary-terms">
        <div class="term">
            Operator
            &nbsp;
            <InfoButton :message="$t('modalFeeSummary.whatIsOperator')" />
        </div>
    </div>
</template>
<script lang="ts">
import { createComponent } from "@vue/composition-api";
import InfoButton from "./InfoButton.vue";

export default createComponent({
    components: { InfoButton },
    setup() {
        return {};
    }
});
</script>
<style scoped lang="postcss">
.modal-fee-summary-terms {
    align-items: center;
    background-color: var(--color-sheer-peach);
    border: 1px solid var (--color-sheer-peach);
    border-radius: 5px;
    display: flex;
    flex-direction: column;
    padding: 10px;
}

.term {
    text-align: center;
    width: 100%;
}
</style>
