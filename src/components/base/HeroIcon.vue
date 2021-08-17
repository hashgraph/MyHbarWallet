<template>
  <Icon
    :icon="iconName"
    :class="iconColor"
  />
</template>


<script lang="ts">
import { defineComponent, computed } from "vue";
import { Icon } from "@iconify/vue";

export default defineComponent({
    name: "HeroIcon",

    components: {
        Icon
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
                    return "feather-menu"
                case "close-menu":
                    return "feather-x";
                case "star":
                    return "bi-star-fill"
                case "chevron-double-down":
                    return "feather-chevrons-down"
                case "chevron-double-up":
                    return "feather-chevrons-up"
                case "chevron-double-right":
                    return "feather-chevrons-right"
                case "chevron-double-left":
                    return "feather-chevrons-left"
                case "chevron-down":
                    return "feather-chevron-down"
                case "chevron-up":
                    return "feather-chevron-up"
                case "chevron-right":
                    return "feather-chevron-right"
                case "chevron-left":
                    return "feather-chevron-left"
                default:
                    return props.icon;
             }
        });

        const iconColor = computed( ()=>{
            return `text-${props.color}`;
        });

        return { iconName, iconColor };
    }
});

</script>