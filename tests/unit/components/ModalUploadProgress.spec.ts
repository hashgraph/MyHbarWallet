import { createLocalVue, mount } from "@vue/test-utils";
import VueCompositionApi from "@vue/composition-api";
import ModalUploadProgress from "../../../src/components/ModalUploadProgress.vue";

describe("ModalUploadProgress.vue", (): void => {
    const localVue = createLocalVue();
    localVue.use(VueCompositionApi);

    const onChange = jest.fn();
    const onFinish = jest.fn();
    const onRetry = jest.fn();

    it("renders, in progress, 0%", (): void => {
        const wrapper = mount(ModalUploadProgress, {
            localVue,
            propsData: {
                state: {
                    isOpen: true,
                    inProgress: true,
                    wasSuccess: true,
                    currentChunk: 0,
                    totalChunks: 100
                },
                listeners: {
                    change: onChange,
                    finish: onFinish,
                    retry: onRetry
                }
            }
        });

        expect(wrapper).toMatchInlineSnapshot(`
            <div transition="modal-fade" role="dialog" aria-modal="true" class="modal-background" not-closeable="" listeners="[object Object]">
              <div class="modal">
                <!---->
                <!---->
                <div class="main">
                  <div class="warning">
                    <div class="notice">
                      <div class="symbol-container"><svg width="24" height="24" viewBox="0 0 24 24" class="symbol">
                          <path d="M12,2L1,21H23M12,6L19.53,19H4.47M11,10V14H13V10M11,16V18H13V16"></path>
                        </svg></div>
                      <div class="text">
                        <div class="title">
                          IMPORTANT
                        </div>
                        <div class="message">
                          Do not leave this page or close the browser tab until upload is complete. Progress will be lost and can not be recovered.
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="content-container">
                    <div class="modal-upload-progress">
                      <div class="upload-text">
                        Your file is currently uploading
                      </div>
                      <div class="upload-subtext">
                        This may take a while
                      </div>
                      <div class="visual-container"><svg width="120" height="120" viewBox="0 0 24 24" class="icon mdi-slow-spin">
                          <path d="M12,4V2A10,10 0 0,0 2,12H4A8,8 0 0,1 12,4Z"></path>
                        </svg></div>
                      <div class="progress-text">
                        0.00%
                      </div>
                      <!---->
                    </div>
                  </div>
                </div>
              </div>
            </div>
        `);
    });

    it("renders, in progress, 70%", (): void => {
        const wrapper = mount(ModalUploadProgress, {
            localVue,
            propsData: {
                state: {
                    isOpen: true,
                    inProgress: true,
                    wasSuccess: true,
                    currentChunk: 70,
                    totalChunks: 100
                },
                listeners: {
                    change: onChange,
                    finish: onFinish,
                    retry: onRetry
                }
            }
        });

        expect(wrapper).toMatchInlineSnapshot(`
            <div transition="modal-fade" role="dialog" aria-modal="true" class="modal-background" not-closeable="" listeners="[object Object]">
              <div class="modal">
                <!---->
                <!---->
                <div class="main">
                  <div class="warning">
                    <div class="notice">
                      <div class="symbol-container"><svg width="24" height="24" viewBox="0 0 24 24" class="symbol">
                          <path d="M12,2L1,21H23M12,6L19.53,19H4.47M11,10V14H13V10M11,16V18H13V16"></path>
                        </svg></div>
                      <div class="text">
                        <div class="title">
                          IMPORTANT
                        </div>
                        <div class="message">
                          Do not leave this page or close the browser tab until upload is complete. Progress will be lost and can not be recovered.
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="content-container">
                    <div class="modal-upload-progress">
                      <div class="upload-text">
                        Your file is currently uploading
                      </div>
                      <div class="upload-subtext">
                        This may take a while
                      </div>
                      <div class="visual-container"><svg width="120" height="120" viewBox="0 0 24 24" class="icon mdi-slow-spin">
                          <path d="M12,4V2A10,10 0 0,0 2,12H4A8,8 0 0,1 12,4Z"></path>
                        </svg></div>
                      <div class="progress-text">
                        70.00%
                      </div>
                      <!---->
                    </div>
                  </div>
                </div>
              </div>
            </div>
        `);
    });

    it("renders, finished, success", (): void => {
        const wrapper = mount(ModalUploadProgress, {
            localVue,
            propsData: {
                state: {
                    isOpen: true,
                    inProgress: false,
                    wasSuccess: true,
                    currentChunk: 100,
                    totalChunks: 100
                },
                listeners: {
                    change: onChange,
                    finish: onFinish,
                    retry: onRetry
                }
            }
        });

        expect(wrapper).toMatchInlineSnapshot(`
            <div transition="modal-fade" role="dialog" aria-modal="true" class="modal-background" not-closeable="" listeners="[object Object]">
              <div class="modal">
                <!---->
                <!---->
                <div class="main">
                  <div class="warning">
                    <div class="notice">
                      <div class="symbol-container"><svg width="24" height="24" viewBox="0 0 24 24" class="symbol">
                          <path d="M12,2L1,21H23M12,6L19.53,19H4.47M11,10V14H13V10M11,16V18H13V16"></path>
                        </svg></div>
                      <div class="text">
                        <div class="title">
                          IMPORTANT
                        </div>
                        <div class="message">
                          Do not leave this page or close the browser tab until upload is complete. Progress will be lost and can not be recovered.
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="content-container">
                    <div class="modal-upload-progress">
                      <div class="upload-text">
                        Your file has finished uploading
                      </div>
                      <div class="upload-subtext">
                        Success
                      </div>
                      <div class="visual-container"><svg width="120" height="120" viewBox="0 0 24 24" class="icon">
                          <path d="M14,2L20,8V20A2,2 0 0,1 18,22H6A2,2 0 0,1 4,20V4A2,2 0 0,1 6,2H14M18,20V9H13V4H6V20H18M11.2,18.46L8.45,15.46L9.61,14.3L11.2,15.88L14.78,12.3L15.95,13.71L11.2,18.46Z"></path>
                        </svg></div>
                      <div class="progress-text">
                        100.00%
                      </div>
                      <!---->
                    </div>
                  </div>
                </div>
              </div>
            </div>
        `);
    });

    it("renders, finished, failure", (): void => {
        const wrapper = mount(ModalUploadProgress, {
            localVue,
            propsData: {
                state: {
                    isOpen: true,
                    inProgress: false,
                    wasSuccess: false,
                    currentChunk: 90,
                    totalChunks: 100
                },
                listeners: {
                    change: onChange,
                    finish: onFinish,
                    retry: onRetry
                }
            }
        });

        expect(wrapper).toMatchInlineSnapshot(`
            <div transition="modal-fade" role="dialog" aria-modal="true" class="modal-background" not-closeable="" listeners="[object Object]">
              <div class="modal">
                <!---->
                <!---->
                <div class="main">
                  <div class="warning">
                    <div class="notice">
                      <div class="symbol-container"><svg width="24" height="24" viewBox="0 0 24 24" class="symbol">
                          <path d="M12,2L1,21H23M12,6L19.53,19H4.47M11,10V14H13V10M11,16V18H13V16"></path>
                        </svg></div>
                      <div class="text">
                        <div class="title">
                          IMPORTANT
                        </div>
                        <div class="message">
                          Do not leave this page or close the browser tab until upload is complete. Progress will be lost and can not be recovered.
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="content-container">
                    <div class="modal-upload-progress">
                      <div class="upload-text">
                        Your file did not finish uploading
                      </div>
                      <div class="upload-subtext">
                        Try again?
                      </div>
                      <div class="visual-container"><svg width="120" height="120" viewBox="0 0 24 24" class="icon">
                          <path d="M14 2H6C4.89 2 4 2.9 4 4V20C4 21.11 4.89 22 6 22H18C19.11 22 20 21.11 20 20V8L14 2M18 20H6V4H13V9H18V20M11.95 15.46L14.08 17.58L12.66 19L10.54 16.87L8.42 19L7 17.58L9.13 15.46L7 13.34L8.42 11.92L10.54 14.05L12.66 11.92L14.08 13.34L11.95 15.46Z"></path>
                        </svg></div>
                      <div class="progress-text">
                        90.00%
                      </div>
                      <div class="button-container"><button type="submit" class="cancel-button outline danger">
                          <!----> <span>Cancel</span>
                          <!----></button> <button type="submit" class="retry-button">
                          <!----> <span>Retry</span>
                          <!----></button></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
        `);
    });
});
