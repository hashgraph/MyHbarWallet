<template>
    <Headline title = "Upload" parent = "tools"/>


    <div class = "container h-screen dark:text-white justify-items-center">
        <UploadZone></UploadZone>

    </div>
</template>


<script lang = "ts">
import { defineComponent, reactive, nextTick, computed, ref } from "vue";
import Headline from "../../components/interface/Headline.vue";
import UploadZone from "../../components/base/UploadZone.vue";

export default defineComponent({
    name: "UploadFile",
    components: {
        Headline,
        UploadZone
    },


    setup(){

    }
});



</script>