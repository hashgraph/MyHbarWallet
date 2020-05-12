import { createLocalVue, mount } from "@vue/test-utils";
import VueCompositionApi from "@vue/composition-api";
import VueI18n from "vue-i18n";

import Alerts from "../../../src/ui/components/Alerts.vue";
import i18n from "../../../src/service/i18n";

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

        expect(wrapper).toMatchInlineSnapshot(
            `<transition-group-stub tag="div" name="list" class="alerts"></transition-group-stub>`
        );
    });
});
