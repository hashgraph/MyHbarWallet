<template>
    <div>
        <h1>Hello, {{ name }}!</h1>
    </div>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
    name: "HelloWorld",
    props: {
        name: String
    }
});
</script>
