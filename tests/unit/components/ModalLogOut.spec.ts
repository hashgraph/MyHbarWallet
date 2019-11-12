import { createLocalVue, mount } from "@vue/test-utils";
import VueCompositionApi from "@vue/composition-api";
import ModalLogOut from "../../../src/components/ModalLogOut.vue";
import i18n from "../../../src/i18n";
import VueI18n from "vue-i18n";

describe("ModalLogOut.vue", (): void => {
    const localVue = createLocalVue();
    localVue.use(VueCompositionApi);
    localVue.use(VueI18n);

    it("renders closed", (): void => {
        expect.assertions(1);

        const onChange = jest.fn();
        const wrapper = mount(ModalLogOut, {
            localVue,
            i18n,
            propsData: { isOpen: false },
            listeners: { change: onChange }
        });

        expect(wrapper).toMatchInlineSnapshot("");
    });

    it("renders open", (): void => {
        expect.assertions(1);

        const onChange = jest.fn();
        const wrapper = mount(ModalLogOut, {
            localVue,
            i18n,
            propsData: { isOpen: true },
            listeners: { change: onChange }
        });

        expect(wrapper).toMatchInlineSnapshot(`
            <div transition="modal-fade" role="dialog" aria-modal="true" class="modal-background" name="ease">
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
                          <!----></button></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
        `);
    });
});
