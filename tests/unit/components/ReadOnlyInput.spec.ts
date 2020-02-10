import { createLocalVue, mount } from "@vue/test-utils";
import VueCompositionApi from "@vue/composition-api";
import VueI18n from "vue-i18n";

import ReadOnlyInput from "../../../src/components/ReadOnlyInput.vue";
import i18n from "../../../src/i18n";

describe("ReadOnlyInput.vue", (): void => {
    const localVue = createLocalVue();
    localVue.use(VueCompositionApi);
    localVue.use(VueI18n);
    const mockValue = "fl;ashg;qashkdfghqpwiohgp;hdhfa;sdfghqa;le";

    it("renders: no value, multiline false, obscure false", (): void => {
        expect.assertions(1);

        const wrapper = mount(ReadOnlyInput, {
            localVue,
            i18n,
            propsData: {
                value: null,
                multiline: false,
                obscure: false
            }
        });

        expect(wrapper).toMatchInlineSnapshot(`
            <div class="read-only-input">
              <div class="">

              </div>
              <!---->
            </div>
        `);
    });

    it("renders: no value, multiline: false, obscure: true", (): void => {
        expect.assertions(1);

        const wrapper = mount(ReadOnlyInput, {
            localVue,
            i18n,
            propsData: {
                value: null,
                multiline: false,
                obscure: true
            }
        });

        expect(wrapper).toMatchInlineSnapshot(`
            <div class="read-only-input">
              <div class="obscure">

              </div> <svg height="40" width="40" viewBox="0 0 24 24" class="eye">
                <path d="M12,9A3,3 0 0,1 15,12A3,3 0 0,1 12,15A3,3 0 0,1 9,12A3,3 0 0,1 12,9M12,4.5C17,4.5 21.27,7.61 23,12C21.27,16.39 17,19.5 12,19.5C7,19.5 2.73,16.39 1,12C2.73,7.61 7,4.5 12,4.5M3.18,12C4.83,15.36 8.24,17.5 12,17.5C15.76,17.5 19.17,15.36 20.82,12C19.17,8.64 15.76,6.5 12,6.5C8.24,6.5 4.83,8.64 3.18,12Z"></path>
              </svg>
            </div>
        `);
    });

    it("renders: no value, multiline: true, obscure: false", (): void => {
        expect.assertions(1);

        const wrapper = mount(ReadOnlyInput, {
            localVue,
            i18n,
            propsData: {
                value: null,
                multiline: true,
                obscure: false
            }
        });

        expect(wrapper).toMatchInlineSnapshot(`
            <div class="read-only-input">
              <div class="multiline">

              </div>
              <!---->
            </div>
        `);
    });

    it("renders: no value, multiline: true, obscure: true", (): void => {
        expect.assertions(1);

        const wrapper = mount(ReadOnlyInput, {
            localVue,
            i18n,
            propsData: {
                value: null,
                multiline: true,
                obscure: true
            }
        });

        expect(wrapper).toMatchInlineSnapshot(`
            <div class="read-only-input">
              <div class="multiline obscure">

              </div> <svg height="40" width="40" viewBox="0 0 24 24" class="eye">
                <path d="M12,9A3,3 0 0,1 15,12A3,3 0 0,1 12,15A3,3 0 0,1 9,12A3,3 0 0,1 12,9M12,4.5C17,4.5 21.27,7.61 23,12C21.27,16.39 17,19.5 12,19.5C7,19.5 2.73,16.39 1,12C2.73,7.61 7,4.5 12,4.5M3.18,12C4.83,15.36 8.24,17.5 12,17.5C15.76,17.5 19.17,15.36 20.82,12C19.17,8.64 15.76,6.5 12,6.5C8.24,6.5 4.83,8.64 3.18,12Z"></path>
              </svg>
            </div>
        `);
    });

    it("renders: value, multiline false, obscure false", (): void => {
        expect.assertions(1);

        const wrapper = mount(ReadOnlyInput, {
            localVue,
            i18n,
            propsData: {
                value: mockValue,
                multiline: false,
                obscure: false
            }
        });

        expect(wrapper).toMatchInlineSnapshot(`
            <div class="read-only-input">
              <div class="value">
                fl;ashg;qashkdfghqpwiohgp;hdhfa;sdfghqa;le
              </div>
              <!---->
            </div>
        `);
    });

    it("renders: value, multiline: false, obscure: true", (): void => {
        expect.assertions(1);

        const wrapper = mount(ReadOnlyInput, {
            localVue,
            i18n,
            propsData: {
                value: mockValue,
                multiline: false,
                obscure: true
            }
        });

        expect(wrapper).toMatchInlineSnapshot(`
            <div class="read-only-input">
              <div class="value obscure">
                fl;ashg;qashkdfghqpwiohgp;hdhfa;sdfghqa;le
              </div> <svg height="40" width="40" viewBox="0 0 24 24" class="eye">
                <path d="M12,9A3,3 0 0,1 15,12A3,3 0 0,1 12,15A3,3 0 0,1 9,12A3,3 0 0,1 12,9M12,4.5C17,4.5 21.27,7.61 23,12C21.27,16.39 17,19.5 12,19.5C7,19.5 2.73,16.39 1,12C2.73,7.61 7,4.5 12,4.5M3.18,12C4.83,15.36 8.24,17.5 12,17.5C15.76,17.5 19.17,15.36 20.82,12C19.17,8.64 15.76,6.5 12,6.5C8.24,6.5 4.83,8.64 3.18,12Z"></path>
              </svg>
            </div>
        `);
    });

    it("renders: value, multiline: true, obscure: false", (): void => {
        expect.assertions(1);

        const wrapper = mount(ReadOnlyInput, {
            localVue,
            i18n,
            propsData: {
                value: mockValue,
                multiline: true,
                obscure: false
            }
        });

        expect(wrapper).toMatchInlineSnapshot(`
            <div class="read-only-input">
              <div class="value multiline">
                fl;ashg;qashkdfghqpwiohgp;hdhfa;sdfghqa;le
              </div>
              <!---->
            </div>
        `);
    });

    it("renders: value, multiline: true, obscure: true", (): void => {
        expect.assertions(1);

        const wrapper = mount(ReadOnlyInput, {
            localVue,
            i18n,
            propsData: {
                value: mockValue,
                multiline: true,
                obscure: true
            }
        });

        expect(wrapper).toMatchInlineSnapshot(`
            <div class="read-only-input">
              <div class="value multiline obscure">
                fl;ashg;qashkdfghqpwiohgp;hdhfa;sdfghqa;le
              </div> <svg height="40" width="40" viewBox="0 0 24 24" class="eye">
                <path d="M12,9A3,3 0 0,1 15,12A3,3 0 0,1 12,15A3,3 0 0,1 9,12A3,3 0 0,1 12,9M12,4.5C17,4.5 21.27,7.61 23,12C21.27,16.39 17,19.5 12,19.5C7,19.5 2.73,16.39 1,12C2.73,7.61 7,4.5 12,4.5M3.18,12C4.83,15.36 8.24,17.5 12,17.5C15.76,17.5 19.17,15.36 20.82,12C19.17,8.64 15.76,6.5 12,6.5C8.24,6.5 4.83,8.64 3.18,12Z"></path>
              </svg>
            </div>
        `);
    });
});
