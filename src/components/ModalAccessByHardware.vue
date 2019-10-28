<template>
    <Modal
        :is-open="isOpen"
        :title="$t('modalAccessByHardware.title')"
        @change="this.$listeners.change"
    >
        <template v-slot:banner>
            <Warning v-if="!checkIsChrome" which-modal="hardware" />
        </template>
        <form class="modal-access-by-hardware" @submit.prevent="handleSubmit">
            <RadioButtonGroup
                v-model="state.optionSelected"
                name="hardware-access-option"
                :options="options.filter(option => option.supported)"
            />
            <div :class="{ instructions: true, open: selected }">
                <div>{{ instructions }}</div>
                <div>{{ $t("modalAccessByHardware.watchForPrompts") }}</div>
            </div>
            <Button
                :disabled="!state.disableButton"
                class="button-choose-a-hardware"
                :label="$t('modalAccessByHardware.chooseAHardware')"
            />
            <CustomerSupportLink />
        </form>
    </Modal>
</template>

<script lang="ts">
import {
    createComponent,
    reactive,
    watch,
    SetupContext,
    computed
} from "@vue/composition-api";
import Button from "../components/Button.vue";
import RadioButtonGroup from "../components/RadioButtonGroup.vue";
import imageLedger from "../assets/button-ledger.svg";
import imageFinney from "../assets/button-finney.png";
import imageBitbox from "../assets/button-bitbox.svg";
import imageTrezor from "../assets/button-trezor.svg";
import imageSecalot from "../assets/button-secalot.svg";
import imageKeepKey from "../assets/button-keepkey.svg";
import Modal from "../components/Modal.vue";
import CustomerSupportLink from "../components/CustomerSupportLink.vue";
import Warning from "../components/Warning.vue";
import { UAParser } from "ua-parser-js";

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
            label: "Ledger (Nano S)",
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

export default createComponent({
    components: {
        RadioButtonGroup,
        Button,
        Modal,
        CustomerSupportLink,
        Warning
    },
    model: {
        prop: "isOpen",
        event: "change"
    },
    props: {
        isOpen: { type: Boolean }
    },
    setup(props: { isOpen: boolean }, context: SetupContext) {
        const state = reactive({
            optionSelected: "",
            disableButton: false
        });

        const checkIsChrome =
            new UAParser(navigator.userAgent).getBrowser().name === "Chrome";

        function handleSubmit(): void {
            context.emit("submit", state.optionSelected);
        }

        watch(
            () => props.isOpen,
            (newVal: boolean) => {
                if (newVal) {
                    state.optionSelected = "";
                }
            }
        );

        watch(
            () => state.optionSelected.length,
            () => {
                if (!checkIsChrome && state.optionSelected.length === 0) {
                    state.disableButton = false;
                    return;
                }

                state.disableButton = true;
            }
        );

        const options = computed(() => {
            return [...HardwareOptions.values()];
        });

        const selected = computed(() => {
            return state.optionSelected !== "";
        });

        const instructions = computed(() => {
            switch (state.optionSelected) {
                case AccessHardwareOption.Ledger:
                    return context.root
                        .$t("modalAccessByHardware.ledgerInstructions")
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
            state,
            options,
            selected,
            instructions,
            handleSubmit,
            checkIsChrome
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

    & div:first-child {
        padding-block-end: 10px;
    }

    & div:last-child {
        font-weight: 500;
    }

    &.open {
        margin-block-start: 40px;
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
