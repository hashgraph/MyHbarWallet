import { mount, createLocalVue } from "@vue/test-utils";
import Button from "../../src/components/Button.vue";
import VueCompositionApi from "@vue/composition-api";

describe("Button.vue", (): void => {
    const localVue = createLocalVue();
    localVue.use(VueCompositionApi);

    it("renders", (): void => {
        expect.assertions(1);

        const wrapper = mount(Button, {
            localVue,
            propsData: {
                label: "Choose a Hardware"
            }
        });

        expect(wrapper).toMatchInlineSnapshot(`
            <button type="submit" class=""><span>Choose a Hardware</span>
              <!----></button>
        `);
    });

    it("renders a loading spinner when busy", (): void => {
        expect.assertions(1);

        const wrapper = mount(Button, {
            localVue,
            propsData: {
                label: "Choose a Hardware",
                busy: true
            }
        });

        expect(wrapper).toMatchInlineSnapshot(`
            <button type="submit" class="busy"><svg width="24" height="24" viewBox="0 0 24 24" class="spinner mdi-spin">
                <path d="M12,4V2A10,10 0 0,0 2,12H4A8,8 0 0,1 12,4Z"></path>
              </svg>
              <!----></button>
        `);
    });
});
