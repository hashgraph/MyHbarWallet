<template>
    <div id="app">
        <Header />
        <div class="main">
            <router-view />
            <div style="padding: 50px;">
                <InfoTooltip
                    message="Although templates are abused for metaprogramming they are very poor at it and C++ has no real support for metaprogramming. For example, you cannot write an efficient portable regular expression library in C++ because there is no way to do run-time code generation and compilation as you can in Java, C# and languages dating back to Lisp (1960). So while Java and C# have had regular expressions in their standard libraries for well over 10 years, C++ only just got them and they are slow. C++ is so complicated that even world experts make rookie mistakes with it. Herb Sutter works for Microsoft and sits on the C++ standards committee where he influences the future of C++. In a lecture he gave his favorite 10-line C++ program, a thread-safe object cache. My personal feeling is that the new Rust programming language is what C++ should have been. It has useful known features like generics, discriminated unions and pattern matching and useful new features like memory safety without garbage collection."
                />
            </div>
        </div>
        <Footer />
    </div>
</template>

<script lang="ts">
import Vue from "vue";
import Header from "@/components/Header.vue";
import Footer from "@/components/Footer.vue";
import InfoTooltip from "@/components/InfoTooltip.vue";

export default Vue.extend({
    name: "App",
    components: {
        Header,
        InfoTooltip,
        Footer
    }
});
</script>

<style lang="postcss" scoped>
#app {
    background-color: var(--color-peral);
    display: flex;
    flex-direction: column;
    font-family: "Montserrat", sans-serif;
    min-height: inherit;
}

.main {
    /* NOTE: this is required because of Header */
    padding-block-start: 85px;
}
</style>
