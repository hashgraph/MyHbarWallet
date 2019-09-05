import { createLocalVue, mount } from "@vue/test-utils";
import BalanceCard from "../../src/components/BalanceCard.vue";
import VueCompositionApi from "@vue/composition-api";

describe("BalanceCard.vue", (): void => {
    const localVue = createLocalVue();
    localVue.use(VueCompositionApi);

    it("renders", (): void => {
        const wrapper = mount(BalanceCard, {
            localVue,
            propsData: {
                balance: null
            }
        });

        expect(wrapper).toMatchInlineSnapshot(`
            <div class="balance"><img src="">
              <div class="content">
                <div class="top">
                  <div class="title">
                    Balance
                  </div>
                  <div type="string" class="subtitle-null">
                    Unknown
                  </div>
                </div>
                <div class="actions">
                  <div class="tooltip-container action">
                    <div class="slot-container"><svg width="24" height="24" viewBox="0 0 24 24" class="refresh-icon">
                        <path d="M17.65,6.35C16.2,4.9 14.21,4 12,4A8,8 0 0,0 4,12A8,8 0 0,0 12,20C15.73,20 18.84,17.45 19.73,14H17.65C16.83,16.33 14.61,18 12,18A6,6 0 0,1 6,12A6,6 0 0,1 12,6C13.66,6 15.14,6.69 16.22,7.78L13,11H20V4L17.65,6.35Z"></path>
                      </svg></div>
                    <div class="message">
                      Refresh Balance
                    </div>
                  </div>
                </div>
              </div>
            </div>
        `);
    });
});
