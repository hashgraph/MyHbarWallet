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
                      <div class="content-container"><iframe title="Carbon Fiber" width="450" height="800" allow="fullscreen" src="https://buy.carbon.money/?tokens=hbar&amp;receiveAddressHbar=&amp;environment=sandbox&amp;apiKey=89fa28dd-b26e-4af4-8313-1536054767d5"></iframe>
                        <div class="ModalPurchaseHbar-link-container">
                          Powered By <a href="https://www.carbon.money/" class="ModalPurchaseHbar-link"><img src="" class="logo"></a></div>
                      </div>
                    </div>
                  </div>
                </transition-stub>
              </div>
            </transition-stub>
        `);
    });
});
