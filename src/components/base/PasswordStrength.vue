<template>
  <div class="dark:text-white">
    <input
      v-if="false"
    >

    <div class="mb-3">
      <span> {{ $t("BasePasswordStrength.password.strength") }}  </span>
      <span
        :class="{
          'text-black-rooster': stars == 1,
          'text-harlocks-cape': stars == 2,
          'text-tangerine': stars == 3,
          'text-turbo': stars == 4,
          'text-mountain-meadow': stars == 5
        }"
      > {{ strength }} </span>
    </div>

    <!-- Render stars -->
    <!-- TODO: Replace with HeroIcons after merged -->
    <div
      v-for="i in stars"
      :key="i"
      class="flex float-left mr-2"
      :class="{
        'text-black-rooster': stars == 1,
        'text-harlocks-cape': stars == 2,
        'text-tangerine': stars == 3,
        'text-jubilation': stars == 4,
        'text-mountain-meadow': stars == 5
      }"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="h-5 w-5"
        viewBox="0 0 20 20"
        fill="currentColor"
      >
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
      </svg>
    </div>
  </div>
</template>


<script lang = "ts">
import { defineComponent, computed, reactive } from "vue";
import { useI18n } from "vue-i18n";

export default defineComponent({
    name: "PasswordStrength",
    components: {},
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
        }
    }
   
});

</script>