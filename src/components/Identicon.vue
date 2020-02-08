<template>
  <!-- eslint-disable vue/no-v-html -->
  <svg
    v-bind="svg.attributes"
    v-html="svg.content"
  />
</template>

<script lang="ts">
import { computed, createComponent } from "@vue/composition-api";

// Must turn off observe setting BEFORE importing this module.. someone shoot me
((window as unknown) as { jdenticon_config: { replaceMode: string } })[
    "jdenticon_config"
] = { replaceMode: "never" };
// eslint-disable-next-line @typescript-eslint/no-var-requires,@typescript-eslint/no-require-imports,no-undef
const jdenticon = require("jdenticon");

interface Props {
    size: number;
    value: string;
}

export default createComponent({
    name: "Identicon",
    props: {
        size: Number,
        value: String
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

            // eslint-disable-next-line @typescript-eslint/prefer-for-of,no-plusplus
            for (let i = 0; i < svgEl.attributes.length; i++) {
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
