import { createLocalVue, mount } from "@vue/test-utils";
import VueCompositionApi from "@vue/composition-api";
import ModalReportError from "../../../src/components/ModalReportError.vue";
import i18n from "../../../src/i18n";
import VueI18n from "vue-i18n";

describe("ModalReportError.Vue", (): void => {
    const localVue = createLocalVue();
    localVue.use(VueCompositionApi);
    localVue.use(VueI18n);

    Object.defineProperty(navigator, "userAgent", {
        get() {
            return "Mozilla/5.0 (Windows NT 6.2) AppleWebKit/536.6 (KHTML, like Gecko) Chrome/20.0.1090.0 Safari/536.6";
        }
    });

    it("renders closed", (): void => {
        expect.assertions(1);

        const onChange = jest.fn();
        const wrapper = mount(ModalReportError, {
            localVue,
            i18n,
            propsData: { isOpen: false },
            listeners: { change: onChange }
        });

        expect(wrapper).toMatchInlineSnapshot("");
    });

    it("renders open", (): void => {
        expect.assertions(1);

        const onChange = jest.fn();
        const wrapper = mount(ModalReportError, {
            localVue,
            i18n,
            propsData: { isOpen: false },
            listeners: { change: onChange }
        });

        expect(wrapper).toMatchInlineSnapshot("");
    });
});
