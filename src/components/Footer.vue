<template>
    <footer>
        <div class="flex-container">
            <div class="block">
                <div class="title">About</div>
                <div>
                    <router-link to="/about">About</router-link>
                </div>
            </div>
            <div class="block">
                <div class="title">Contact</div>
                <div><a href="https://www.google.com/">Help</a></div>
            </div>
        </div>
        <div class="list">
            <div class="list-item">
                <a href="https://www.hedera.com/terms"
                    >Terms &amp; Conditions</a
                >
            </div>
            <div class="list-item">
                <a href="https://www.hedera.com/privacy">Privacy Policy</a>
            </div>
            <div class="list-item">
                <p class="copyright">
                    &copy; {{ currentYear }} Copyright Hedera Hashgraph LLC.
                </p>
            </div>
        </div>
    </footer>
</template>

<style lang="postcss" scoped>
footer {
    background-color: var(--color-yankees-blue);
    color: var(--color-peral);
    flex-shrink: 1;
    line-height: 1.5;
    padding: 2%;
}

.flex-container {
    display: flex;
}

.block {
    flex-grow: 1;
    text-align: center;
}

.title {
    font-size: larger;
    font-weight: bold;
}

.list-item {
    text-align: center;
}

.copyright {
    font-size: small;
}

a {
    text-decoration: none;

    &:visited {
        color: var(--color-peral);
    }

    &:hover,
    &:focus,
    &:active {
        color: var(--color-white);
        text-decoration: underline;
    }
}
</style>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
    name: "Footer",
    computed: {
        currentYear: function() {
            return new Date().getFullYear();
        }
    }
});
</script>
