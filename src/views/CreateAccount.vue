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
        <ModalAccessBySoftware
            v-model="modalAccessBySoftwareIsOpen"
            @submit="handleAccessBySoftwareSubmit"
        />
        <ModalCreateByPhrase v-model="modalCreateByPhraseIsOpen" />
        <ModalCreateByKeystore v-model="modalCreateByKeystoreData" />
    </div>
</template>

<script lang="ts">
import FAQs from "../components/FAQs.vue";
import AccountTileButtons from "@/components/AccountTileButtons.vue";
import ModalAccessByHardware from "@/components/ModalAccessByHardware.vue";
import ModalAccessBySoftware, {
    AccessSoftwareOption
} from "@/components/ModalAccessBySoftware.vue";
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
        ModalAccessBySoftware,
        PageTitle,
        ModalCreateByPhrase,
        ModalCreateByKeystore
    },
    setup() {
        const modalAccessByHardwareIsOpen = value(false);
        const modalAccessBySoftwareIsOpen = value(false);
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
                modalAccessBySoftwareIsOpen.value = true;
            }
        }

        function handleAccessBySoftwareSubmit(which: AccessSoftwareOption) {
            modalAccessBySoftwareIsOpen.value = false;

            setTimeout(() => {
                if (which === AccessSoftwareOption.File) {
                    modalCreateByKeystoreData.value.modalIsOpen = true;
                } else if (which === AccessSoftwareOption.Key) {
                    modalCreateByPhraseIsOpen.value = true;
                } else if (which === AccessSoftwareOption.Phrase) {
                    modalCreateByPhraseIsOpen.value = true;
                }
            }, 125);
        }

        return {
            modalAccessByHardwareIsOpen,
            modalAccessBySoftwareIsOpen,
            modalCreateByPhraseIsOpen,
            modalCreateByKeystoreData,
            handleClickTiles,
            handleAccessBySoftwareSubmit
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
