<template>
    <div>
        <TextInput
            v-model="value"
            style="width: 400px; "
            placeholder="shard.realm.num"
            label="Account ID"
            action="Copy"
        />
    </div>
</template>

<script lang="ts">
import Vue from "vue";
import TextInput from "../components/TextInput.vue";

export default Vue.extend({
    components: {
        TextInput
    },
    data() {
        return {
            value: ""
        };
    }
});
</script>
