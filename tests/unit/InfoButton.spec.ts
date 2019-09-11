import { createLocalVue, mount } from "@vue/test-utils";
import InfoButton from "../../src/components/InfoButton.vue";
import VueCompositionApi from "@vue/composition-api";

describe("InfoButton.vue", (): void => {
    const localVue = createLocalVue();
    localVue.use(VueCompositionApi);

    it("renders", (): void => {
        expect.assertions(1);

        const wrapper = mount(InfoButton, {
            localVue,
            propsData: {
                message: "message"
            }
        });
        expect(wrapper).toMatchInlineSnapshot(`
            <span class="info-button"><div class="tooltip-container"><div class="slot-container"><svg width="24" height="24" viewBox="0 0 24 24" class="icon"><path d="M13,13H11V7H13M13,17H11V15H13M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2Z"></path></svg></div> <div class="message">
                    message
                </div></div></span>
        `);
    });
});
