<template>
    <Modal
        :is-open="props.isOpen"
        :large="true"
        title="Print Preview"
        @change="onChange"
    >
        <div ref="mnemonic">
            <div class="logo-contents">
                <div class="header-container">
                    <span class="header">
                        My<strong>Hbar</strong>Wallet
                    </span>
                    <span class="sub-header">Mnemonic Phrase</span>
                </div>
                <div class="support-email">
                    <img
                        alt=""
                        class="icon"
                        src="../assets/icon-bell.svg"
                    />support@myhbarwallet.com
                </div>
            </div>
            <div class="password-disclaimer">
                <h3>
                    Please Keep This Sheet in a Very Safe Place. It is your
                    property!
                </h3>
                We <strong>CAN NOT</strong> change your password. Please
                <strong>DO NOT FORGET</strong> to save your password. It is your
                private key. You will need this
                <strong>Password + Mnemonic Phrase</strong> to access your
                wallet.
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
                class="button-print"
                label="Print"
                outline
                @click="handleClickPrint"
            />
        </div>
    </Modal>
</template>

<script lang="ts">
import { createComponent, SetupContext, ref } from "@vue/composition-api";
import Button from "../components/Button.vue";
import Modal from "./Modal.vue";
import Mnemonic from "../components/MnemonicInput.vue";
import store from "../store";
import { ALERT } from "../store/actions";
import html2pdf from "html2pdf.js";

interface Props {
    isOpen: boolean;
    words: string[];
}

export default createComponent({
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

        function handleClickPrint(): void {
            let element = null;

            try {
                // Note: Vue Instances need $el to get their HTML, dumb elements do not
                element = (mnemonic.value as unknown) as HTMLElement;
            } catch (error) {
                if (error instanceof TypeError) {
                    console.log(error);
                    store.dispatch(ALERT, {
                        message: "Could not print Mnemonic",
                        level: "error"
                    });
                } else {
                    throw error;
                }
            }

            const options = {
                filename: "MHW_Mnemonic_Phrase.pdf",
                margin: 10
            };

            html2pdf()
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
            handleClickPrint
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

    & > strong {
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

.button-print {
    align-self: center;

    @media print {
        display: none;
    }
}
</style>
