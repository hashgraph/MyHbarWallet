import { createLocalVue, mount } from "@vue/test-utils";
import VueCompositionApi from "@vue/composition-api";
import UploadZone from "../../../src/components/UploadZone.vue";

describe("UploadZone.vue", (): void => {
    const localVue = createLocalVue();
    localVue.use(VueCompositionApi);

    const onFileSelect = jest.fn();

    it("renders, no file name", (): void => {
        const wrapper = mount(UploadZone, {
            localVue,
            propsData: {
                fileName: null
            },
            listeners: {
                fileSelect: onFileSelect
            }
        });

        expect(wrapper).toMatchInlineSnapshot(`
            <div class="upload-zone">
              <div class="drop-text">Drop your file here</div>
              <div class="or-text">or</div> <button type="submit" class="button">
                <!----> <span>Select a file from your computer</span>
                <!----></button>
              <!----> <input id="file-upload" type="file" style="display: none;">
            </div>
        `);
    });

    it("renders, with file name", (): void => {
        const wrapper = mount(UploadZone, {
            localVue,
            propsData: {
                fileName: "hello.zip"
            },
            listeners: {
                fileSelect: onFileSelect
            }
        });

        expect(wrapper).toMatchInlineSnapshot(`
            <div class="upload-zone">
              <div class="drop-text">Drop your file here</div>
              <div class="or-text">or</div> <button type="submit" class="button">
                <!----> <span>Select a file from your computer</span>
                <!----></button>
              <div class="file-name-container"><svg width="24" height="24" viewBox="0 0 24 24" class="icon">
                  <path d="M14,2H6A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2M13.5,16V19H10.5V16H8L12,12L16,16H13.5M13,9V3.5L18.5,9H13Z"></path>
                </svg> <span class="file-name">hello.zip</span></div> <input id="file-upload" type="file" style="display: none;">
            </div>
        `);
    });
});
