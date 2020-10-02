import VueCompositionApi from "@vue/composition-api";
import { createLocalVue, mount } from "@vue/test-utils";
import VueI18n from "vue-i18n";

import ModalLogOut from "../../../src/ui/components/ModalLogOut.vue";
import i18n from "../../../src/service/i18n";

describe("ModalLogOut.vue", (): void => {
    const localVue = createLocalVue();
    localVue.use(VueCompositionApi);
    localVue.use(VueI18n);

    it("renders open", async (): Promise<void> => {
        expect.assertions(1);

        const onChange = jest.fn();
        const wrapper = mount(ModalLogOut, {
            localVue,
            i18n,
            propsData: { isOpen: true },
            listeners: { change: onChange }
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
                      <div class="content-container">
                        <div class="modal-forgot-to-logout"><span>Log Out</span>
                          <p>
                            Are you sure?
                          </p>
                          <div class="button-group">
                            <!----> <button type="submit" class="button-logout danger center-button">
                              <!----> <span>Log Out</span>
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
