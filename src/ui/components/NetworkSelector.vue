<template>
    <div class="network-selector">
        <Select
            v-model="state.networkSelected"
            class="select"
            :options="networkOptions"
            @change="handleSelectChange"
        />
        <div :class="{ details: true, expand: isCustom }">
            <Notice
                :symbol="mdiInformationOutline"
                class="notice"
            >
                {{ $t("networkSelector.customRestrictions") }}
            </Notice>
            <div class="notice-box">
                <IDInput
                    ref="idInput"
                    v-model="state.idInput"
                    :error="state.nodeError"
                    :placeholder="$t('networkSelector.id')"
                    show-validation
                    class="input"
                    @valid="handleIdValid"
                    @input="handleIdInput"
                    @click.native.stop
                />
                <TextInput
                    v-model="state.address"
                    :valid="addressIsValid"
                    :error="state.addressError"
                    :placeholder="$t('networkSelector.address')"
                    show-validation
                    class="input"
                    @input="handleAddressInput"
                    @click.native.stop
                />
            </div>
        </div>
    </div>
</template>
<script lang="ts">
import { computed, defineComponent, reactive, Ref, ref, SetupContext, watch } from "@vue/composition-api";
import { mdiInformationOutline } from "@mdi/js";
import { Vue } from "vue/types/vue";

import i18n from "../../service/i18n";
import { NetworkName, NodeId, NetworkSettings } from "../../domain/network";

import Select from "./Select.vue";
import Notice from "./Notice.vue";
import IDInput, { IdInputElement } from "./IDInput.vue";
import Button from "./Button.vue";
import TextInput from "./TextInput.vue";

// Can't believe I've done this
// Shim for using this element programmatically
export type NetworkSelectorElement = Vue & {
    emitNetwork(): void;
    setNodeError(message: string): void;
    setAddressError(message: string): void;
};

// eslint-disable-next-line unicorn/no-unsafe-regex
const IP_AND_PORT_REGEX = /^(?:(?:25[0-5]|2[0-4]\d|[01]?\d{1,2})\.){3}(?:25[0-5]|2[0-4]\d|[01]?\d{1,2})(:\d{1,5})?$/;
const URL_REGEX = /https?:\/\/(www\.)?[\w#%+-.:=@~]{2,256}\.[a-z]{2,4}\b([\w#%&+-./:=?@~]*)/;

function isValidAddress(address: string): boolean {
    return IP_AND_PORT_REGEX.test(address) || URL_REGEX.test(address);
}

export function translate(key: NetworkName): string {
    return i18n.t(key).toString();
}

// Can't believe I've done this
export function untranslate(value: string): NetworkName {
    // eslint-disable-next-line default-case
    switch (value) {
        case translate(NetworkName.MAINNET):
            return NetworkName.MAINNET;
        case translate(NetworkName.TESTNET):
            return NetworkName.TESTNET;
        case translate(NetworkName.CUSTOM):
            return NetworkName.CUSTOM;
    }

    return NetworkName.TESTNET;
}

export default defineComponent({
    components: {
        Button,
        IDInput,
        Select,
        TextInput,
        Notice
    },
    props: { network: String },
    setup(props, context: SetupContext) {
        const state = reactive({
            networkSelected: props.network ?? translate(NetworkName.MAINNET),
            address: "",
            idInput: "",
            id: null as NodeId | null,
            idValid: false,
            nodeError: "",
            addressError: ""
        });

        const idInput: Ref<IdInputElement | null> = ref(null);

        function clearState(): void {
            state.address = "";
            (idInput.value as IdInputElement).clear();
            state.idInput = "";
            state.id = null;
        }

        // eslint-disable-next-line compat/compat
        const networkOptions = computed(() => Object.values(NetworkName).map(translate));
        const addressIsValid = computed(() => isValidAddress(state.address));
        const isCustom = computed(() => state.networkSelected === translate(NetworkName.CUSTOM));

        function handleSelectChange(): void {
            clearState();
            emitNetwork();
        }

        function handleIdInput(input: string, id: import("@hashgraph/sdk").AccountId): void {
            state.nodeError = "";
            if (id != null) {
                // Mismatch between "node" and "address"
                // Consider reimplementing IDInput to handle a general Id
                state.id = {
                    shard: id.shard,
                    realm: id.realm,
                    node: id.account
                } as NodeId;
            }
        }

        function handleAddressInput(): void {
            state.addressError = "";
        }

        function handleIdValid(valid: boolean): void {
            state.idValid = valid;
        }

        function emitNetwork(): void {
            const networkSettings: NetworkSettings = {
                name: untranslate(state.networkSelected),
                node: state.id!,
                address: state.address,
                proxy: null
            };

            context.emit("network", networkSettings);
        }

        function setNodeError(message: string): void {
            state.nodeError = message;
        }

        function setAddressError(message: string): void {
            state.addressError = message;
        }

        watch(
            () => {
                if (isCustom.value) {
                    return state.idValid && addressIsValid.value;
                }

                return true;
            },
            (result: boolean) => {
                context.emit("valid", result);
            }
        );

        return {
            props,
            state,
            idInput,
            networkOptions,
            addressIsValid,
            isCustom,
            mdiInformationOutline,
            handleSelectChange,
            handleIdInput,
            handleAddressInput,
            emitNetwork,
            handleIdValid,
            setNodeError,
            setAddressError
        };
    }
});
</script>

<style lang="postcss" scoped>
.network-selector {
    width: 100%;
}

.select {
    margin-block-end: 10px;
    width: 100%;
}

.details {
    align-items: center;
    display: flex;
    flex-flow: column nowrap;
    height: 0;
    opacity: 0;
    overflow: hidden;
    transition: opacity 0.5s, height 0.3s;
    width: 100%;

    &.expand {
        height: 100%;
        opacity: 1;
    }

    @media (prefers-reduced-motion) {
        transition: none;
    }
}

.notice-box {
    align-items: center;
    display: flex;
    flex-direction: column;
    width: 100%;
}

.input {
    padding-block-start: 10px;
}
</style>
