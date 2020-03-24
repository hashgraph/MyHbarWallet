import { createLocalVue, shallowMount } from "@vue/test-utils";
import VueCompositionApi from "@vue/composition-api";
import VueI18n from "vue-i18n";

import ConvertUnits from "../../../src/ui/views/ConvertUnits.vue";
import i18n from "../../../src/service/i18n";

describe("ConvertUnits.vue", (): void => {
    const localVue = createLocalVue();
    localVue.use(VueCompositionApi);
    localVue.use(VueI18n);

    it("renders", (): void => {
        expect.assertions(1);

        const wrapper = shallowMount(ConvertUnits, {
            localVue,
            i18n
        });
        expect(wrapper).toMatchInlineSnapshot(`
            <circlepage-stub>
              <div class="wrap">
                <div class="title-wrap">
                  <div class="page-title">
                    Convert Units
                  </div>
                  <div class="page-subtitle">
                    Our helpful conversion tool and hbar unit reference allow you to calculate your total transaction cost.
                  </div>
                </div>
                <div>
                  <unitconverter-stub></unitconverter-stub>
                </div>
                <div class="hbar-unit-reference-guide">
                  <div class="block-title">
                    Hbar Unit Reference Guide
                  </div>
                  <div class="unit-table">
                    <table>
                      <tbody>
                        <tr>
                          <td>Tinybar</td>
                          <div class="sub-row-container">
                            <td class="amount">
                              100,000,000 tℏ
                            </td>
                            <td class="amount-hbar">
                              1 ℏ
                            </td>
                          </div>
                        </tr>
                        <tr>
                          <td>Microbar</td>
                          <div class="sub-row-container">
                            <td class="amount">
                              1,000,000 μℏ
                            </td>
                            <td class="amount-hbar">
                              1 ℏ
                            </td>
                          </div>
                        </tr>
                        <tr>
                          <td>Milibar</td>
                          <div class="sub-row-container">
                            <td class="amount">
                              1,000 mℏ
                            </td>
                            <td class="amount-hbar">
                              1 ℏ
                            </td>
                          </div>
                        </tr>
                        <tr>
                          <td>Hbar</td>
                          <div class="sub-row-container">
                            <td class="amount">
                              1 ℏ
                            </td>
                            <td class="amount-hbar">
                              1 ℏ
                            </td>
                          </div>
                        </tr>
                        <tr>
                          <td>Kilobar</td>
                          <div class="sub-row-container">
                            <td class="amount">
                              1 kℏ
                            </td>
                            <td class="amount-hbar">
                              1,000 ℏ
                            </td>
                          </div>
                        </tr>
                        <tr>
                          <td>Megabar</td>
                          <div class="sub-row-container">
                            <td class="amount">
                              1 Mℏ
                            </td>
                            <td class="amount-hbar">
                              1,000,000 ℏ
                            </td>
                          </div>
                        </tr>
                        <tr>
                          <td>Gigabar</td>
                          <div class="sub-row-container">
                            <td class="amount">
                              1 Gℏ
                            </td>
                            <td class="amount-hbar">
                              1,000,000,000 ℏ
                            </td>
                          </div>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </circlepage-stub>
        `);
    });
});
