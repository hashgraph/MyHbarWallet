import { shallowMount } from "@vue/test-utils";
import FAQs from "../../src/components/FAQs.vue";

describe("FAQs.vue", (): void => {
    it("renders", (): void => {
        const wrapper = shallowMount(FAQs);
        expect(wrapper).toMatchInlineSnapshot(`
            <div id="faqs" class="faqs">
              <div class="wrap">
                <div class="page-container">
                  <div class="head">
                    <div class="title">
                      <div class="title-text">FAQs</div>
                      <div class="subtitle-text">
                        Answers to most frequently asked questions.
                      </div>
                    </div>
                    <customersupportlink-stub class="customer-support-link"></customersupportlink-stub>
                  </div>
                  <div class="cards">
                    <accordion-stub></accordion-stub>
                    <accordion-stub></accordion-stub>
                    <accordion-stub></accordion-stub>
                    <accordion-stub></accordion-stub>
                  </div>
                </div>
              </div>
            </div>
        `);
    });
});
