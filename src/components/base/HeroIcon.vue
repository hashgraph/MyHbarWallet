<template>
  <component
    :is="iconName"
    class="h-6 w-6"
    :class="iconColor"
  />
</template>


<script lang="ts">
import { defineComponent, computed } from "vue";
import { XIcon, StarIcon, ChevronDoubleDownIcon, ChevronDoubleUpIcon, ChevronDoubleRightIcon, ChevronDoubleLeftIcon } from "@heroicons/vue/solid";
import { MenuIcon } from "@heroicons/vue/outline";

export default defineComponent({
    name: "HeroIcon",
    components:{
        XIcon, 
        StarIcon, 
        ChevronDoubleDownIcon, 
        ChevronDoubleUpIcon, 
        ChevronDoubleRightIcon, 
        ChevronDoubleLeftIcon, 
        MenuIcon,
    },
    props:{
        icon: { type: String, required: true },
        //Must use a color defined in tailwind.config.js
        color: { type: String, default: "mountain-meadow", required: false }
    },
    setup(props){
        const iconName = computed( ()=>{

            switch(props.icon){
                case "menu":
                    return "MenuIcon"
                case "close-menu":
                    return "XIcon"
                case "star":
                    return "StarIcon"
                case "chevron-double-down":
                    return "ChevronDoubleDownIcon"
                case "chevron-double-up":
                    return "ChevronDoubleUpIcon"
                case "chevron-double-right":
                    return "ChevronDoubleRightIcon"
                case "chevron-double-left":
                    return "ChevronDoubleLeftIcon"
                default:
                    return null;
            }
        });

        const iconColor = computed( ()=>{
            return `text-${props.color}`;
        });

        return { iconName, iconColor };
    }
});

</script>