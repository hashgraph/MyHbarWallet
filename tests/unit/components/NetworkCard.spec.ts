import { createLocalVue, mount } from "@vue/test-utils";
import VueCompositionApi from "@vue/composition-api";
import VueI18n from "vue-i18n";

import NetworkCard from "../../../src/components/NetworkCard.vue";
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
                    Hedera™ Hashgraph Main Network
                  </div>
                  <div class="subtitle">
                    35.237.200.180:50211
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
