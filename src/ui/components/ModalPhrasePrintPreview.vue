<template>
    <Modal
        :is-open="props.isOpen"
        :large="true"
        :title="$t('modalPhrasePrintPreview.title')"
        @change="onChange"
    >
        <div ref="mnemonic">
            <div class="logo-contents">
                <div class="header-container">
                    <span class="header">
                        My<strong>Hbar</strong>Wallet
                    </span>
                    <span class="sub-header">{{
                        $t("modalPhrasePrintPreview.mnemonicPhrase")
                    }}</span>
                </div>
                <div class="support-email">
                    <img
                        alt=""
                        class="icon"
                        src="../assets/icon-bell.svg"
                    >support@myhbarwallet.app
                </div>
            </div>
            <div class="password-disclaimer">
                <h3>
                    {{ $t("modalPhrasePrintPreview.saveThisSheet") }}
                </h3>
                <p
                    v-html="
                        formatRich(
                            $t(
                                'modalPhrasePrintPreview.weCanNotChangeYourPassword'
                            ).toString(),
                            { strongClass: 'important' }
                        )
                    "
                />
                <div
                    v-if="password !== ''"
                >
                    <p>{{ $t('modalPhrasePrintPreview.yourPassword') }}</p>
                    <ReadOnlyInput
                        class="roinput"
                        :value="password"
                        multiline
                        obscure
                    />
                </div>
                <div v-else>
                    <p>{{ $t('modalPhrasePrintPreview.noPassword') }}</p>
                </div>

                <div class="contents">
                    <Mnemonic
                        :editable="false"
                        :words="props.words.length"
                        :value="props.words"
                    />
                </div>
            </div>
            <div class="button-container">
                <Button
                    class="button-save"
                    :label="$t('common.save')"
                    outline
                    @click="handleClickSave"
                />
            </div>
        </div>
    </Modal>
</template>

<script lang="ts">
import { defineComponent, Ref, ref, SetupContext, onMounted } from "@vue/composition-api";

import { formatRich } from "../../service/format";
import { actions } from "../store";

import Button from "./Button.vue";
import Modal from "./Modal.vue";
import Mnemonic from "./MnemonicInput.vue";
import ReadOnlyInput from "./ReadOnlyInput.vue";

interface Props {
    isOpen: boolean;
    words: string[];
    password: string;
}

export default defineComponent({
    components: {
        Button,
        Modal,
        Mnemonic,
        ReadOnlyInput
    },
    model: {
        prop: "isOpen",
        event: "change"
    },
    props: {
        isOpen: Boolean,
        words: Array,
        password: String
    },
    setup(props: Props, context: SetupContext) {
        const mnemonic = ref(null); // My intended value cannot be accessed via .value because I am not reactive
        const HTML2PDF: Ref<typeof import("html2pdf.js")[ "default" ] | null> = ref(null);

        async function handleClickSave(): Promise<void> {
            if (HTML2PDF.value == null) {
                actions.alert({
                    message: context.root.$i18n.t("pdf.noLoad").toString(),
                    level: "warn"
                });
            }

            const options = {
                filename: "MHW_Mnemonic_Phrase.pdf",
                margin: [ 10, 10, 10, 10 ],
                pageSize: "a4",
                image: { type: "png", quality: 1 },
                jsPDF: { unit: "mm" }
            };

            if (HTML2PDF.value != null) {
                await HTML2PDF.value()
                    .set(options)
                    // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
                    // @ts-ignore
                    .from(context.refs.mnemonic)
                    .save();
            } else {
                window.print();
            }
        }

        onMounted(async() => {
            HTML2PDF.value = (await import(/* webpackChunkName: "pdf" */ "html2pdf.js"))[ "default" ];
        });

        function onChange(): void {
            context.emit("change", props.isOpen);
        }

        return {
            props,
            mnemonic,
            onChange,
            handleClickSave,
            formatRich
        };
    }
});
</script>

<style scoped lang="postcss">
.logo-contents {
    align-items: center;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    font-size: 16px;
    justify-content: space-between;
}

.header {
    color: var(--color-china-blue);
    font-size: 24px;

    & > strong {
        font-weight: 600;
    }
}

.header-container {
    align-items: center;
    display: flex;
}

.sub-header {
    border-left: 2px solid #05c0a5;
    color: var(--color-melbourne-cup);
    font-size: 14px;
    font-weight: 700;
    margin-inline-start: 8px;
    padding-inline-start: 8px;
}

.contents {
    border: 1px solid var(--color-jupiter);
    margin: 0;
    padding: 50px;
}

.support-email {
    color: var(--color-china-blue);
    font-size: 14px;
    margin-inline-start: 5px;

    & > img {
        padding: 0 3px 0 3px;
    }
}

.password-disclaimer {
    color: var(--color-china-blue);
    font-size: 14px;
    margin-block-end: 30px;

    & >>> .important {
        color: var(--color-lightish-red);
        font-weight: 700;
    }

    & > h3 {
        color: var(--color-black);
        font-size: 16px;
        font-weight: 700;
    }
}

.button-container {
    display: flex;
    flex-direction: column;
    flex-wrap: nowrap;
    margin-block-start: 30px;

    @media print {
        margin: 0;
    }
}

.button-save {
    align-self: center;

    @media print {
        display: none;
    }
}

.roinput {
    border: 1px solid var(--color-jupiter);
    border-radius: 1px;
    width: 100%;
}
</style>
