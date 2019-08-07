<template>
    <div class="account">
        <!-- TODO: User Profile Pic Goes here -->
        <img :src="image" />
        <div class="content">
            <div class="title">
                Account
            </div>
            <div class="subtitle">realm.shard.<strong>account</strong></div>
            <div class="subtitle2" type="string">
                {{ publicKey }}
            </div>
            <!-- TODO: implement QR Button -->
            <MaterialDesignIcon class="qr-icon" :icon="qrcode" />
            <!-- TODO: Tie Copy/Error alert to copy -->
            <MaterialDesignIcon
                class="copy-icon"
                :icon="copy"
                @click="copyKey"
            />
        </div>
    </div>
</template>

<script lang="ts">
import Vue from "vue";
import MaterialDesignIcon from "@/components/MaterialDesignIcon.vue";
import { mdiQrcode, mdiContentCopy } from "@mdi/js";

export default Vue.extend({
    components: {
        MaterialDesignIcon
    },
    props: {
        image: { type: String, default: null },
        publicKey: { type: String, default: null }
    },
    data() {
        return {
            isActive: false,
            isError: false
        };
    },
    computed: {
        qrcode() {
            return mdiQrcode;
        },
        copy() {
            return mdiContentCopy;
        }
    },
    methods: {
        copyKey() {
            navigator.clipboard.writeText(this.publicKey).then(
                function(e) {
                    console.log("Copied");
                },
                function(e) {
                    console.log("Error Copying");
                }
            );
        }
    }
});
</script>

<style scoped lang="postcss">
.account {
    align-items: center;
    background-color: var(--color-hera-blue);
    border-radius: 5px;
    color: var(--color-white);
    display: flex;
    padding: 25px;
}

img {
    align-self: flex-start;
    margin-block-start: 10px;
    margin-inline-end: 25px;
    width: 60px;
}

.title {
    font-size: 22px;
    font-weight: 500;
}

.subtitle,
.subtitle2 {
    font-size: 14px;
    font-weight: 300;
}

.subtitle2 {
    margin-block-end: 12px;
}
</style>
