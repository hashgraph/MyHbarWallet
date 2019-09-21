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

export default createComponent({
    components: {
        InterfaceForm,
        DownloadFile
    },
    setup() {
        return {};
    }
});
</script>
