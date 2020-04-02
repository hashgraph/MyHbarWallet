<template>
    <div>
        <div class="head">
            <span class="title">{{
                isList
                    ? $t("interfaceCreateAccount.keyList")
                    : $t("interfaceCreateAccount.publicKey")
            }}</span>
            <div class="spacer" />
            <div
                v-if="isList"
                class="threshold"
            >
                <p>
                    {{ $t("interfaceCreateAccount.thresholdLimit") }}:
                    <input
                        v-model="state.rootThreshold"
                        type="number"
                        class="number-input"
                        :step="false"
                    >
                    /
                    <!-- this will be the threshold input -->
                    {{ state.numOfInputs }}
                </p>
            </div>
            <FlatButton
                class="add-key"
                :icon="mdiPlus"
                @click="genNewKey('single')"
            />
            <FlatButton
                class="add-list"
                :icon="mdiPlaylistPlus"
                @click="genNewKey('list')"
            />
        </div>
        <hr v-if="isList">
        <!-- This conditionaly renders a key list based on the the state.keyRing, rendering either a list or single key based on key type. -->
        <div
            v-for="(key, index) in state.keyRing"
            :key="key.listKey"
        >
            <div
                v-if="key.keyType === 'list'"
                class="key-list key"
            >
                <div class="head">
                    <span class="title">{{
                        $t("interfaceCreateAccount.keyList")
                    }}</span>
                    <div class="spacer" />
                    <div class="threshold">
                        {{ $t("interfaceCreateAccount.thresholdLimit") }}:
                        <div>
                            <input
                                v-model="key.thresholdLimit"
                                class="number-input"
                                type="number"
                            >
                            /
                            <!-- this will be the threshold input -->
                            {{ key.key.length }}
                        </div>
                    </div>
                    <FlatButton
                        class="add-key"
                        :icon="mdiPlus"
                        @click="handleAddSubKey(index)"
                    />
                </div>
                <div
                    v-for="(subKey, subIndex) in key.key"
                    :key="subKey.listKey"
                    class="single-key"
                >
                    <div class="text-block">
                        <TextInput
                            v-model="subKey.key[0]"
                            :error="subKey.keyError"
                            :valid="subKey.isPublicKeyValid"
                            :placeholder="
                                $t('interfaceCreateAccount.publicKey')
                            "
                            :spellcheck-disabled="true"
                            :autocomplete-disabled="true"
                            show-validation
                        />
                        <FlatButton
                            :icon="mdiMinus"
                            @click="handleRemoveSubField(index, subIndex)"
                        />
                    </div>
                </div>
            </div>
            <div
                v-else
                class="single-key key"
            >
                <div
                    v-if="isList"
                    class="head"
                >
                    <span class="title">{{
                        $t("interfaceCreateAccount.publicKey")
                    }}</span>
                    <div class="spacer" />
                </div>
                <div class="text-block">
                    <TextInput
                        v-model="key.key[0]"
                        :error="key.keyError"
                        :valid="key.isPublicKeyValid"
                        :placeholder="$t('interfaceCreateAccount.publicKey')"
                        :spellcheck-disabled="true"
                        :autocomplete-disabled="true"
                        show-validation
                    />
                    <FlatButton
                        v-if="isList"
                        :icon="mdiMinus"
                        @click="handleRemoveField(index)"
                    />
                </div>
            </div>
            <hr>
        </div>
    </div>
</template>
<script lang="ts">
import {
    defineComponent,
    reactive,
    watch,
    computed
} from "@vue/composition-api";
import { mdiPlus, mdiMinus, mdiPlaylistPlus } from "@mdi/js";

import TextInput from "./TextInput.vue";
import Button from "./Button.vue";
import SwitchButton from "./SwitchButton.vue";
import FlatButton from "./FlatButton.vue";

export interface Key {
    keyError: string;
    isPublicKeyValid: boolean;
    keyType: string;
    thresholdLimit: number;
    key: Key[] | string[];
}

export interface FormatedKey {
    threshold?: number;
    keyList: FormatedKey[] | string[];
}

interface State {
    keyRing: Key[];
    rootThreshold: number;
    areKeysValid: boolean;
    numOfInputs: number;
}

function newKey(type: string): Key {
    return {
        keyError: "",
        isPublicKeyValid: false,
        thresholdLimit: 1,
        keyType: type,
        key: type === "single" ? [ "" ] : [ newKey("single"), newKey("single") ]
    };
}

async function isPublicKeyValid(key: string): Promise<boolean> {
    const { Ed25519PublicKey, BadKeyError } = await import(/* webpackChunkName: "hashgraph" */ "@hashgraph/sdk");
    try {
        Ed25519PublicKey.fromString(key);
        return true;
    } catch (error) {
        if (error instanceof BadKeyError) {
            // The exception message changes depending on the input
            return false;
        }
        throw error;
    }
}

function formatedKeys(keyRing: Key[]): FormatedKey[] {
    // building the format required in the sdk
    const keys: unknown[] = keyRing.map((key) => {
        let keyList: unknown[] = [];
        if (typeof key.key[ 0 ] === "string") {
            keyList = key.key;
        } else {
            (key.key as Key[]).forEach((subKey) => {
                keyList.push({ keyList: subKey.key, threshold: 1 });
            });
        }
        return { keyList, threshold: key.thresholdLimit };
    });

    return keys as FormatedKey[];
}

