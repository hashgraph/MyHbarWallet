import { createLocalVue, mount } from "@vue/test-utils";
import VueCompositionApi from "@vue/composition-api";
import VueI18n from "vue-i18n";

import ModalPurchaseHbar from "../../../src/ui/components/ModalPurchaseHbar.vue";
import i18n from "../../../src/service/i18n";

describe("ModalPurchaseHbar.vue", (): void => {
    const localVue = createLocalVue();
    localVue.use(VueCompositionApi);
    localVue.use(VueI18n);

    it("renders", async (): Promise<void> => {
        expect.assertions(1);

        const wrapper = mount(ModalPurchaseHbar, {
            localVue,
            i18n,
            propsData: { isOpen: true }
        });

        // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
        // @ts-ignore
        const modal = wrapper.vm.$children.find(
            child => child.$options.name === "Modal"
        );
        // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
        // @ts-ignore
        modal!.showModal();
        await localVue.nextTick();

        expect(wrapper).toMatchInlineSnapshot(`
            <transition-stub name="fade">
              <div role="dialog" aria-modal="true" class="modal-background">
                <transition-stub name="slidefade">
                  <div class="modal">
                    <!---->
                    <!---->
                    <div class="main">
                      <div class="content-container"><iframe title="Moonpay" width="450" height="800" allow="accelerometer; autoplay; camera; gyroscope; payment" src="https://buy-staging.moonpay.io?apiKey=pk_test_ypQ0mhShRarhXwAbGvdLfxAL89AtfQ&amp;currencyCode=HBAR&amp;colorCode=%233BC1AA"></iframe>
                        <div class="ModalPurchaseHbar-link-container">
                          Powered By <a href="https://www.moonpay.io/" class="ModalPurchaseHbar-link"><img src="" class="logo"></a></div>
                      </div>
                    </div>
                  </div>
                </transition-stub>
              </div>
            </transition-stub>
        `);
    });
});
