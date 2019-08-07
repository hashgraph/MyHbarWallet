import Vue from "vue";
import Tooltip from "@/components/Tooltip.vue";
import Popper from "popper.js";

const Tooltip_ = Vue.extend(Tooltip);
Vue.directive("tooltip",
    {
        bind: function(el: HTMLElement) {
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
            addTooltipEvents(el);
        }
        ,
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
            new Popper(el, el.tooltip, { placement: "right" });
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

    // Need to compose these to be:
    // On click: activate, On click again: deactivate
    // On hover: activate, On unhover: deactivate
    // "toggleTooltip" for click? with maintained active state on tooltip.vue?
    // listen for changes in element vm? i.e $vm.$data.active?
    el.addEventListener("mouseenter", addTooltip, false);
    el.addEventListener("mouseleave", hideTooltip, false);
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
