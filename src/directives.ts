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
    el.setAttribute("data-has-remove-listener", "false");

    const addTooltip = () => {
        document.body.appendChild(el.tooltip);
        Vue.nextTick(() => {
            new Popper(el, el.tooltip);
        });
        el.instance.visible = true;
    };

    const hideTooltip = () => {
        el.instance.visible = false;
    };

    const removeTooltip = () => {
        if (!el.instance.visible) {
            document.body.removeChild(el.tooltip);
        }
    };

    // I can't believe I've done this
    const toggleHideTooltipEvent = () => {
        if (el.getAttribute("data-has-remove-listener") === "false") {
            el.addEventListener("mouseleave", hideTooltip, false);
            el.setAttribute("data-has-remove-listener", "true");
        } else {
            el.removeEventListener("mouseleave", hideTooltip, false);
            el.setAttribute("data-has-remove-listener", "false");
        }
    };

    el.addEventListener("mouseenter", addTooltip, false);
    el.addEventListener("mouseleave", hideTooltip, false);
    el.setAttribute("data-has-remove-listener", "true");
    el.addEventListener("click", toggleHideTooltipEvent, false);
    el.tooltip.addEventListener("transitioned", removeTooltip, false);
};


Vue.directive("scroll", {
    inserted(el, binding) {
        window.addEventListener("scroll", binding.value);
    },
    unbind(el, binding) {
        window.removeEventListener("scroll", binding.value);
    }
});
