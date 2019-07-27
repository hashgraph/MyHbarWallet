<template>
    <div class="modal-open modal fade" role="dialog" aria-modal="true">
        <div class="modal-dialog">
            <div class="modal-title">
                <span class="modal-title-text">Title</span>
                <button class="modal-button-close">x</button>
            </div>
            Content of modal goes here!
        </div>
    </div>
</template>

<script>
export default {
    name: "Modal"
};
</script>

<style scoped>
.modal-open {
    overflow-x: hidden;
    overflow-y: auto;
}

.modal {
    background-color: rgba(0, 0, 0, 0.4);
    box-sizing: border-box;
    display: block !important;
    height: 100%;
    outline: 0;
    position: fixed;
    width: 100%;
    z-index: 1040;
}

.fade {
    transition: opacity 0.15s linear;
    transition-delay: 0s;
    transition-duration: 15s;
    transition-property: opacity;
    transition-timing-function: linear;
}

.modal-dialog {
    align-items: center;
    background-color: white;
    border-radius: 5px;
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.22);
    display: flex;
    flex-direction: column;
    margin: 1.75rem auto;
    max-width: 530px;
    min-height: calc(100% - 3.5rem);
    overflow: hidden;
    pointer-events: none;
    position: relative;
    width: auto;
}

.modal-title {
    align-items: flex-start;
    background-color: #434f61;
    border: 0;
    border-radius: 0;
    box-sizing: border-box;
    display: flex;
    flex-flow: row nowrap;
    height: 58px;
    justify-content: space-between;
    padding: 1rem 1rem;
    pointer-events: auto;
    width: 100%;
}

.modal-title-text {
    color: white;
    font-size: 20px;
    padding: 0 15px;
}

/* vertical rhythm doesn't matter, it is used for formatting the x in the button */

/* eslint-disable a11y/line-height-is-vertical-rhythmed */
.modal-button-close {
    background-color: transparent;
    border: 0;
    box-shadow: none !important;
    box-sizing: border-box;
    color: white;
    cursor: pointer;
    font-size: 32px;
    font-weight: 100;
    margin: -1rem -1rem -1rem auto;
    opacity: 1;
    outline: none;
    overflow: visible;
    pointer-events: none;
    text-shadow: none;
}

@media screen and (prefers-reduced-motion: reduce) {
    .fade {
        transition: none;
        transition-delay: 0s;
        transition-duration: 15s;
        transition-property: opacity;
        transition-timing-function: linear;
    }
}
</style>
