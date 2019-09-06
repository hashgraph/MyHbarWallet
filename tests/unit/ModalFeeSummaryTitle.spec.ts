import { mount, createLocalVue } from "@vue/test-utils";
import ModalFeeSummaryTitle from "../../src/components/ModalFeeSummaryTitle.vue";
import VueCompositionApi from "@vue/composition-api";

describe("ModalFeeSummaryTitle.vue", (): void => {
    const localVue = createLocalVue();
    localVue.use(VueCompositionApi);

    it("renders for transfer", (): void => {
        expect.assertions(1);

        const wrapper = mount(ModalFeeSummaryTitle, {
            localVue,
            propsData: {
                amount: "999999999",
                account: "0.0.1",
                type: "transfer"
            }
        });

        expect(wrapper).toMatchInlineSnapshot();
    });

    it("renders for create account", (): void => {
        expect.assertions(1);

        const wrapper = mount(ModalFeeSummaryTitle, {
            localVue,
            propsData: {
                amount: "999999999",
                account: "",
                type: "createAccount"
            }
        });

        expect(wrapper).toMatchInlineSnapshot();
    });
});
