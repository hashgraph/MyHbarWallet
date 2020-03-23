import Vue from "vue";

Vue.directive("scroll", {
    inserted(el, binding): void {
        window.addEventListener("scroll", binding.value, { passive: true });
    },
    unbind(el, binding): void {
        window.removeEventListener("scroll", binding.value);
    }
});
