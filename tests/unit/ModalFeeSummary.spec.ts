import { mount, createLocalVue } from "@vue/test-utils";
import ModalFeeSummary from "../../src/components/ModalFeeSummary.vue";
import VueCompositionApi from "@vue/composition-api";

describe("ModalFeeSummary.vue", (): void => {
    const localVue = createLocalVue();
    localVue.use(VueCompositionApi);

    it("renders", (): void => {
        expect.assertions(1);

        const wrapper = mount(ModalFeeSummary, {
            localVue
        });

        expect(wrapper).toMatchInlineSnapshot(`
            <div class="modal-fee-summary">
              <div role="dialog" aria-modal="true" class="modal-background">
                <div class="modal">
                  <header><span class="title"></span> <svg width="24" height="24" viewBox="0 0 24 24" class="close">
                      <path d="M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z"></path>
                    </svg></header>
                  <div class="main">
                    <div class="content-container"></div>
                  </div>
                </div>
              </div>
            </div>
        `);
    });
});
