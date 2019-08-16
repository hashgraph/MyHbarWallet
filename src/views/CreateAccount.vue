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
        <ModalCreateByKeystore v-model="modalCreateByKeystoreData" />
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
import ModalCreateByKeystore from "../components/ModalCreateByKeystore.vue";
import PageTitle from "../components/PageTitle.vue";
import { createComponent, value, Wrapper } from "vue-function-api";
import { State as CreateByKeystoreState } from "../components/ModalCreateByKeystore.vue";

export default createComponent({
    components: {
        FAQs,
        AccountTileButtons,
        ModalAccessByHardware,
        ModalCreateWithSoftware,
        PageTitle,
        ModalCreateByPhrase,
        ModalCreateByKeystore
    },
    setup() {
        const modalAccessByHardwareIsOpen = value(false);
        const modalCreateWithSoftwareIsOpen = value(false);
        const modalCreateByPhraseIsOpen = value(false);
        const modalCreateByKeystoreData: Wrapper<CreateByKeystoreState> = value(
            {
                modalIsOpen: false,
                filename: ""
            }
        );

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
                    modalCreateByKeystoreData.value.modalIsOpen = true;
                } else if (which === CreateSoftwareOption.Phrase) {
                    modalCreateByPhraseIsOpen.value = true;
                }
            }, 125);
        }

        return {
            modalAccessByHardwareIsOpen,
            modalCreateWithSoftwareIsOpen,
            modalCreateByPhraseIsOpen,
            modalCreateByKeystoreData,
            handleClickTiles,
            handleCreateWithSoftwareSubmit
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
}
</style>
