<template>
    <div class="modal-fee-summary-terms">
        <div
            v-if="props.state.operator != null && props.state.operator !== ''"
            class="term"
        >
            <span class="description">Operator
                <InfoButton :message="$t('modalFeeSummary.whatIsOperator')" />
            </span>
            <span class="value">{{ props.state.operator }}</span>
        </div>
        <div
            v-if="props.state.sender != null && props.state.sender !== ''"
            class="term"
        >
            <span class="description">Sender</span>
            <span class="value">{{ props.state.sender }}</span>
        </div>
        <div
            v-if="props.state.receiver != null && props.state.receiver !== ''"
            class="term"
        >
            <span class="description">Receiver</span>
            <span class="value">{{ props.state.receiver }}</span>
        </div>
    </div>
</template>
<script lang="ts">
import { defineComponent, PropType } from "@vue/composition-api";

import InfoButton from "./InfoButton.vue";

export interface State {
    operator?: string | undefined;
    sender?: string | undefined;
    receiver?: string | undefined;
}

export default defineComponent({
    props: { state: Object as PropType<State> },
    components: { InfoButton },
    setup(props) {
        return { props };
    }
});
</script>
<style scoped lang="postcss">
.modal-fee-summary-terms {
    align-items: center;
    display: flex;
    flex-direction: column;
    font-family: "Inconsolata", monospace;
}

.term {
    align-items: center;
    display: flex;
    justify-content: space-between;
    margin-block-end: 5px;
    width: 100%;
}

.description {
    color: var(--color-washed-black);
    flex-grow: 1;
    font-weight: 500;
}

.value {
    color: var(--color-china-blue);
    font-size: 16px;
    font-weight: 600;
    height: 14px;
    padding: 0;
    text-align: end;
    white-space: pre;
}
</style>
