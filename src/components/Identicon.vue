<template>
    <!-- eslint-disable vue/no-v-html -->
    <svg v-bind="svg.attributes" v-html="svg.content"></svg>
</template>

<script lang="ts">
import { createComponent, computed, PropType } from "vue-function-api";

// Must turn off observe setting BEFORE importing this module.. someone shoot me
// @ts-ignore
window["jdenticon_config"] = { replaceMode: "never" };
// eslint-disable-next-line @typescript-eslint/no-var-requires
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

            for (let i = 0; i < svgEl.attributes.length; i++) {
                const attr = svgEl.attributes[i];
                attributes[attr.nodeName] = attr.nodeValue;
            }

            const content = svgEl.innerHTML;

            return {
                attributes,
                content
            };
        });

        return {
            svg
        };
    }
});
</script>

<style lang="postcss" scoped>
svg {
    background: var(--color-white);
    box-shadow: 0 0 6px 3px rgba(0, 0, 0, 0.4) inset;
}
</style>
