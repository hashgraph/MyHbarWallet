import { createLocalVue, mount } from "@vue/test-utils";
import VueCompositionApi from "@vue/composition-api";

import Warning from "../../../src/components/Warning.vue";

describe("Warning.vue", (): void => {
    const localVue = createLocalVue();
    localVue.use(VueCompositionApi);

    it("renders", (): void => {
        expect.assertions(1);

        const wrapper = mount(Warning, {
            localVue,
            propsData: {
                title: "NOT RECOMMENDED",
                message:
                    "This is not a recommended way to access your wallet. Due to the sensitivity of the information involved, these options should only be used in offline settings by experienced users."
            }
        });

        expect(wrapper).toMatchInlineSnapshot(`
            <div class="warning">
              <div class="notice">
                <div class="symbol-container"><svg height="24" width="24" viewBox="0 0 24 24" class="symbol">
                    <path d="M12,2L1,21H23M12,6L19.53,19H4.47M11,10V14H13V10M11,16V18H13V16"></path>
                  </svg></div>
                <div class="text">
                  <div class="title">
                    NOT RECOMMENDED
                  </div>
                  <div class="message">
                    This is not a recommended way to access your wallet. Due to the sensitivity of the information involved, these options should only be used in offline settings by experienced users.
                  </div>
                </div>
              </div>
            </div>
        `);
    });
});
