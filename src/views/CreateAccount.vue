<template>
    <div class="access-my-account">
        <div class="wrap">
            <PageTitle title="Create A New Account">
                Already Have One?
                <router-link :to="{ name: 'access-my-account' }">
                    Access My Account
                </router-link>
            </PageTitle>
            <AccountTileButtons @click="handleClickTiles" />
        </div>
        <FAQs />
        <ModalAccessByHardware v-model="state.modalAccessByHardwareIsOpen" />
        <ModalCreateWithSoftware
            v-model="state.modalCreateWithSoftwareIsOpen"
            @submit="handleCreateWithSoftwareSubmit"
        />
        <ModalCreateByPhrase
            v-model="state.modalCreateByPhraseIsOpen"
            @submit="handleCreateByPhraseSubmit"
        />
        <ModalCreateByKeystore
            v-model="state.modalCreateByKeystoreState"
            @submit="handleCreateByKeystoreSubmit"
        />
        <ModalDownloadKeystore
            v-model="state.modalDownloadKeystoreState"
            @submit="handleDownloadKeystoreSubmit"
        />
        <ModalEnterAccountId
            v-model="state.modalEnterAccountIdIsOpen"
            :private-key="state.privateKey"
            @submit="handleAccountIdSubmit"
            @noAccount="handleDoesntHaveAccount"
        />
        <ModalRequestToCreateAccount
            v-if="state.privateKey != null"
            v-model="state.modalRequestToCreateAccountIsOpen"
            :public-key="state.privateKey.publicKey"
            @hasAccount="handleHasAccount"
        />
    </div>
</template>

<script lang="ts">
import FAQs from "../components/FAQs.vue";
import AccountTileButtons from "../components/AccountTileButtons.vue";
import ModalAccessByHardware from "../components/ModalAccessByHardware.vue";
import ModalEnterAccountId from "../components/ModalEnterAccountId.vue";
import ModalRequestToCreateAccount from "../components/ModalRequestToCreateAccount.vue";
import ModalCreateWithSoftware, {
    CreateSoftwareOption
} from "../components/ModalCreateWithSoftware.vue";
import ModalCreateByPhrase from "../components/ModalCreateByPhrase.vue";
import ModalDownloadKeystore, {
    State as DownloadKeystoreState
} from "../components/ModalDownloadKeystore.vue";
import ModalCreateByKeystore from "../components/ModalCreateByKeystore.vue";
import PageTitle from "../components/PageTitle.vue";
import {
    createComponent,
    reactive,
    ref,
    SetupContext
} from "@vue/composition-api";
import { State as CreateByKeystoreState } from "../components/ModalCreateByKeystore.vue";
import store from "../store";
import { Client, Ed25519PrivateKey } from "@hashgraph/sdk";
import { Id } from "../store/modules/wallet";
import { ALERT, LOG_IN } from "../store/actions";

interface State {
    privateKey: Ed25519PrivateKey | null;

    modalAccessByHardwareIsOpen: boolean;
    modalCreateWithSoftwareIsOpen: boolean;
    modalCreateByPhraseIsOpen: boolean;
    modalSuccessIsOpen: boolean;
    modalEnterAccountIdIsOpen: boolean;
    modalRequestToCreateAccountIsOpen: boolean;

    modalCreateByKeystoreState: CreateByKeystoreState;
    modalDownloadKeystoreState: DownloadKeystoreState;

    keyFile: Uint8Array | null;
}

