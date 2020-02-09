<template>
    <div class="error-404">
        <div class="error-container">
            <div class="error-code">
                {{ $t("error404.404") }}
            </div>
            <div class="error-description">
                {{ $t("error404.oops") }}
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { createComponent } from "@vue/composition-api";

export default createComponent({ components: {}, props: {}});
</script>

<style scoped lang="postcss">
.error-404 {
    align-items: center;
    background-image: url("../assets/sky.jpg");
    background-position: 50%;
    background-repeat: no-repeat;
    background-size: cover;
    display: flex;
    flex-grow: 1;
    height: 100%;
    justify-content: center;
}

.error-container {
    align-items: center;
    color: var(--color-white);
    display: flex;
    flex-direction: column;
    justify-content: center;
}

.error-code {
    font-size: 220px;
    font-weight: 700;
    line-height: 216px;
    text-align: center;
}

.error-description {
    font-size: 30px;
    font-weight: 600;
    text-align: center;
}
</style>
