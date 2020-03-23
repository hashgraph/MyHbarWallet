<template>
    <Modal
        :is-open="state.isOpen"
        :title="$t('modalAccessByHardware.title')"
        @change="handleModalChangeIsOpen"
    >
        <form
            class="modal-access-by-hardware"
            @submit.prevent="handleSubmit"
        >
            <RadioButtonGroup
                v-model="state.optionSelected"
                name="hardware-access-option"
                :options="options.filter(option => option.supported)"
            />
            <div :class="{ instructions: true, open: selected }">
                <div>{{ instructions }}</div>
            </div>
            <div
                :class="{
                    instructions: true,
                    bold: true,
                    open: requiresChrome && !isChrome
                }"
            >
                <div>{{ $t("modalAccessByHardware.useChromeContinue") }}</div>
            </div>
            <div
                :class="{
                    instructions: true,
                    bold: true,
                    open: !state.disableButton
                }"
            >
                <div>{{ $t("modalAccessByHardware.watchForPrompts") }}</div>
            </div>
            <Button
                :busy="state.isBusy"
                :disabled="state.disableButton"
                class="button-choose-a-hardware"
                :label="$t('modalAccessByHardware.chooseAHardware')"
            />
            <CustomerSupportLink />
        </form>
    </Modal>
</template>

<script lang="ts">
import { computed, defineComponent, PropType, SetupContext, watch } from "@vue/composition-api";
import { UAParser } from "ua-parser-js";

import imageLedger from "../assets/button-ledger.svg";
import imageFinney from "../assets/button-finney.png";
import imageBitbox from "../assets/button-bitbox.svg";
import imageTrezor from "../assets/button-trezor.svg";
import imageSecalot from "../assets/button-secalot.svg";
import imageKeepKey from "../assets/button-keepkey.svg";

import RadioButtonGroup from "./RadioButtonGroup.vue";
import Button from "./Button.vue";
import Modal from "./Modal.vue";
import CustomerSupportLink from "./CustomerSupportLink.vue";
import Warning from "./Warning.vue";

export enum AccessHardwareOption {
    Ledger = "ledger",
    Finney = "finney",
    Bitbox = "bitbox",
    Trezor = "trezor",
    Secalot = "secalot",
    Keepkey = "keepkey"
}

interface HardwareAttributes {
    supported: boolean;
    label: string;
    image: string;
    value: AccessHardwareOption;
}

export const HardwareOptions: Map<
AccessHardwareOption,
HardwareAttributes
> = new Map([
    [
        AccessHardwareOption.Ledger,
        {
            supported: true,
            label: "Ledger",
            value: AccessHardwareOption.Ledger,
            image: imageLedger
        }
    ],
    [
        AccessHardwareOption.Finney,
        {
            supported: false,
            label: "FINNEY",
            value: AccessHardwareOption.Finney,
            image: imageFinney
        }
    ],
    [
        AccessHardwareOption.Bitbox,
        {
            supported: false,
            label: "Digital Bitbox",
            value: AccessHardwareOption.Bitbox,
            image: imageBitbox
        }
    ],
    [
        AccessHardwareOption.Trezor,
        {
            supported: false,
            label: "Trezor",
            value: AccessHardwareOption.Trezor,
            image: imageTrezor
        }
    ],
    [
        AccessHardwareOption.Secalot,
        {
            supported: false,
            label: "Secalot",
            value: AccessHardwareOption.Secalot,
            image: imageSecalot
        }
    ],
    [
        AccessHardwareOption.Keepkey,
        {
            supported: false,
            label: "KeepKey",
            value: AccessHardwareOption.Keepkey,
            image: imageKeepKey
        }
    ]
]);

export interface State {
    isOpen: boolean;
    isBusy: boolean;
    optionSelected: string;
    disableButton: boolean;
}

export interface Props {
    state: State;
}

export default defineComponent({
    components: {
        RadioButtonGroup,
        Button,
        Modal,
        CustomerSupportLink,
        Warning
    },
    model: {
        prop: "state",
        event: "change"
    },
    props: { state: (Object as unknown) as PropType<State> },
    setup(props: Props, context: SetupContext) {
        const chromeWarning = computed(() => `${context.root.$t("warning.browserWarningBody1").toString()
        }\n${
            context.root.$t("warning.browserWarningBody2").toString()}`);

        const isChrome = computed(() => new UAParser(navigator.userAgent).getBrowser().name === "Chrome");

        const requiresChrome = computed(() => props.state.optionSelected === AccessHardwareOption.Ledger);

        function handleModalChangeIsOpen(isOpen: boolean): void {
            context.emit("change", { ...props.state, isOpen });
        }

        function handleSubmit(): void {
            context.emit("submit", props.state.optionSelected);
        }

        watch(
            () => props.state.isOpen,
            (newVal: boolean) => {
                if (newVal) {
                    props.state.optionSelected = "";
                }
            }
        );

        watch(
            () => props.state.optionSelected.length,
            () => {
                // if require chrome but not chrome, or if nothing selected, disable button
                props.state.disableButton =
                    !isChrome.value && requiresChrome.value ||
                    props.state.optionSelected.length === 0;
            }
        );

        const options = computed(() => [ ...HardwareOptions.values() ]);

        const selected = computed(() => props.state.optionSelected !== "");

        const instructions = computed(() => {
            switch (props.state.optionSelected) {
                case AccessHardwareOption.Ledger:
                    if (isChrome.value) {
                        return context.root
                            .$t("modalAccessByHardware.ledgerInstructions")
                            .toString();
                    }
                    return context.root
                        .$t("modalAccessByHardware.ledgerChromeOnly")
                        .toString();

                case AccessHardwareOption.Trezor:
                    return context.root
                        .$t("modalAccessByHardware.trezorInstructions")
                        .toString();
                case "":
                default:
                    return context.root.$t("common.continue").toString();
            }
        });

        return {
            options,
            selected,
            instructions,
            handleModalChangeIsOpen,
            handleSubmit,
            isChrome,
            chromeWarning,
            requiresChrome
        };
    }
});
</script>

<style lang="postcss" scoped>
.modal-access-by-hardware {
    align-items: stretch;
    display: flex;
    flex-direction: column;
}

.instructions {
    align-items: center;
    color: var(--color-china-blue);
    display: flex;
    flex-direction: column;
    margin-block-start: 0;
    max-height: 0;
    overflow: hidden;
    text-align: center;
    transition: 0.3s;

    &.bold {
        font-weight: 500;
    }

    &.open {
        margin-block-start: 20px;
        max-height: 100px;
    }

    @media (prefers-reduced-motion) {
        transition: none;
    }
}

.button-choose-a-hardware {
    margin-block: 40px 20px;
}
</style>
