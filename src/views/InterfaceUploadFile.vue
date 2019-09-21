<template>
    <InterfaceForm :title="$t('interfaceUploadFile.title')">
        <UploadFile class="upload"></UploadFile>
        <template v-slot:footer> </template>
    </InterfaceForm>
</template>

<script lang="ts">
import InterfaceForm from "../components/InterfaceForm.vue";
import Button from "../components/Button.vue";
import { createComponent } from "@vue/composition-api";
import store from "../store";
import UploadFile from "../components/UploadFile.vue";

export default createComponent({
    components: {
        InterfaceForm,
        UploadFile
    },
    setup() {
        return {};
    }
});
</script>
