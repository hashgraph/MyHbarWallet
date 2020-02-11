import { createLocalVue, mount } from "@vue/test-utils";
import Alerts from "../../../src/components/Alerts.vue";
import VueCompositionApi from "@vue/composition-api";
import i18n from "../../../src/i18n";
import VueI18n from "vue-i18n";

describe("Alerts.vue", (): void => {
    const localVue = createLocalVue();
    localVue.use(VueCompositionApi);
    localVue.use(VueI18n);

    it("renders", (): void => {
        expect.assertions(1);

        const wrapper = mount(Alerts, {
            localVue,
            i18n
        });

        expect(wrapper).toMatchInlineSnapshot("<div class=\"alerts\"></div>");
    });
});
