import { createLocalVue, mount } from "@vue/test-utils";
import Modal from "../../src/components/Modal.vue";
import VueCompositionApi from "@vue/composition-api";

describe("Modal.vue", (): void => {
    const localVue = createLocalVue();
    localVue.use(VueCompositionApi);

    it("renders", (): void => {
        const wrapper = mount(Modal, {
            localVue,
            propsData: {
                notClosable: false,
                title: "test text",
                isOpen: true
            }
        });

        expect(wrapper).toMatchInlineSnapshot(`
            <div role="dialog" aria-modal="true" class="modal-background is-open">
              <div class="modal">
                <header><span class="title">test text</span> <svg width="24" height="24" viewBox="0 0 24 24" class="close">
                    <path d="M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z"></path>
                  </svg></header>
                <div class="main">
                  <div class="content-container"></div>
                </div>
              </div>
            </div>
        `);
    });
});
