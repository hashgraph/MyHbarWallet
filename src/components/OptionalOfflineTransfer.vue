<template>
    <div class="offline-container">
        <div class="header">
            <div class="text">
                <!-- {{ $t("common.offline") }} -->
                Offline
            </div>
            <div class="offline-switch">
                <div class="text">
                    <!-- {{ $t("common.optional") }} -->
                    Optional
                </div>
                <SwitchButton
                    :value="show"
                    class="btn"
                    @change="handleSwitch"
                />
            </div>
        </div>
        <div class="offline-input" :class="{ expanded: show && value !== '' }">
            <ReadOnlyInput :value="value.toString('hex')" multiline />
        </div>
    </div>
</template>

<script lang="ts">
import { createComponent, SetupContext, PropType } from "@vue/composition-api";
import ReadOnlyInput from "../components/ReadOnlyInput.vue";
import SwitchButton from "../components/SwitchButton.vue";

interface Props {
    value: string | null;
    show: boolean;
}

interface Component {
    handleSwitch: () => void;
}

export default createComponent({
    components: {
        ReadOnlyInput,
        SwitchButton
    },
    model: {
        prop: "value",
        event: "input"
    },
    props: {
        value: (String as unknown) as PropType<string>,
        show: (Boolean as unknown) as PropType<boolean>
    },
    setup(props: Props, context: SetupContext): Component {
        function handleSwitch(): void {
            context.emit("offline", !props.show);
        }

        return { handleSwitch };
    }
});
</script>

<style scoped lang="postcss">
.offline-container {
    border-bottom: 2px solid var(--color-peral);
    border-top: 2px solid var(--color-peral);
    margin-block-end: 20px;
    padding: 20px 0;
}

.offline-switch {
    align-items: center;
    align-self: flex-end;
    display: flex;

    & > .text {
        color: var(--color-melbourne-cup);
        font-size: 16px;
        margin-inline-end: 13px;
    }
}

.offline-container > .header {
    align-items: center;
    display: flex;
    flex-grow: 0;
    justify-content: space-between;
    padding: 0 10px;
    width: 100%;

    & > .text {
        color: var(--color-washed-black);
        font-size: 16px;
        font-weight: 600;
    }
}

.offline-input {
    padding-inline: 10px;
    transition: max-height 0.3s ease, padding-block-start 0.3s ease;

    @media screen and (prefers-reduced-motion: reduce) {
        transition: none;
    }
}

.offline-input:not(.expanded) {
    max-height: 0;
    opacity: 0;
    padding-block-start: 0;
}

.offline-input.expanded {
    max-height: 800px;
    opacity: 1;
    padding-block-start: 30px;
}
</style>
