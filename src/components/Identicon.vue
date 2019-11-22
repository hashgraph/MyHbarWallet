<template>
  <!-- eslint-disable vue/no-v-html -->
  <svg
    v-bind="svg.attributes"
    v-html="svg.content"
  />
</template>

<script lang="ts">
import { createComponent, computed, PropType } from "@vue/composition-api";

// Must turn off observe setting BEFORE importing this module.. someone shoot me
((window as unknown) as { jdenticon_config: { replaceMode: string } })[
    "jdenticon_config"
] = { replaceMode: "never" };

// using require is needed for this "hack" to work
// eslint-disable-next-line @typescript-eslint/no-var-requires, @typescript-eslint/no-require-imports, no-undef
const jdenticon = require("jdenticon");

interface Props {
    size: number;
    value: string;
}

export default createComponent({
    props: {
        size: (Number as unknown) as PropType<number>,
        value: (String as unknown) as PropType<string>
    },
    setup(props: Props) {
        // HACK: Vue does not allow us to return _unwrapped_ raw HTML so we have to manually decompose the generated SVG
        //       and apply its attributes and raw HTML children to the Vue node.
        const svg = computed(() => {
            const svgText = jdenticon.toSvg(props.value, props.size);
            const parser = new DOMParser();
            const svgDoc = parser.parseFromString(svgText, "text/html");
            const svgEl = svgDoc.querySelector("svg");

            if (svgEl == null) {
                throw new Error("something went wrong with jdenticon");
            }

            const attributes: { [key: string]: string | null } = {};

            // in this case the for loop is actually the best option
            // eslint-disable-next-line @typescript-eslint/prefer-for-of
            for (let i = 0; i < svgEl.attributes.length; i += 1) {
                const attr = svgEl.attributes[ i ];
                attributes[ attr.nodeName ] = attr.nodeValue;
            }

            const content = svgEl.innerHTML;

            return {
                attributes,
                content
            };
        });

        return { svg };
    }
});
</script>

<style lang="postcss" scoped>
svg {
    background: var(--color-white);
    box-shadow: 0 0 6px 3px rgba(0, 0, 0, 0.4) inset;
}
</style>
