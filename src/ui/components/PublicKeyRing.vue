<template>
    <div>
        <div class="header">
            <div class="title">
                {{ $t('interfaceCreateAccount.publicKey') }}
            </div>
            <div class="subtitle">
                <!-- find actual text for this -->
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Iure, enim tempore natus mollitia, quis reprehenderit.
            </div>
        </div>
        <div>
            <div v-if="isList.value">
                <!-- If isList dislay the threshold picker for the list, also need to translate all the text and add an opptional data flattener for if the user adds a single list of keys (maybe?) -->
            </div>
        </div>
        <div
            v-if="state.numOfKeys > 0"
        >
            <div
                v-for="keys in state.keyRing"
                :key="keys.key[0]"
            >
                <!-- translate -->
                <ReadOnlyInput
                    :value="truncateKeys(keys.key)"
                    :suffix="keys.threshold"
                />
            </div>
        </div>
        <div class="buttons">
            <Button
                outline
                compact
                :label="$t('interfaceCreateAccount.addKey')"
                :disabled="state.isFormOpen"
                @click="handleOpenForm"
            />
        </div>
        <hr>
        <ModalNewKeyForm
            v-model="state.newKeyState"
            :state="state.newKeyState"
            :is-open="state.isOpen"
            @add="handleAddInput"
            @submit="handleSubmit"
            @dismiss="handleCloseForm"
            @remove="handleRemoveInput"
        />
    </div>
</template>
<script lang="ts">
import {
    defineComponent,
    reactive,
    watch,
    computed
} from "@vue/composition-api";
import { mdiPlus, mdiMinusCircleOutline, mdiPlaylistPlus } from "@mdi/js";

import ReadOnlyInput from "./ReadOnlyInput.vue";
import Button from "./Button.vue";
import SwitchButton from "./SwitchButton.vue";
import FlatButton from "./FlatButton.vue";
import ModalNewKeyForm, { State as NewKeyState } from "./ModalNewKeyForm.vue";

export interface Key {
    keyType?: string;
    threshold?: string;
    isKeyValid: boolean;
    key: Key[] | string[];
}

export interface FormatedKey {
    threshold?: number;
    keyList: FormatedKey[] | string[];
}

interface State {
    keyRing: FormatedKey[];
    rootThreshold: number;
    areKeysValid: boolean;
    numOfKeys: number;
    isOpen: boolean;
    newKeyState: NewKeyState;
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

function truncateKeys(keys: Key[]): string {
    if (keys.length > 1) {
        return keys.map((key) => `${key.key[ 0 ].slice(0, 5)}...`).join("");
    }
    return `${keys[ 0 ].slice(0, 5)}...`;
}

export default defineComponent({
    components: {
        ReadOnlyInput,
        Button,
        SwitchButton,
        FlatButton,
        ModalNewKeyForm
    },
    setup(props, context) {
        const state = reactive<State>({
            keyRing: [],
            rootThreshold: 0,
            areKeysValid: false,
            numOfKeys: 0,
            isOpen: false,
            newKeyState: {
                key: [
                    {
                        isKeyValid: false,
                        key: [ "" ]
                    }
                ],
                threshold: "1",
                areKeysValid: true,
                numOfKeys: 1
            }
        });

        const isList = computed(() => state.numOfKeys > 1);

        watch(
            // /watches for changes of the "final Keyring"
            () =>
                state.keyRing.map((key) => key.key.length === 1 ?
                    key.key[ 0 ] :
                    key.key.map((subKey) => subKey.key[ 0 ])),
            async() => {
                context.emit("keyRing", {
                    key: {
                        keyList: state.keyRing,
                        threshold: state.rootThreshold
                    },
                    validity: state.areKeysValid
                });
            }
        );

        watch(
            () => state.newKeyState.key.map((key) => key.key[ 0 ]),
            async() => {
                await validateKeys(state.newKeyState.key);
            }
        );

        watch(
            () => [ state.newKeyState.numOfKeys, state.newKeyState.threshold ],
            () => {
                if (state.newKeyState.numOfKeys < parseInt(state.newKeyState.threshold)) {
                    state.newKeyState.threshold = state.newKeyState.numOfKeys.toString();
                }
                if (parseInt(state.newKeyState.threshold) === 0) {
                    state.newKeyState.threshold = "1";
                }
            }
        );
        // for use only on the new  KeyState
        async function validateKeys(key: Key[]): Promise<void> {
            let invalid = 0;
            for (const k of key) {
                // eslint-disable-next-line no-await-in-loop
                const valid = await isPublicKeyValid(k.key[ 0 ] as string);
                if (!valid) {
                    invalid++;
                    k.isKeyValid = false;
                }
            }
            state.newKeyState.areKeysValid = invalid < 1;
        }

        function processForm(key: NewKeyState): void {
            const newKey = key.key.length > 1 ? key.key.map((key) => ({
                key: key.key,
                threshold: 1
            })
            ) : key.key[ 0 ].key;
            state.keyRing.push({
                threshold: parseInt(key.threshold),
                key: newKey
            });
        }

        function handleOpenForm(): void {
            state.isOpen = true;
            resetForm();
            context.emit("newKeyForm", true);
        }

        function handleCloseForm(): void {
            state.isOpen = false;
            context.emit("formOpen", false);
        }

        function handleAddInput(): void {
            state.newKeyState.key.push({
                isKeyValid: false,
                key: [ "" ]
            });
            state.newKeyState.numOfKeys += 1;
        }

        function handleRemoveInput(index: number): void {
            state.newKeyState.key.splice(index, 1);
            state.newKeyState.numOfKeys -= 1;
        }

        async function handleSubmit(): Promise<void> {
            if (state.newKeyState.areKeysValid) {
                processForm(state.newKeyState);
                state.numOfKeys += 1;
                state.areKeysValid = true;
                handleCloseForm();
            }
        }

        function resetForm(): void {
            state.newKeyState.key.push({
                isKeyValid: false,
                key: [ "" ]
            });
            state.newKeyState.key.splice(0, state.newKeyState.key.length - 1);
            state.newKeyState.threshold = "1";
            state.newKeyState.numOfKeys = 1;
            state.newKeyState.areKeysValid = true;
        }

        return {
            state,
            isList,
            mdiPlus,
            mdiPlaylistPlus,
            mdiMinusCircleOutline,
            handleOpenForm,
            handleAddInput,
            handleCloseForm,
            handleSubmit,
            handleRemoveInput,
            truncateKeys
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

.subtitle{
    font-size: 14px;
    padding-inline: 8px;
    margin-block-end: 10px;
}

.text-block {
    align-items: center;
    display: flex;
    flex-direction: row;
}

.threshold {
    display: flex;
    align-items: center;
}

.head {
    align-items: center;
    display: flex;
    flex-direction: row;
    min-height: 66px;
}

.buttons {
    width: 100%;
    margin-block-start: 25px;
    display: flex;
    justify-content: center;
}

input[type="number"]::-webkit-outer-spin-button,
input[type="number"]::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
}

hr {
    border: 1px solid var(--color-peral);
}

</style>
