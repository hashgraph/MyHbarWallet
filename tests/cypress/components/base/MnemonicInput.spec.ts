import { mount } from "@cypress/vue";

import "../../../../src/index.css";
import MnemonicInput from "../../../../src/components/base/MnemonicInput.vue";

describe("MnemonicInput.vue", () => {
    it("renders", () => {
        mount(MnemonicInput, {
            props: {
                modelValue: [
                    "test", 
                    "test", 
                    "test", 
                    "test", 
                    "test", 
                    "test", 
                    "test", 
                    "test", 
                    "test", 
                    "test", 
                    "test", 
                    "test"
                ],
                readOnly: false,
                wordCount: 12
            }
        });
    });
});
