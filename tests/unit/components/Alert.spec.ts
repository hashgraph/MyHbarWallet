import { createLocalVue, mount } from "@vue/test-utils";
import VueCompositionApi from "@vue/composition-api";
import Alert from "../../../src/components/Alert.vue";

describe("Alert", (): void => {
    const localVue = createLocalVue();
    localVue.use(VueCompositionApi);

    it("renders as info", (): void => {
        expect.assertions(1);

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

    it("renders as warn", (): void => {
        expect.assertions(1);

        const wrapper = mount(Alert, {
            localVue,
            propsData: {
                id: 1,
                message: "test",
                level: "warn"
            }
        });

        expect(wrapper).toMatchInlineSnapshot(`
            <div class="alert warn">
              <div class="message"><svg width="24" height="24" viewBox="0 0 24 24" class="message-icon">
                  <path d="M12,2L1,21H23M12,6L19.53,19H4.47M11,10V14H13V10M11,16V18H13V16"></path>
                </svg>
                test
              </div> <svg width="24" height="24" viewBox="0 0 24 24" class="close" role="button">
                <path d="M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z"></path>
              </svg>
            </div>
        `);
    });

    it("renders as error", (): void => {
        expect.assertions(1);

        const wrapper = mount(Alert, {
            localVue,
            propsData: {
                id: 1,
                message: "test",
                level: "error"
            }
        });

        expect(wrapper).toMatchInlineSnapshot(`
            <div class="alert error">
              <div class="message"><svg width="24" height="24" viewBox="0 0 24 24" class="message-icon">
                  <path d="M12,20C7.59,20 4,16.41 4,12C4,7.59 7.59,4 12,4C16.41,4 20,7.59 20,12C20,16.41 16.41,20 12,20M12,2C6.47,2 2,6.47 2,12C2,17.53 6.47,22 12,22C17.53,22 22,17.53 22,12C22,6.47 17.53,2 12,2M14.59,8L12,10.59L9.41,8L8,9.41L10.59,12L8,14.59L9.41,16L12,13.41L14.59,16L16,14.59L13.41,12L16,9.41L14.59,8Z"></path>
                </svg>
                test
              </div> <svg width="24" height="24" viewBox="0 0 24 24" class="close" role="button">
                <path d="M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z"></path>
              </svg>
            </div>
        `);
    });

    it("renders as success", (): void => {
        expect.assertions(1);

        const wrapper = mount(Alert, {
            localVue,
            propsData: {
                id: 1,
                message: "test",
                level: "success"
            }
        });

        expect(wrapper).toMatchInlineSnapshot(`
            <div class="alert success">
              <div class="message"><svg width="24" height="24" viewBox="0 0 24 24" class="message-icon">
                  <path d="M12 2C6.5 2 2 6.5 2 12S6.5 22 12 22 22 17.5 22 12 17.5 2 12 2M12 20C7.59 20 4 16.41 4 12S7.59 4 12 4 20 7.59 20 12 16.41 20 12 20M16.59 7.58L10 14.17L7.41 11.59L6 13L10 17L18 9L16.59 7.58Z"></path>
                </svg>
                test
              </div> <svg width="24" height="24" viewBox="0 0 24 24" class="close" role="button">
                <path d="M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z"></path>
              </svg>
            </div>
        `);
    });

    it("renders with undefined level", (): void => {
        expect.assertions(1);

        const wrapper = mount(Alert, {
            localVue,
            propsData: {
                id: 1,
                message: "test",
                level: undefined
            }
        });

        expect(wrapper).toMatchInlineSnapshot(`
            <div class="alert">
              <div class="message"><svg width="24" height="24" viewBox="0 0 24 24" class="message-icon">
                  <path d="M12,2L1,21H23M12,6L19.53,19H4.47M11,10V14H13V10M11,16V18H13V16"></path>
                </svg>
                test
              </div> <svg width="24" height="24" viewBox="0 0 24 24" class="close" role="button">
                <path d="M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z"></path>
              </svg>
            </div>
        `);
    });
});
