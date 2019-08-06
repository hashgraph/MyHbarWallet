<template>
    <div class="access-my-account">
        <div class="wrap">
            <div class="title-container">
                <div class="title">Create A New Account</div>
                <div class="subtitle">
                    Already Have One?
                    <router-link :to="{ name: 'access-my-account' }">
                        Access My Account
                    </router-link>
                </div>
            </div>
            <AccountTileButtons @click="handleClickTiles" />
        </div>
        <FAQs />
        <ModalAccessByHardware v-model="modalAccessByHardwareIsOpen" />
        <ModalAccessBySoftware
            v-model="modalAccessBySoftwareIsOpen"
            @submit="handleAccessBySoftwareSubmit"
        />
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

export default Vue.extend({
    components: {
        FAQs,
        AccountTileButtons,
        ModalAccessByHardware,
        ModalAccessBySoftware
    },
    data() {
        return {
            modalAccessByHardwareIsOpen: false,
            modalAccessBySoftwareIsOpen: false
        };
    },
    computed: {},
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
                console.log("open next modal!");
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

.title-container {
    margin-block-end: 50px;
    text-align: center;
}

.title {
    font-size: 30px;
    font-weight: 500;
    margin-block-end: 15px;
}

.subtitle {
    color: var(--color-china-blue);
    font-size: 14px;
    font-weight: 400;
}
</style>
