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
            v-model="modalEnterAccountIdState"
            @submit="handleAccountIdSubmit"
            @noAccount="handleDoesntHaveAccount"
        />
        <ModalRequestToCreateAccount
            v-model="modalRequestToCreateAccountIsOpen"
            :public-key="publicKey"
            @hasAccount="handleHasAccount"
        />
    </div>
</template>

<script lang="ts">
import FAQs from "../components/FAQs.vue";
import AccountTileButtons from "@/components/AccountTileButtons.vue";
import ModalAccessByHardware from "@/components/ModalAccessByHardware.vue";
import ModalEnterAccountId from "../components/ModalEnterAccountId.vue";
import ModalRequestToCreateAccount from "../components/ModalRequestToCreateAccount.vue";
import ModalCreateWithSoftware, {
    CreateSoftwareOption
} from "@/components/ModalCreateWithSoftware.vue";
import ModalCreateByPhrase from "../components/ModalCreateByPhrase.vue";
import ModalDownloadKeystore, {
    State as DownloadKeystoreState
} from "../components/ModalDownloadKeystore.vue";
import ModalCreateByKeystore from "../components/ModalCreateByKeystore.vue";
import PageTitle from "../components/PageTitle.vue";
import { createComponent, value, Wrapper } from "vue-function-api";
import { State as CreateByKeystoreState } from "../components/ModalCreateByKeystore.vue";
import store from "@/store";
import { LOG_IN } from "@/store/mutations";
import { Client } from "hedera-sdk-js";

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
        const privateKey: Wrapper<string | null> = value(null);
        const publicKey: Wrapper<string | null> = value(null);

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

        const modalEnterAccountIdState = value({
            modalIsOpen: false,
            account: null,
            error: null as null | string,
            isBusy: false
        });

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

        function handleCreateByKeystoreSubmit() {
            modalCreateByKeystoreState.value.modalIsOpen = false;

            setTimeout(() => {
                modalDownloadKeystoreState.value.modalIsOpen = true;
            }, 125);

            setTimeout(() => {
                modalDownloadKeystoreState.value.isBusy = false;
            }, 5000);
        }

        function handleDownloadKeystoreSubmit() {
            modalDownloadKeystoreState.value.modalIsOpen = false;

            setTimeout(() => {
                modalSuccessIsOpen.value = true;
            }, 125);
        }

        function handleCreateByPhraseSubmit(
            newPrivateKey: string,
            newPublicKey: string
        ) {
            modalCreateByPhraseIsOpen.value = false;

            privateKey.value = newPrivateKey;
            publicKey.value = newPublicKey;

            console.log(newPrivateKey, newPublicKey);

            setTimeout(() => {
                modalRequestToCreateAccountIsOpen.value = true;
            }, 125);
        }

        function openInterface() {
            context.root.$router.push({ name: "interface" });
        }

        async function handleAccountIdSubmit() {
            modalEnterAccountIdState.value.error = null;
            modalEnterAccountIdState.value.isBusy = true;

            const account = modalEnterAccountIdState.value.account;

            if (account == null || privateKey.value == null) {
                throw new Error("unexpected submission of EnterAccountID");
            }

            try {
                const client = new Client({
                    account,
                    privateKey: privateKey.value
                });

                // If getting account balance doesn't throw an error then we know that
                // the account id and private key the user entered are valid
                await client.getAccountBalance();

                // Set Account and Client if `client.getBalance()` doesn't throw an error
                store.commit(LOG_IN, {
                    account: modalEnterAccountIdState.value.account,
                    client,
                    privateKey: privateKey.value,
                    publicKey: publicKey.value
                });

                openInterface();
            } catch (error) {
                console.warn(error);

                // FIXME: Look at these atomic warnings
                // FIXME: This should be a "This account is not associated with your private key" error but balance transactions
                //        don't have their signatures checked

                /* eslint-disable-next-line require-atomic-updates */
                modalEnterAccountIdState.value.error =
                    "This account does not exist in the network.";

                // Only update isBusy if getting account balance failed
                /* eslint-disable-next-line require-atomic-updates */
                modalEnterAccountIdState.value.isBusy = false;
            }
        }

        function handleDoesntHaveAccount() {
            modalEnterAccountIdState.value.modalIsOpen = false;
            modalRequestToCreateAccountIsOpen.value = true;
        }

        function handleHasAccount() {
            modalRequestToCreateAccountIsOpen.value = false;
            modalEnterAccountIdState.value.modalIsOpen = true;
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
            modalEnterAccountIdState,
            modalRequestToCreateAccountIsOpen,
            handleAccountIdSubmit,
            handleHasAccount,
            handleDoesntHaveAccount,
            publicKey
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
