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
        <ModalCreateByPhrase v-model="modalCreateByPhraseIsOpen" />
        <ModalCreateByKeystore
            v-model="modalCreateByKeystoreState"
            @submit="handleCreateByKeystoreSubmit"
        />
        <ModalDownloadKeystore
            v-model="modalDownloadKeystoreState"
            @submit="handleDownloadKeystoreSubmit"
        />
        <ModalSuccess v-model="modalSuccessIsOpen" />
    </div>
</template>

<script lang="ts">
import FAQs from "../components/FAQs.vue";
import AccountTileButtons from "@/components/AccountTileButtons.vue";
import ModalAccessByHardware from "@/components/ModalAccessByHardware.vue";
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
import ModalSuccess from "../components/ModalSuccessCreatingKeyPair.vue";

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
        ModalSuccess
    },
    setup() {
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
            handleDownloadKeystoreSubmit
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
