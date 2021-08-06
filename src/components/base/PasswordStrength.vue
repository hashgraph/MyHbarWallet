<template>
  <div class="dark:text-white">
    <input
      v-if="false"
    >

    <div class="mb-3">
      <span> {{ $t("BasePasswordStrength.password.strength") }}  </span>
      <span
        :class="color"
      > {{ strength }} </span>
    </div>

    <!-- Render stars -->
    <!-- TODO: Replace with HeroIcons after merged -->
    <div
      v-for="i in stars"
      :key="i"
      class="flex float-left mr-2"
      :class="color"
    >
      <HeroIcon
        icon="star"
        :color="color"
      />
    </div>
  </div>
</template>


<script lang = "ts">
import { defineComponent, computed, reactive } from "vue";
import { useI18n } from "vue-i18n";

import HeroIcon from "./HeroIcon.vue";

export default defineComponent({
    name: "PasswordStrength",
    components: { HeroIcon },
    props: {
        password: { type: String, required: true }
    },
    setup(props){

        const i18n = useI18n();

        const stars = computed( ()=> {
            let stars = 1;

            //If password is less than 9 characters, always show 1 star
            if(props.password.length >= 9) stars += 1;
            else return 1;

            //+1 for entropy higher than 60
            if(entropy(props.password) > 60) stars += 1;

            //+1 for special characters
            if(props.password.match(/^[!@#\$%\^\&*\)\(+=._-]+$/g)) stars += 1;

            //+1 for numbers
            if(props.password.match(/\d+/g)) stars += 1;

            //+1 for upper and lowercase letters
            if(props.password.match(/[a-z]/) && props.password.match(/[A-Z]/)) stars += 1;
            
            return stars;
        });

        const strength = computed( ()=>{
            if(stars.value == 1) return i18n.t("BasePasswordStrength.very.weak").toString();
            if(stars.value == 2) return i18n.t("BasePasswordStrength.weak").toString();
            if(stars.value == 3) return i18n.t("BasePasswordStrength.good").toString();
            if(stars.value == 4) return i18n.t("BasePasswordStrength.strong").toString();
            if(stars.value == 5) return i18n.t("BasePasswordStrength.excellent").toString();
            return i18n.t("BasePasswordStrength.very.weak").toString();
        });

        const color = computed( ()=>{
            if(stars.value == 1) return "text-black-rooster";
            if(stars.value == 2) return "text-harlocks-cape";
            if(stars.value == 3) return "text-tangerine";
            if(stars.value == 4) return "text-jubilation";
            if(stars.value == 5) return "text-mountain-meadow";
            return "text-mountain-meadow";
        });

        const state = reactive({
            password: props.password
        })

        //Should be 60+ for guarding financial information
        function entropy(password: string): number{
            return Math.log2(Math.pow(uniqueChars(password), password.length));
        }

        function uniqueChars(phrase: string): number{
            let chars:string[] = [];

            for(let i = 0; i < phrase.length; i++){
                if(!chars.includes(phrase.charAt(i))) chars.push(phrase.charAt(i));
            }

            return chars.length;
        }

        return {
            entropy,
            stars,
            strength,
            state,
            color
        }
    }
   
});

</script>