export default createComponent({
    components: {
        FAQs,
        AccountTileButtons,
        ModalAccessByHardware,
        ModalCreateWithSoftware,
        PageTitle,
        ModalCreateByPhrase,
        ModalCreateByKeystore,
        ModalDownloadKeystore,
        ModalEnterAccountId,
        ModalRequestToCreateAccount
    },
    setup(props: object, context: SetupContext) {
        const state = reactive<State>({
            keyFile: null,
            modalAccessByHardwareIsOpen: false,
            modalCreateByKeystoreState: {
                modalIsOpen: false,
                password: "",
                isBusy: false,
                passwordStrength: 0,
                passwordSuggestion: ""
            },
            modalCreateByPhraseIsOpen: false,
            modalCreateWithSoftwareIsOpen: false,
            modalDownloadKeystoreState: {
                modalIsOpen: false,
                isBusy: true
            },
            modalEnterAccountIdIsOpen: false,
            modalRequestToCreateAccountIsOpen: false,
            modalSuccessIsOpen: false,
            privateKey: null
        });

        const keyStoreLink = ref<HTMLAnchorElement | null>(null);

        function handleClickTiles(which: string) {
            if (which === "hardware") {
                state.modalAccessByHardwareIsOpen = true;
            } else if (which === "software") {
                state.modalCreateWithSoftwareIsOpen = true;
            }
        }

        function handleCreateWithSoftwareSubmit(which: CreateSoftwareOption) {
            state.modalCreateWithSoftwareIsOpen = false;

            setTimeout(() => {
                if (which === CreateSoftwareOption.File) {
                    state.modalCreateByKeystoreState.modalIsOpen = true;
                } else if (which === CreateSoftwareOption.Phrase) {
                    state.modalCreateByPhraseIsOpen = true;
                }
            }, 125);
        }

        async function handleCreateByKeystoreSubmit() {
            state.modalCreateByKeystoreState.modalIsOpen = false;

            setTimeout(() => {
                state.modalDownloadKeystoreState.modalIsOpen = true;
            }, 125);
            try {
                state.privateKey = await Ed25519PrivateKey.generate();
                state.keyFile = await state.privateKey.createKeystore(
                    state.modalCreateByKeystoreState.password
                );
                if (state.keyFile == null) {
                    throw new Error(
                        "This shouldn't be possible, but we got a null from key.value.createKeystore"
                    );
                }

                state.modalDownloadKeystoreState.isBusy = false;
                const keyStoreBlob = new Blob([
                    state.keyFile.buffer as Uint8Array
                ]);
                const keyStoreUrl = URL.createObjectURL(keyStoreBlob);

                keyStoreLink.value = document.createElement(
                    "a"
                ) as HTMLAnchorElement;
                keyStoreLink.value.href = keyStoreUrl;
                keyStoreLink.value.download =
                    "keystore-" + new Date().toISOString();
            } catch (error) {
                console.log(error);
                await store.dispatch(ALERT, {
                    level: "error",
                    message: "Unable to Download"
                });
            }
        }

        function handleDownloadKeystoreSubmit() {
            context.root.$el.append(keyStoreLink.value as Node);
            // Neither keystorelink or key should ever be null if we got to this point, however this is
            // mostly a sanity check.
            if (keyStoreLink.value == null || state.privateKey == null) {
                return;
            }

            keyStoreLink.value.click();
            context.root.$el.removeChild(
                keyStoreLink.value as HTMLAnchorElement
            );

            setTimeout(
                () => (state.modalRequestToCreateAccountIsOpen = true),
                125
            );
            state.modalDownloadKeystoreState.modalIsOpen = false;
        }

        function handleCreateByPhraseSubmit(newPrivateKey: Ed25519PrivateKey) {
            state.modalCreateByPhraseIsOpen = false;

            state.privateKey = newPrivateKey;

            setTimeout(() => {
                state.modalRequestToCreateAccountIsOpen = true;
            }, 125);
        }

        function openInterface() {
            context.root.$router.push({ name: "interface" });
        }

        async function handleAccountIdSubmit(client: Client, account: Id) {
            await store.dispatch(LOG_IN, {
                account,
                client,
                privateKey: state.privateKey
            });

            openInterface();
        }

        function handleDoesntHaveAccount() {
            state.modalEnterAccountIdIsOpen = false;
            state.modalRequestToCreateAccountIsOpen = true;
        }

        function handleHasAccount() {
            state.modalRequestToCreateAccountIsOpen = false;
            state.modalEnterAccountIdIsOpen = true;
        }

        return {
            state,
            handleClickTiles,
            handleCreateWithSoftwareSubmit,
            handleCreateByKeystoreSubmit,
            handleDownloadKeystoreSubmit,
            handleCreateByPhraseSubmit,
            handleAccountIdSubmit,
            handleHasAccount,
            handleDoesntHaveAccount
        };
    }
});
</script>

<style lang="postcss" scoped>
a {
    color: var(--color-melbourne-cup);
    cursor: pointer;
    text-decoration: none;
}

a:hover,
a:focus {
    text-decoration: underline;
}

.access-my-account {
    display: flex;
    flex-direction: column;
}

.wrap {
    align-items: center;
    display: flex;
    flex-direction: column;
    padding: 80px 0;

    @media (max-width: 600px) {
        padding: 20px;
    }
}
</style>
