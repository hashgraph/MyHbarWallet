<template>
  <div>
    <div
      :class="[
        'flex items-center justify-center rounded cursor-pointer select-none',
        'right-3 top-5 w-10 h-10 bg-first-snow',
        'dark:bg-midnight-express',
      ]"
      @click="showActions = !showActions"
    >
      <Image :light="dotsIcon" :dark="dotsIcon" class="h-8" />
    </div>
    <div
      :class="[
        'absolute transition-all duration-300 mt-1 p-2 w-40 rounded shadow border select-none',
        'bg-white text-squant border-jupiter',
        'dark:bg-ruined-smores dark:text-silver-polish dark:border-ruined-smores',
        {
          'opacity-100': showActions,
          '-mt-4 invisible opacity-0': !showActions,
        },
      ]"
    >
      <div
        v-for="action in actions"
        :key="action.label"
        class="
          flex
          p-4
          rounded
          cursor-pointer
          hover:bg-first-snow
          dark:hover:bg-midnight-express
        "
        @click="handleAction(action.action)"
      >
        <div class="w-10">
          <img :src="action.image" />
        </div>
        <div>{{ action.label }}</div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import dotsIcon from "../../assets/icon_dots_vertical.svg";
import Image from "../base/Image.vue";
import editImage from "../../assets/icon_edit.svg";
import removeImage from "../../assets/icon_remove.svg";

interface Action {
  label: string;
  action: "edit" | "remove";
  image: string;
}

export default defineComponent({
  name: "ActionsButton",
  components: {
    Image,
  },
  emits: ["edit", "remove"],
  setup(_props, context) {
    let showActions = ref(false);

    let actions: Array<Action> = [
      { label: "Edit", action: "edit", image: editImage },
      { label: "Remove", action: "remove", image: removeImage },
    ];

    function handleAction(action: "edit" | "remove") {
      context.emit(action);
      showActions.value = false;
    }

    return { showActions, dotsIcon, actions, handleAction };
  },
});
</script>
