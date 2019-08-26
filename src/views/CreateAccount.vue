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
        <ModalAccessByHardware v-model="modalAccessByHardwareIsOpen" />
        <ModalCreateWithSoftware
            v-model="modalCreateWithSoftwareIsOpen"
            @submit="handleCreateWithSoftwareSubmit"
        />
        <ModalCreateByPhrase
            v-model="modalCreateByPhraseIsOpen"
            @submit="handleCreateByPhraseSubmit"
        />
        <ModalCreateByKeystore
            v-model="modalCreateByKeystoreState"
            @submit="handleCreateByKeystoreSubmit"
        />
        <ModalDownloadKeystore
            v-model="modalDownloadKeystoreState"
            @submit="handleDownloadKeystoreSubmit"
        />
        <ModalEnterAccountId
            v-model="modalEnterAccountIdIsOpen"
            :private-key="privateKey"
            @submit="handleAccountIdSubmit"
            @noAccount="handleDoesntHaveAccount"
        />
        <ModalRequestToCreateAccount
            v-if="privateKey != null"
            v-model="modalRequestToCreateAccountIsOpen"
            :public-key="privateKey.publicKey"
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
import { createComponent, value, Wrapper } from "@vue/composition-api";
import { State as CreateByKeystoreState } from "../components/ModalCreateByKeystore.vue";
import store from "../store";
import { Client, Ed25519PrivateKey } from "@hashgraph/sdk";
import { Id } from "../store/modules/wallet";
import { ALERT, LOG_IN } from "../store/actions";

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
    setup(props, context) {
        const privateKey: Wrapper<Ed25519PrivateKey | null> = value(null);

        const modalAccessByHardwareIsOpen = value(false);
        const modalCreateWithSoftwareIsOpen = value(false);
        const modalCreateByPhraseIsOpen = value(false);
        const modalSuccessIsOpen = value(false);
        const modalCreateByKeystoreState: Wrapper<
            CreateByKeystoreState
        > = value({
            modalIsOpen: false,
            password: "",
            isBusy: false,
            passwordStrength: 0,
            passwordSuggestion: ""
        });

        const modalDownloadKeystoreState: Wrapper<
            DownloadKeystoreState
        > = value({
            modalIsOpen: false,
            isBusy: true
        });

        const modalEnterAccountIdIsOpen = value(false);

        const modalRequestToCreateAccountIsOpen = value(false);

        function handleClickTiles(which: string) {
            if (which === "hardware") {
                modalAccessByHardwareIsOpen.value = true;
            } else if (which === "software") {
                modalCreateWithSoftwareIsOpen.value = true;
            }
        }

        function handleCreateWithSoftwareSubmit(which: CreateSoftwareOption) {
            modalCreateWithSoftwareIsOpen.value = false;

            setTimeout(() => {
                if (which === CreateSoftwareOption.File) {
                    modalCreateByKeystoreState.value.modalIsOpen = true;
                } else if (which === CreateSoftwareOption.Phrase) {
                    modalCreateByPhraseIsOpen.value = true;
                }
            }, 125);
        }

        const keyFile: Wrapper<Uint8Array | null> = value(null);
        const keyStoreLink: Wrapper<HTMLAnchorElement | null> = value(null);

        async function handleCreateByKeystoreSubmit() {
            modalCreateByKeystoreState.value.modalIsOpen = false;

            setTimeout(() => {
                modalDownloadKeystoreState.value.modalIsOpen = true;
            }, 125);
            try {
                privateKey.value = await Ed25519PrivateKey.generate();
                keyFile.value = await privateKey.value.createKeystore(
                    modalCreateByKeystoreState.value.password
                );
                if (privateKey.value == null || keyFile.value == null) {
                    throw new Error(
                        "This shouldn't be possible, but we got a null from key.value.createKeystore"
                    );
                }

                modalDownloadKeystoreState.value.isBusy = false;
                const keyStoreBlob = new Blob([keyFile.value.buffer]);
                const keyStoreUrl = URL.createObjectURL(keyStoreBlob);

                keyStoreLink.value = document.createElement("a");
                keyStoreLink.value.href = keyStoreUrl;
                keyStoreLink.value.download =
                    "keystore-" + new Date().toISOString();
            } catch (error) {
                console.log(error);
                store.dispatch(ALERT, {
                    level: "error",
                    message: "Unable to Download"
                });
            }
        }

        function handleDownloadKeystoreSubmit() {
            context.root.$el.append(keyStoreLink.value as HTMLAnchorElement);
            // Neither keystorelink or key should ever be null if we got to this point, however this is
            // mostly a sanity check.
            if (keyStoreLink.value == null || privateKey.value == null) {
                return;
            }

            keyStoreLink.value.click();
            context.root.$el.removeChild(
                keyStoreLink.value as HTMLAnchorElement
            );

            setTimeout(
                () => (modalRequestToCreateAccountIsOpen.value = true),
                125
            );
            modalDownloadKeystoreState.value.modalIsOpen = false;
        }

        function handleCreateByPhraseSubmit(newPrivateKey: Ed25519PrivateKey) {
            modalCreateByPhraseIsOpen.value = false;

            privateKey.value = newPrivateKey;

            setTimeout(() => {
                modalRequestToCreateAccountIsOpen.value = true;
            }, 125);
        }

        function openInterface() {
            context.root.$router.push({ name: "interface" });
        }

        async function handleAccountIdSubmit(client: Client, account: Id) {
            store.dispatch(LOG_IN, {
                account,
                client,
                privateKey: privateKey.value
            });

            openInterface();
        }

        function handleDoesntHaveAccount() {
            modalEnterAccountIdIsOpen.value = false;
            modalRequestToCreateAccountIsOpen.value = true;
        }

        function handleHasAccount() {
            modalRequestToCreateAccountIsOpen.value = false;
            modalEnterAccountIdIsOpen.value = true;
        }

        return {
            modalAccessByHardwareIsOpen,
            modalCreateWithSoftwareIsOpen,
            modalCreateByPhraseIsOpen,
            modalDownloadKeystoreState,
            modalCreateByKeystoreState,
            modalSuccessIsOpen,
            handleClickTiles,
            handleCreateWithSoftwareSubmit,
            handleCreateByKeystoreSubmit,
            handleDownloadKeystoreSubmit,
            handleCreateByPhraseSubmit,
            modalEnterAccountIdIsOpen,
            modalRequestToCreateAccountIsOpen,
            handleAccountIdSubmit,
            handleHasAccount,
            handleDoesntHaveAccount,
            privateKey
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
