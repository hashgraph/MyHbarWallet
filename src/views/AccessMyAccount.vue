<template>
    <div class="access-my-account">
        <div class="wrap">
            <PageTitle title="Access My Account">
                Don't have an account?
                <router-link :to="{ name: 'create-account' }">
                    Create A New Account
                </router-link>
            </PageTitle>
            <AccountTileButtons @click="handleClickTiles" />
        </div>

        <FAQs />

        <ModalAccessByPrivateKey
            v-model="modalAccessByPrivateKeyState"
            @submit="handleAccessByPrivateKeySubmit"
        />

        <ModalAccessByPhrase
            v-model="modalAccessByPhraseState"
            @submit="handleAccessByPhraseSubmit"
        />

        <ModalAccessByHardware v-model="modalAccessByHardwareIsOpen" />

        <ModalAccessBySoftware
            v-model="modalAccessBySoftwareIsOpen"
            @submit="handleAccessBySoftwareSubmit"
        />

        <ModalPassword
            v-model="modalPasswordState"
            @submit="handlePasswordSubmit"
        />

        <ModalEnterAccountId
            v-model="modalEnterAccountId"
            @submit="handleAccountIdSubmit"
            @noAccount="handleDoesntHaveAccount"
        />

        <ModalRequestToCreateAccount
            v-model="modalRequestToCreateAccountIsOpen"
            :public-key="publicKey"
            @hasAccount="handleHasAccount"
        />

        <input
            v-show="false"
            ref="file"
            type="file"
            @change="loadTextFromFile"
        />
    </div>
</template>

<!-- TODO:  should go to password modal after getting keystore file -->

<script lang="ts">
import FAQs from "@/components/FAQs.vue";
import AccountTileButtons from "@/components/AccountTileButtons.vue";
import ModalAccessByHardware from "@/components/ModalAccessByHardware.vue";
import ModalAccessBySoftware, {
    AccessSoftwareOption
} from "@/components/ModalAccessBySoftware.vue";
import ModalAccessByPhrase, {
    MnemonicType
} from "@/components/ModalAccessByPhrase.vue";
import ModalAccessByPrivateKey from "@/components/ModalAccessByPrivateKey.vue";
import ModalEnterAccountId from "../components/ModalEnterAccountId.vue";
import PageTitle from "../components/PageTitle.vue";
import ModalPassword from "../components/ModalPassword.vue";
import store from "@/store";
import { LOG_IN } from "@/store/mutations";
import ModalRequestToCreateAccount from "../components/ModalRequestToCreateAccount.vue";
import { createComponent, value, Wrapper } from "vue-function-api";
import { Client, decodePrivateKey } from "hedera-sdk-js";

