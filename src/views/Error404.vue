<template>
    <div class="error-404">
        <div class="error-container">
            <div class="error-code">404</div>
            <div class="error-description">
                Oops! Looks like you're lost.
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { createComponent } from "vue-function-api";

export default createComponent({
    components: {}
});
</script>

<style scoped lang="postcss">
.error-404 {
    align-items: center;
    background-image: url("../assets/sky.jpg");
    background-position: 50%;
    background-repeat: no-repeat;
    background-size: cover;
    display: flex;
    height: 100%;
    justify-content: center;
}

.error-container {
    align-items: center;
    color: white;
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
