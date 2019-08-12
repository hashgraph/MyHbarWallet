import { mount, shallowMount, createLocalVue } from "@vue/test-utils";
import BalanceCard from "../../src/components/BalanceCard.vue";

describe("BalanceCard.vue", ():void => {
    const wrapper = shallowMount(BalanceCard, {
        propsData: {
            balance: null
        }
    });
    it("renders", (): void => {
        expect(wrapper.find(".balance").exists()).toBeTruthy();
    });

    it("computes and displays data properly", (): void => {
        const balanceNull = wrapper.find(".subtitle-null");
        expect(wrapper.find(".subtitle").exists()).toBeFalsy();
        expect(balanceNull.exists()).toBeTruthy()
        wrapper.setProps({
            balance: 1
        });
        expect(wrapper.find(".usd-balance").text()).toBe("/ $0.12");
    })
});
