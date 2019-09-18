import { createLocalVue, mount } from "@vue/test-utils";
import VueCompositionApi from "@vue/composition-api";
import NetworkCard from "../../../src/components/NetworkCard.vue";
import VueI18n from "vue-i18n";
import i18n from "../../../src/i18n";

describe("NetworkCard.vue", (): void => {
    const localVue = createLocalVue();
    localVue.use(VueCompositionApi);
    localVue.use(VueI18n);

    it("renders", (): void => {
        expect.assertions(1);

        const wrapper = mount(NetworkCard, {
            localVue,
            i18n
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
