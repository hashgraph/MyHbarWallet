<template>
    <div class="circle-page"><slot></slot></div>
</template>

<style lang="postcss" scoped>
.circle-page {
    background-color: var(--color-boysenberry-shadow);
    background-image: url(../assets/right.png), url(../assets/left.png);
    background-position: 100% 0, left 80px;
    background-repeat: no-repeat, no-repeat;
    font-size: 14px;

    @media (max-width: 650px) {
        padding: 0 20px;
    }
}
</style>
