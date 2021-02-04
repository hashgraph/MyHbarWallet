import { createLocalVue, mount } from "@vue/test-utils";
import VueCompositionApi from "@vue/composition-api";
import VueI18n from "vue-i18n";

import ModalSuccess from "../../../src/ui/components/ModalSuccess.vue";
import i18n from "../../../src/service/i18n";

describe("ModalSuccess.vue", (): void => {
    const localVue = createLocalVue();
    localVue.use(VueCompositionApi);
    localVue.use(VueI18n);

    it("renders", async(): Promise<void> => {
        expect.assertions(1);

        const wrapper = mount(ModalSuccess, {
            localVue,
            i18n,
            propsData: { state: { isOpen: true }}
        });

        // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
        // @ts-ignore
        const modal = wrapper.vm.$children.find(
            (child) => child.$options.name === "Modal"
        );
        // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
        // @ts-ignore
        modal!.showModal();
        await localVue.nextTick();

        expect(wrapper).toMatchInlineSnapshot(`
            <transition-stub name="fade">
              <div role="dialog" aria-modal="true" class="modal-background">
                <transition-stub name="slidefade">
                  <div class="modal small">
                    <!----> <svg width="140" height="140" viewBox="0 0 24 24" class="crown">
                      <path d="M21,7L9,19L3.5,13.5L4.91,12.09L9,16.17L19.59,5.59L21,7Z"></path>
                    </svg>
                    <div class="main garlands">
                      <div class="content-container">
                        <div class="container">
                          <div class="title">
                            Success
                          </div>
                          <div class="description"></div>
                          <div class="button-container">
                            <!----> <button type="submit" class="compact dismiss-button full">
                              <!----> <span>Dismiss</span>
                              <!---->
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </transition-stub>
              </div>
            </transition-stub>
        `);
    });
});
