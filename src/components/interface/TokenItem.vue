<template>
  <div class="flex p-4 pl-12 mb-3 w-full rounded bg-white hover:bg-first-snow shadow-md dark:shadow-none dark:hover:bg-black-out dark:bg-ruined-smores text-left">
    <div class="w-5/6">
      {{ tokenId }}
    </div> 

    <img
      src="../../assets/icon_remove.svg"
      class="cursor-pointer"
      @click="remove"
    >
  </div>
</template>


<script lang="ts">
import { defineComponent, reactive, toRef } from "vue";

export default defineComponent({
    name: "TokenItem",
    props: {
        tokenId: { type: String, required: true },
        index: { type: Number, default: 0 }
    },
    emits: [ "remove" ],
    setup(props, context){

        const tokenId = toRef(props, "tokenId");
        const index =  toRef(props, "index");

        const state = reactive({
            showOptions: false,
        });

        function remove(): void {
          context.emit("remove", {
            index: index.value
          });
        }

        return {
            state,
            remove,
            tokenId
        }
    }
});
</script>