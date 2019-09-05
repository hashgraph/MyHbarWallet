import { createLocalVue, mount } from "@vue/test-utils";
import VueCompositionApi from "@vue/composition-api";
import ModalForgotToLogOut from "../../src/components/ModalForgotToLogOut.vue";

describe("ModalForgotToLogOut.vue", (): void => {
    const localVue = createLocalVue();
    localVue.use(VueCompositionApi);

    it("renders", (): void => {
        const onChange = jest.fn();
        const wrapper = mount(ModalForgotToLogOut, {
            localVue,
            propsData: {
                isOpen: false
            },
            listeners: {
                change: onChange
            }
        });

        expect(wrapper).toMatchInlineSnapshot(`
            <div role="dialog" aria-modal="true" class="modal-background">
              <div class="modal">
                <!---->
                <div class="main">
                  <div class="content-container">
                    <div class="modal-forgot-to-logout"><span>Oops!</span>
                      <p>
                        Looks like you forgot to log out of your account! For your
                        security, either log out, or return to your account.
                      </p>
                      <div class="button-group"><button type="submit" class="button-go-back outline"><span>Go back</span>
                          <!----></button> <button type="submit" class="button-logout danger"><span>Log Out of Account</span>
                          <!----></button></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
        `);
    });
});
