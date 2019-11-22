<template>
  <label
    class="switch-button"
    :class="{ 'has-values': values != null }"
  >
    <input
      :checked="isChecked"
      class="input"
      type="checkbox"
      @change="handleChange"
    >
    <span class="thumb" />
    <template v-if="values">
      <span class="leading">{{ values[0] }}</span>
      <span class="trailing">{{ values[1] }}</span>
    </template>
  </label>
</template>

<script lang="ts">
import { computed, createComponent } from "@vue/composition-api";
import { PropType } from "@vue/composition-api/dist/ts-api";

interface Props {
    checked: boolean | string | number;
    values: string[] | null;
}

export default createComponent({
    model: {
        prop: "checked",
        event: "change"
    },
    props: {
        checked: ([ Boolean, String, Number ] as unknown) as PropType<
        boolean | string | number
        >,
        values: (Array as unknown) as PropType<string[]>
    },
    setup(props: Props, context) {
        const isChecked = computed(() => {
            if (props.values == null) {
                return props.checked;
            }

            return props.checked === props.values[ 1 ];
        });

        function handleChange(event: Event): void {
            const checked = (event.target as HTMLInputElement).checked;

            if (props.values == null) {
                context.emit("change", checked);
            } else {
                context.emit(
                    "change",
                    checked ? props.values[ 1 ] : props.values[ 0 ]
                );
            }
        }

        return {
            isChecked,
            handleChange
        };
    }
});
</script>

<style scoped lang="postcss">
.switch-button {
    display: flex;
    height: 28px;
    position: relative;
    width: 52px;
}

.input {
    visibility: hidden;
}

.thumb {
    background-color: var(--color-jupiter);
    border-radius: 34px;
    cursor: pointer;
    inset: 0;
    position: absolute;

    /* Animating background-color to match MEW */
    /* stylelint-disable-next-line plugin/no-low-performance-animation-properties */
    transition: background-color 0.4s ease;

    &::before {
        background-color: var(--color-white);
        border-radius: 100%;
        content: "";
        height: 22px;
        inset-block-end: 3px;
        inset-inline-start: 3px;
        padding: 1px 7px;
        position: absolute;
        transition: transform 0.4s ease;
        width: 23px;

        @media screen and (prefers-reduced-motion) {
            transition: none;
        }
    }

    @media screen and (prefers-reduced-motion) {
        transition: none;
    }
}

.switch-button.has-values .thumb::before {
    background-color: var(--color-melbourne-cup);
}

.switch-button:not(.has-values) input:checked + .thumb {
    background-color: var(--color-melbourne-cup);
}

[dir="ltr"] input:checked + .thumb::before {
    transform: translateX(23px);
}

[dir="rtl"] input:checked + .thumb::before {
    transform: translateX(-23px);
}

.leading,
.trailing {
    color: var(--color-basalt-grey);
    font-size: 11px;
    inset-block-start: 6px;
    pointer-events: none;
    position: absolute;

    /* Animating color to match MEW */
    /* stylelint-disable-next-line plugin/no-low-performance-animation-properties */
    transition: color 0.4s ease;
    user-select: none;
}

.leading {
    inset-inline-start: 9.5px;
}

input:not(:checked) ~ .leading {
    color: var(--color-white);
}

.trailing {
    inset-inline-end: 7.5px;
}

input:checked ~ .trailing {
    color: var(--color-white);
}
</style>
