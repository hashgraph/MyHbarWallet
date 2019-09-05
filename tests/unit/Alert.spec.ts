import { createLocalVue, mount } from "@vue/test-utils";
import VueCompositionApi from "@vue/composition-api";
import Alert from "../../src/components/Alert.vue";

describe("Alert", (): void => {
    const localVue = createLocalVue();
    localVue.use(VueCompositionApi);

    it("renders", (): void => {
        const wrapper = mount(Alert, {
            localVue,
            propsData: {
                id: 1,
                message: "test",
                level: "info"
            }
        });

        expect(wrapper).toMatchInlineSnapshot(`
            <div class="alert info">
              <div class="message"><svg width="24" height="24" viewBox="0 0 24 24" class="message-icon">
                  <path d="M11,9H13V7H11M12,20C7.59,20 4,16.41 4,12C4,7.59 7.59,4 12,4C16.41,4 20,7.59 20,12C20,16.41 16.41,20 12,20M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M11,17H13V11H11V17Z"></path>
                </svg>
                test
              </div> <svg width="24" height="24" viewBox="0 0 24 24" class="close" role="button">
                <path d="M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z"></path>
              </svg>
            </div>
        `);
    });
});
