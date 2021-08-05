import { mount } from "@cypress/vue";

import "../../../../src/index.css";
import FileUploader from "../../../../src/components/base/FileUploader.vue";

describe("FileUploader.vue", () => {
    it("renders", () => {
        mount(FileUploader, {
            global: {
                mocks: {
                    $t: (msg: string) => msg
                }
            }
        });
    });
});