export default defineComponent({
    components: {
        TextInput,
        Button,
        SwitchButton,
        FlatButton
    },
    setup(props, context) {
        const state = reactive<State>({
            keyRing: [
                {
                    keyError: "",
                    isPublicKeyValid: false,
                    keyType: "single",
                    thresholdLimit: 0,
                    key: [ "" ]
                }
            ],
            rootThreshold: 0,
            areKeysValid: false,
            numOfInputs: 1
        });

        // eslint-disable-next-line sonarjs/cognitive-complexity
        async function validateKeys(keyRing: Key[]): Promise<void> {
            let invalid = 0;
            if (keyRing[ 0 ].key[ 0 ] != null) {
                for (const key of keyRing) {
                    if (typeof key.key[ 0 ] === "string") {
                        // eslint-disable-next-line no-await-in-loop
                        key.isPublicKeyValid = await isPublicKeyValid(key
                            .key[ 0 ] as string);
                        if (key.isPublicKeyValid === false) {
                            invalid++;
                        }
                    } else {
                        for (const subKey of key.key as Key[]) {
                            // eslint-disable-next-line no-await-in-loop
                            subKey.isPublicKeyValid = await isPublicKeyValid(subKey
                                .key[ 0 ] as string);
                            if (subKey.isPublicKeyValid === false) {
                                invalid++;
                            }
                        }
                    }
                }
            }
            state.areKeysValid = invalid < 1;
        }

        watch(
            // watches the nested content to maintain valid threshold limits
            () => [
                state.keyRing.map((key) => key.thresholdLimit),
                state.keyRing.map((key) => key.key.length)
            ],
            () => {
                state.keyRing.forEach((key) => {
                    if (key.key.length < key.thresholdLimit) {
                        key.thresholdLimit = key.key.length;
                    } else if (
                        key.thresholdLimit <= 0 ||
                        key.key.length === 1 && key.thresholdLimit !== 1
                    ) {
                        key.thresholdLimit = 1;
                    }
                });
            }
        );

        watch(
            // watches for changes in the root keyring and keeps the threshold valid
            () => [ state.keyRing.length, state.rootThreshold ],
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            ([ newLength, newThreshold ]) => {
                if (state.rootThreshold > state.keyRing.length) {
                    state.rootThreshold = state.keyRing.length;
                }
                if (newThreshold <= 0) {
                    state.rootThreshold = 1;
                }
            }
        );

        watch(
            // /watches for changes on the text input fields
            () =>
                state.keyRing.map((key) => key.keyType === "single" ?
                    key.key[ 0 ] :
                    (key.key as Key[]).map((subKey) => subKey.key[ 0 ])),
            async() => {
                await validateKeys(state.keyRing);
                context.emit("keyRing", {
                    key: {
                        keyList: formatedKeys(state.keyRing),
                        threshold: state.rootThreshold
                    },
                    validity: state.areKeysValid
                });
            }
        );

        const isList = computed(() => state.numOfInputs > 1);

        function genNewKey(type: string): void {
            state.numOfInputs++;
            state.keyRing.push(newKey(type));
        }

        function handleAddSubKey(idx: number): void {
            (state.keyRing[ idx ].key as Key[]).push(newKey("single"));
        }

        function handleRemoveField(idx: number): void {
            if (state.numOfInputs > 1) {
                state.keyRing.splice(idx, 1);
                state.numOfInputs--;
            }
        }

        function handleRemoveSubField(pIdx: number, idx: number): void {
            if (state.keyRing[ pIdx ].key.length > 1) {
                state.keyRing[ pIdx ].key.splice(idx, 1);
            } else if (state.keyRing[ pIdx ].key.length === 1) {
                handleRemoveField(pIdx);
            }
        }

        return {
            state,
            genNewKey,
            handleRemoveField,
            handleRemoveSubField,
            handleAddSubKey,
            isList,
            mdiPlus,
            mdiPlaylistPlus,
            mdiMinus
        };
    }
});
</script>

<style lang="postcss" scoped>
.title {
    align-self: center;
    display: block;
    font-size: 16px;
    font-weight: 600;
    height: 24px;
    margin-block-end: 13px;
    padding: 0 8px;
}

.text-block {
    align-items: center;
    display: flex;
    flex-direction: row;
}

.threshold {
    display: flex;
}

.head {
    align-items: center;
    display: flex;
    flex-direction: row;
    min-height: 66px;
}

.number-input {
    -webkit-appearance: textfield;
    background-color: var(--color-peral);
    border: 2px solid var(--color-peral);
    border-radius: 4px;
    outline: none;
    text-align: center;
    width: 2rem;

    &:focus {
        border: 2px solid var(--color-melbourne-cup);
    }
}

input[type="number"]::-webkit-outer-spin-button,
input[type="number"]::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
}

hr {
    border: 1px solid var(--color-peral);
}

.spacer {
    flex-grow: 1;
}

.single-key {
    display: flex;
    flex-direction: column;
    margin-block-end: 10px;
    padding-block-end: 24px;
}
</style>
