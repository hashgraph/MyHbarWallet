import {AccessSoftwareOption} from "../components/ModalAccessBySoftware"; import
{AccessSoftwareOption} from "../components/ModalAccessBySoftware"; import
{AccessSoftwareOption} from "../components/ModalAccessBySoftware";
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
        <ModalCreateByKeystore v-model="modalCreateByKeystore" />
    </div>
</template>
<script lang="ts">
import Vue from "vue";
import FAQs from "../components/FAQs.vue";
import AccountTileButtons from "@/components/AccountTileButtons.vue";
import ModalAccessByHardware from "@/components/ModalAccessByHardware.vue";
import ModalAccessBySoftware, {
    AccessSoftwareOption
} from "@/components/ModalAccessBySoftware.vue";
import ModalCreateByPhrase from "../components/ModalCreateByPhrase.vue";
import ModalCreateByKeystore from "../components/ModalCreateByKeystore.vue";

import PageTitle from "../components/PageTitle.vue";

export default Vue.extend({
    components: {
        FAQs,
        AccountTileButtons,
        ModalAccessByHardware,
        ModalAccessBySoftware,
        PageTitle,
        ModalCreateByPhrase,
        ModalCreateByKeystore
    },
    data() {
        return {
            modalAccessByHardwareIsOpen: false,
            modalAccessBySoftwareIsOpen: false,
            modalCreateByPhraseIsOpen: false,
            modalCreateByKeystore: {
                modalIsOpen: false,
                filename: ""
            }
        };
    },
    methods: {
        handleClickTiles(which: string) {
            if (which === "hardware") {
                this.modalAccessByHardwareIsOpen = true;
            } else if (which === "software") {
                this.modalAccessBySoftwareIsOpen = true;
            }
        },
        handleAccessBySoftwareSubmit(which: AccessSoftwareOption) {
            this.modalAccessBySoftwareIsOpen = false;

            setTimeout(() => {
                if (which === AccessSoftwareOption.File) {
                    this.modalCreateByKeystore.modalIsOpen = true;
                } else if (which === AccessSoftwareOption.Key) {
                    this.modalCreateByPhraseIsOpen = true;
                } else if (which === AccessSoftwareOption.Phrase) {
                    this.modalCreateByPhraseIsOpen = true;
                }
            }, 125);
        }
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
