import { createLocalVue, mount } from "@vue/test-utils";
import VueCompositionApi from "@vue/composition-api";
import ModalViewAccountId from "../../../src/components/ModalViewAccountId.vue";
import store from "../../../src/store";
import i18n from "../../../src/i18n";
import VueI18n from "vue-i18n";

describe("ModalViewAccountId.vue", (): void => {
    it("renders open", (): void => {
        expect.assertions(1);

        const localVue = createLocalVue();
        localVue.use(VueCompositionApi);
        localVue.use(VueI18n);

        const onChange = jest.fn();

        const wrapper = mount(ModalViewAccountId, {
            store,
            localVue,
            i18n,
            propsData: {
                isOpen: true,
                event: "change"
            },
            listeners: {
                change: onChange
            }
        });

        expect(wrapper).toMatchInlineSnapshot(`
            <div role="dialog" aria-modal="true" class="modal-background">
              <div class="modal">
                <header><span class="title">Account ID</span> <svg width="24" height="24" viewBox="0 0 24 24" class="close">
                    <path d="M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z"></path>
                  </svg></header>
                <div class="main">
                  <div class="content-container">
                    <div class="modal-contents">
                      <div value="" level="L" background="#fff" foreground="#000" class="pub-qr"><canvas height="200" width="200" style="width: 200px; height: 200px;"></canvas></div>
                      <div class="read-only-input account-id">
                        <div class="">

                        </div>
                        <!---->
                      </div> <button type="submit" class="button compact"><span>Copy Account ID</span>
                        <!----></button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
        `);
    });

    it("renders closed", (): void => {
        expect.assertions(1);

        const localVue = createLocalVue();
        localVue.use(VueCompositionApi);
        localVue.use(VueI18n);

        const onChange = jest.fn();

        const wrapper = mount(ModalViewAccountId, {
            store,
            localVue,
            i18n,
            propsData: {
                isOpen: false,
                event: "change"
            },
            listeners: {
                change: onChange
            }
        });

        expect(wrapper).toMatchInlineSnapshot(``);
    });
});
