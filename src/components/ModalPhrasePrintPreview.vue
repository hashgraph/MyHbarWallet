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
                'modalPhrasePrintPreview.weCanNotChagneYourPassword'
              ).toString(),
              { strongClass: 'important' }
            )
          "
        />
      </div>

      <div class="contents">
        <Mnemonic
          :editable="false"
          :value="props.words"
          :words="props.words.length"
        />
      </div>
    </div>

    <div class="button-container">
      <Button
        :label="$t('common.save')"
        class="button-save"
        outline
        @click="handleClickSave"
      />
    </div>
  </Modal>
</template>

<script lang="ts">
import { createComponent, ref, SetupContext } from "@vue/composition-api";

import { formatRich } from "../formatter";

import Button from "./Button.vue";
import Mnemonic from "./MnemonicInput.vue";
import Modal from "./Modal.vue";

interface Props {
    isOpen: boolean;
    words: string[];
}

export default createComponent({
    name: "ModalPhrasePrintPreview",
    components: {
        Button,
        Modal,
        Mnemonic
    },
    model: {
        prop: "isOpen",
        event: "change"
    },
    props: {
        isOpen: Boolean,
        words: Array
    },
    setup(props: Props, context: SetupContext) {
        const mnemonic = ref(null);

        async function handleClickSave(): Promise<void> {
            let element = null;

            try {
                // Note: Vue Instances need $el to get their HTML, dumb elements do not
                element = (mnemonic.value as unknown) as HTMLElement;
            } catch (error) {
                console.warn(error);
                throw error;
            }

            const options = {
                filename: "MHW_Mnemonic_Phrase.pdf",
                margin: [ 10, 10, 10, 10 ],
                pageSize: "a4",
                image: { type: "png", quality: 1 },
                jsPDF: { unit: "mm" }
            };

            const HTML2PDF = await import("html2pdf.js");
            HTML2PDF[ "default" ]()
                .set(options)
                .from(element)
                .save();
        }

        function onChange(): void {
            context.emit("change");
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

<style lang="postcss" scoped>
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
</style>
