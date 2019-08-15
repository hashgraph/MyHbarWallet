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
        expect.assertions(3);
        const balanceNull = wrapper.find(".subtitle-null");
        expect(wrapper.find(".subtitle").exists()).toBe(false);
        expect(balanceNull.exists()).toBe(true);
        wrapper.setProps({
            balance: 1
        });
        expect(wrapper.find(".usd-balance").text()).toBe("/ $0.12");
    });
});