export default createComponent({
    components: {
        FAQs,
        AccountTileButtons,
        ModalAccessByHardware,
        ModalAccessBySoftware,
        ModalAccessByPhrase,
        ModalAccessByPrivateKey,
        PageTitle,
        ModalPassword,
        ModalEnterAccountId,
        ModalRequestToCreateAccount
    },
    setup(props, context) {
        const privateKey: Wrapper<string | null> = value(null);
        const publicKey: Wrapper<string | null> = value(null);

        const modalAccessByHardwareIsOpen = value(false);
        const modalAccessBySoftwareIsOpen = value(false);

        const modalAccessByPhraseState = value({
            modalIsOpen: false,
            isBusy: false,
            words: [],
            numWords: MnemonicType.Words12,
            password: ""
        });
        const modalPasswordState = value({
            modalIsOpen: false,
            password: "",
            isBusy: false
        });
        const modalAccessByPrivateKeyState = value({
            modalIsOpen: false,
            privateKey: "",
            isBusy: false
        });

        const modalEnterAccountId = value({
            modalIsOpen: false,
            account: null,
            error: null as null | string,
            isBusy: false
        });

        const modalRequestToCreateAccountIsOpen = value(false);
        const keystoreFileText: Wrapper<string | null> = value(null);

        function handleClickTiles(which: string) {
            if (which === "hardware") {
                modalAccessByHardwareIsOpen.value = true;
            } else if (which === "software") {
                modalAccessBySoftwareIsOpen.value = true;
            }
        }
        function handleAccessBySoftwareSubmit(which: AccessSoftwareOption) {
            modalAccessBySoftwareIsOpen.value = false;

            if (which === "file") {
                (context.refs.file as HTMLInputElement).click();
            } else {
                setTimeout(() => {
                    if (which === AccessSoftwareOption.Phrase) {
                        modalAccessByPhraseState.value.modalIsOpen = true;
                    } else if (which === AccessSoftwareOption.Key) {
                        modalAccessByPrivateKeyState.value.modalIsOpen = true;
                    }
                }, 125);
            }
        }
        async function loadTextFromFile(event: Event) {
            const target = event.target as HTMLInputElement;

            if (target.files == null) {
                // User hit cancel
                return;
            }

            const file = target.files[0];
            keystoreFileText.value = await new Promise<string>(
                (resolve, reject) => {
                    const reader = new FileReader();

                    reader.addEventListener("error", reject);
                    reader.addEventListener("loadend", (): void => {
                        resolve(reader.result as string);
                    });

                    reader.readAsText(file);
                }
            );

            modalPasswordState.value.modalIsOpen = true;
        }
        function handlePasswordSubmit() {
            modalPasswordState.value.isBusy = true;
            // TODO: Decode private key from file
            setTimeout(() => {
                // Close  previous modal and open another one
                modalPasswordState.value.isBusy = false;
                modalPasswordState.value.modalIsOpen = false;
                modalEnterAccountId.value.modalIsOpen = true;
            }, 3000);
        }

        // Update our local understand of what the private/public key pair is
        // Called at the end of each access by software workflow before merging
        // into enter account ID
        function setPrivateKey(pk: string) {
            privateKey.value = pk;
            publicKey.value = decodePrivateKey(pk).publicKey.toString();
        }

        function handleAccessByPhraseSubmit() {
            modalAccessByPhraseState.value.isBusy = true;
            // TODO: Decode private key from phrase
            setTimeout(() => {
                // Close  previous modal and open another one
                modalAccessByPhraseState.value.isBusy = false;
                modalAccessByPhraseState.value.modalIsOpen = false;
                modalEnterAccountId.value.modalIsOpen = true;
            }, 3000);
        }

        function handleAccessByPrivateKeySubmit() {
            modalAccessByPrivateKeyState.value.isBusy = true;

            setPrivateKey(modalAccessByPrivateKeyState.value.privateKey);

            // Close previous modal and open another one
            modalAccessByPrivateKeyState.value.modalIsOpen = false;

            setTimeout(() => {
                modalAccessByPrivateKeyState.value.isBusy = false;
                modalEnterAccountId.value.modalIsOpen = true;
            }, 125);
        }

        function openInterface() {
            context.root.$router.push({ name: "interface" });
        }

        async function handleAccountIdSubmit() {
            modalEnterAccountId.value.error = null;
            modalEnterAccountId.value.isBusy = true;

            const account = modalEnterAccountId.value.account;

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
                    account: modalEnterAccountId.value.account,
                    client,
                    privateKey: privateKey.value,
                    publicKey: publicKey.value
                });

                openInterface();
            } catch {
                // FIXME: Look at these atomic warnings
                // FIXME: This should be a "This account is not associated with your private key" error but balance transactions
                //        don't have their signatures checked

                /* eslint-disable-next-line require-atomic-updates */
                modalEnterAccountId.value.error =
                    "This account does not exist in the network.";

                // Only update isBusy if getting account balance failed
                /* eslint-disable-next-line require-atomic-updates */
                modalEnterAccountId.value.isBusy = false;
            }
        }

        function handleDoesntHaveAccount() {
            modalEnterAccountId.value.modalIsOpen = false;
            modalRequestToCreateAccountIsOpen.value = true;
        }

        function handleHasAccount() {
            modalRequestToCreateAccountIsOpen.value = false;
            modalEnterAccountId.value.modalIsOpen = true;
        }

        return {
            publicKey,
            modalAccessByHardwareIsOpen,
            modalAccessBySoftwareIsOpen,
            modalAccessByPhraseState,
            modalPasswordState,
            modalAccessByPrivateKeyState,
            modalEnterAccountId,
            modalRequestToCreateAccountIsOpen,
            keystoreFileText,
            handleClickTiles,
            handleAccessBySoftwareSubmit,
            loadTextFromFile,
            handlePasswordSubmit,
            handleAccessByPhraseSubmit,
            handleAccessByPrivateKeySubmit,
            handleAccountIdSubmit,
            handleDoesntHaveAccount,
            handleHasAccount
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
