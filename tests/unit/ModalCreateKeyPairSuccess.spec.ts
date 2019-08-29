import { mount, createLocalVue } from "@vue/test-utils";
import ModalCreateKeyPairSuccess from "../../src/components/ModalCreateKeyPairSuccess.vue";
import VueCompositionApi from "@vue/composition-api";
import VueRouter from "vue-router";
import router from "../../src/router";

describe("ModalCreateKeyPairSuccess.vue", (): void => {
    const localVue = createLocalVue();
    localVue.use(VueCompositionApi);
    localVue.use(VueRouter);

    it("renders", (): void => {
        expect.assertions(1);

        const wrapper = mount(ModalCreateKeyPairSuccess, {
            localVue,
            router,
            propsData: {
                isOpen: true
            }
        });

        expect(wrapper).toMatchInlineSnapshot(`
            <div role="dialog" aria-modal="true" class="modal-background is-open">
              <div class="modal">
                <!---->
                <div class="main">
                  <div class="content-container">
                    <div class="success-creating-keypair"><svg width="200" height="200" viewBox="0 0 24 24" class="large-checkbox">
                        <path d="M21,7L9,19L3.5,13.5L4.91,12.09L9,16.17L19.59,5.59L21,7Z"></path>
                      </svg>
                      <div class="title-container">
                        <div class="title">Success</div>
                        <div class="subtitle">
                          You have generated your key pair successfully.
                        </div>
                      </div> <a href="/interface" class=""><button type="submit" class=""><span>Continue</span>
                          <!----></button></a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
        `);
    });
});
