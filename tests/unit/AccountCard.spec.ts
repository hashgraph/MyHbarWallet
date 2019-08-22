import { shallowMount, mount, createLocalVue } from "@vue/test-utils";
import AccountCard from "../../src/components/AccountCard.vue";
import { plugin as VueFunctionApi } from "vue-function-api";

describe("AccountCard.vue", (): void => {
    const localVue = createLocalVue();
    localVue.use(VueFunctionApi);

    const wrapper = shallowMount(AccountCard, {
        localVue,
        propsData: {
            realm: 0,
            shard: 0,
            account: 305472,
            class: "info-account",
            "public-key":
                "302a300506032b65700321002cc9e2d0c16c717476d4bbbfa3307a98cf0c41d7afc77c851e476b5921f3fb65"
        }
    });

    it("renders", (): void => {
        expect.assertions(1);
        expect(wrapper.isVisible()).toBe(true);
    });

    it("removes the public key prefix", (): void => {
        expect.assertions(1);
        expect(wrapper.find(".top div:nth-child(3)").text()).toMatch(
            "2cc9e2d0c16c717476d4bbbfa3307a98cf0c41d7afc77c851e476b5921f3fb65"
        );
    });
});
