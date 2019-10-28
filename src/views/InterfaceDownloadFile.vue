<template>
    <InterfaceForm :title="$t('interfaceDownloadFile.title')">
        <DownloadFile class="download"></DownloadFile>
        <template v-slot:footer> </template>
    </InterfaceForm>
</template>

<script lang="ts">
import InterfaceForm from "../components/InterfaceForm.vue";
import { createComponent } from "@vue/composition-api";
import DownloadFile from "../components/DownloadFile.vue";
import ModalFeeSummary from "../components/ModalFeeSummary.vue";

export default createComponent({
    components: {
        InterfaceForm,
        DownloadFile,
        ModalFeeSummary
    },
    setup() {
        return {};
    }
});
</script>
