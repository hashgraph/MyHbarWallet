<template>
    <div class="verify-phrase">
        <Modal
            title="Verification"
            :is-open="state.isOpen"
            @change="handleModalChangeIsOpen"
        >
            <div class="prompt">
                Please enter and fill out the empty boxes below to verify your
                mnemonic phrase key.
            </div>
            <div class="mnemonic">
                <label v-for="index in state.words.length" :key="index">
                    <span class="number">{{ index }}.</span>
                    <TextInput
                        :disabled="emptyIndexes.contains(index)"
                        :value="state.words[index - 1]"
                    />
                </label>
            </div>

            <Button label="Verify" />
        </Modal>
    </div>
</template>

<script lang="ts">
import { createComponent, PropType, value, watch } from "vue-function-api";
import Modal from "./Modal.vue";
import Button from "@/components/Button.vue";

export interface State {
    isOpen: boolean;
    words: string[];
}

interface Props {
    state: State;
}

export default createComponent({
    components: {
        Modal,
        Button
    },
    model: {
        prop: "state",
        event: "change"
    },
    props: {
        state: (Object as unknown) as PropType<State>
    },
    setup(props: Props, context) {
        const emptyIndexes = value([]);

        // watch(
        //     () => props.data.words.length
        //     value => {
        //         // TODO: get 5 random numbers between 0 and value
        //         console.log(value);
        //     }
        // );

        function handleModalChangeIsOpen(isOpen: boolean): void {
            context.emit("change", { ...props.state, modalIsOpen: isOpen });
        }

        return {
            emptyIndexes,
            handleModalChangeIsOpen
        };
    }
});
</script>
