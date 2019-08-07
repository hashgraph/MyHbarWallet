import Vue, { VNode } from "vue";
import Tooltip from "@/components/Tooltip.vue";
import Popper from "popper.js";
import { DirectiveBinding } from "vue/types/options";

const Tooltip_ = Vue.extend(Tooltip);
Vue.directive("tooltip",
    {
        bind: function(el: HTMLElement, binding : DirectiveBinding, node : VNode) {
            const title = el.getAttribute("title");
            el.setAttribute("title", "");

            const tooltip = new Tooltip_({
                el: document.createElement("div"),
                data: {
                    text: title
                }
            });

            el.instance = tooltip;
            el.tooltip = tooltip.$el;
            addTooltipEvents(el, node);
        },
        unbind: function(el: HTMLElement) {
            if (el.domInserted) {
                if (el.tooltip && el.tooltip.parentNode) {
                    el.tooltip.parentNode.removeChild(el.tooltip);
                }
            }
            el.instance.$destroy();
        }
    }
);

const addTooltipEvents = (el: HTMLElement) => {
    const addTooltip = () => {
        document.body.appendChild(el.tooltip);
        Vue.nextTick(() => {
            new Popper(el, el.tooltip);
        });
        el.instance.visible = true;
        el.addEventListener("mouseleave", hideTooltip, false);
    };

    const hideTooltip = () => {
        el.instance.visible = false;
    };

    const removeRemoveToolTipEvent = () => {
        el.removeEventListener("mouseleave", hideTooltip, false);
    };

    el.addEventListener("mouseenter", addTooltip, false);
    el.addEventListener("click", removeRemoveToolTipEvent, false);
    document.addEventListener("click", hideTooltip, false);
};


Vue.directive("scroll", {
    inserted(el, binding) {
        window.addEventListener("scroll", binding.value);
    },
    unbind(el, binding) {
        window.removeEventListener("scroll", binding.value);
    }
});
