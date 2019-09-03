import { mount, createLocalVue } from "@vue/test-utils";
import AccountCard from "../../src/components/AccountCard.vue";
import VueCompositionApi from "@vue/composition-api";

describe("AccountCard.vue", (): void => {
    const localVue = createLocalVue();
    localVue.use(VueCompositionApi);

    const wrapper = mount(AccountCard, {
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
});
