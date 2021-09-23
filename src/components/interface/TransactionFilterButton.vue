<template>
  <div
    class="text-center py-1 px-4 rounded cursor-pointer bg-transparent transition duration-300 ease-in-out mr-1 mb-2 text-andrea-blue"
    :class="{
      'bg-andrea-blue text-white': buttonActive
    }"
    @click="update"
  >
    <slot />
  </div>
</template>


<script lang = "ts">
import { defineComponent, computed } from "vue";
export default defineComponent({
    name: "TransactionFilterButton",
    props: {
        filter: { type: String, required: true },
        active: { type: Boolean, required: true}
    },
    emits: [
        "changeFilter"
    ],
    setup(props, context){
        const buttonActive = computed(()=>{
            return props.active;
        });
        function update(): void {
            context.emit("changeFilter", {
                    filter: props.filter,
                }
            );
        }
        return {
            update,
            buttonActive
        }
    }
});
</script>