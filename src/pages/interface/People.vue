<template>
  <Headline :title="$t('InterfacePeople.header')" />

  <div class="mx-8">
    <Person
      title="First Name Last Name"
      timing="0.0.5678"
    />
    <Person
      title="First Name Last Name"
      timing="0.0.5678"
    />
    <Person
      title="First Name Last Name"
      timing="0.0.5678"
    />
    <Person
      title="First Name Last Name"
      timing="0.0.5678"
    />
    <Person
      title="First Name Last Name"
      timing="0.0.5678"
    />
    <Person
      title="First Name Last Name"
      timing="0.0.5678"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

import Headline from "../../components/interface/Headline.vue";
import Person from "../../components/interface/Person.vue";

export default defineComponent({
  name: "People",
  components: {
    Headline,
    Person,
  },
});
</script>
