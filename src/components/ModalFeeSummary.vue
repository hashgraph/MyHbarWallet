<template>
    <div class="modal-fee-summary">
        <Modal
            :is-open="isOpen"
            title="Transaction Summary"
            not-closable
            @change="this.$listeners.change"
        >
            <div class="summary-title">
                {{ title }}
            </div>

            <div class="separator" />

            <div class="summary">
                <template v-for="item in items">
                    <span :key="item.description" class="item-description">
                        {{ item.description }}:
                    </span>
                    <span
                        v-if="item.value instanceof BigNumber"
                        :key="item.value.toString()"
                        class="item-value"
                        >{{
                            formatter.format(item.value).split("$")[1]
                        }}
                        ℏ</span
                    >
                    <span v-else :key="item.value" class="item-value">
                        {{ item.value }}
                    </span>
                </template>

                <strong><span class="item-description">Total:</span></strong>
                <span class="item-value"
                    >{{ formatter.format(total).split("$")[1] }} ℏ</span
                >
            </div>

            <div class="buttons">
                <Button
                    compact
                    outline
                    label="Cancel"
                    class="button"
                    type="button"
                    @click="handleCancel"
                />
                <Button
                    compact
                    label="Continue"
                    class="button"
                    type="submit"
                    @submit="handleSubmit"
                    @click="handleSubmit"
                />
            </div>
        </Modal>
    </div>
</template>

<script lang="ts">
import {
    computed,
    createComponent,
    PropType,
    SetupContext
} from "@vue/composition-api";
import Modal from "../components/Modal.vue";
import BigNumber from "bignumber.js";
import Button from "../components/Button.vue";

export interface Item {
    description: string;
    value: BigNumber | string;
}

// TODO: Extract this into it's own file because it's used in more than one place
// here and BalanceCard.vue
const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD"
});

export default createComponent({
    components: {
        Modal,
        Button
    },
    model: {
        prop: "isOpen",
        event: "change"
    },
    props: {
        isOpen: (Boolean as unknown) as PropType<boolean>,
        items: (Array as unknown) as PropType<Item[]>,
        title: (String as unknown) as PropType<string>
    },
    setup(
        props: { isOpen: boolean; items: Item[] },
        context: SetupContext
    ): object {
        // Compute the total
        const total = computed(() => {
            let total = new BigNumber(0);

            // Only add to total if value is a BigNumber
            for (const item of props.items) {
                if (item.value instanceof BigNumber) {
                    total = total.plus(item.value);
                }
            }

            return total;
        });

        function handleCancel() {
            context.emit("change", false);
        }

        function handleSubmit() {
            context.emit("change", false);
            context.emit("submit");
        }

        return {
            total,
            formatter,
            BigNumber,
            handleCancel,
            handleSubmit
        };
    }
});
</script>

<style lang="postcss" scoped>
.summary-title {
    color: var(--color-washed-black);
    font-size: 18px;
}

.summary {
    display: grid;
    grid-template-columns: 1fr 1fr;
    width: 100%;
}

.item-description {
    color: var(--color-washed-black);
    font-weight: 500;
}

.item-value {
    color: var(--color-china-blue);
}

.buttons {
    display: flex;
    justify-content: space-between;
    margin-block-start: 40px;
    width: 100%;

    @media (max-width: 425px) {
        align-items: center;
        flex-direction: column-reverse;
    }
}

.button {
    width: 200px;

    @media (max-width: 425px) {
        width: 100%;

        &:last-child {
            margin-block-end: 15px;
        }
    }
}

.separator {
    background-color: var(--color-basalt-grey);
    height: 1px;
    margin-block: 17.5px;
    width: 100%;
}
</style>
