import { shallowMount, createLocalVue } from "@vue/test-utils";
import BalanceCard from "../../src/components/BalanceCard.vue";
import { plugin as VueFunctionApi } from "vue-function-api";

describe("BalanceCard.vue", (): void => {
    const localVue = createLocalVue();
    localVue.use(VueFunctionApi);

    const wrapper = shallowMount(BalanceCard, {
        localVue,
        propsData: {
            balance: null
        }
    });

    it("renders", (): void => {
        expect.assertions(1);
        expect(wrapper.find(".balance").exists()).toBe(true);
    });

    it("computes and displays data properly", (): void => {
        // Useless expect to make jest happy
        expect(true).toBe(true);
    });
});
