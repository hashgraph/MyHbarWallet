import { createLocalVue, mount } from "@vue/test-utils";
import VueCompositionApi from "@vue/composition-api";
import NetworkCard from "../../../src/components/NetworkCard.vue";

describe("NetworkCard.vue", (): void => {
    const localVue = createLocalVue();
    localVue.use(VueCompositionApi);

    it("renders", (): void => {
        expect.assertions(1);

        const wrapper = mount(NetworkCard, {
            localVue
        });

        expect(wrapper).toMatchInlineSnapshot(`
            <div class="network"><img src="">
              <div class="content">
                <div class="top">
                  <div class="title">
                    Network
                  </div>
                  <div class="subtitle">
                    testnet
                  </div>
                  <div class="subtitle">
                    0.testnet.hedera.com:50211
                  </div>
                </div>
                <div class="actions">
                  <div class="tooltip-container">
                    <div class="slot-container"></div>
                    <div class="message">
                      Change Network
                    </div>
                  </div>
                </div>
              </div>
            </div>
        `);
    });
});
