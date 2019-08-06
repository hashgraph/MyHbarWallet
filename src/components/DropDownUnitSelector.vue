<template>
    <div class="dropdown-unit-selector">
        <div class="unit-selector-click-safe-zone">
            <div
                :class="dropdownOpen ? 'dropdown-open' : '' "
                class="dropdown-input-box"
                @click="toggle"
            >
                <div class="selected-unit">{{ currentSelected }}</div>
                <div class="dropdown-open-button">
                    <FontAwesomeIcon class="icon" :icon="icon" :name="icon" />
                </div>
            </div>
            <div
                :class="dropdownOpen ? 'show-dropdown' : ''"
                class="dropdown-list-box"
            >
                <ul>
                    <li
                        v-for="(opt, idx) in options"
                        :key="opt + idx"
                        @click="selected(opt)"
                    >
                        {{ opt }}
                    </li>
                </ul>
            </div>
        </div>

    </div>
</template>

<script lang="ts">
import Vue from "vue";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { faChevronUp, faChevronDown } from "@fortawesome/free-solid-svg-icons"

export default Vue.extend({
    name: "DropDownUnitSelector",
    components: {
        FontAwesomeIcon
    },
    props: {
        options: {
            type: Array,
            default: function (){
                return [];
            }
        },
        currentSelected: {
            type: String,
            default: ''
        },
        left: {
            type: Boolean,
            default: false,
        }
    },
    computed: {
        icon() {
            if(this.dropdownOpen) return faChevronUp;
            else return faChevronDown;
        },
        side():any {
            return this.left;
        }
    },
    data() {
        return {
            dropdownOpen: false,
        };
    },
    beforeMount() {
        document.addEventListener('click', this.clickEvent, false);
    },
    beforeDestroy() {
        document.removeEventListener('click', this.clickEvent, false);
    },
    methods: {
        clickEvent: function(event: any) {
            const path = event.path || (event.composedPath && event.composedPath()) || this.composedPath(event.target);
            for (let count = 0; count < path.length; count++) {
                if(path[count].className === 'unit-selector-click-safe-zone'){
                    return;
                }
            }
            this.dropdownOpen = false;
        },
        composedPath(el: any) {
            const path =[];

            while (el) {
                path.push(el);
                if(el.tagname === 'HTML'){
                    path.push(document);
                    path.push(window);
                    return path;
                }
                el = el.parentElement;
            }
        },
        toggle(){
            return this.dropdownOpen = !this.dropdownOpen
        },
        selected(val: any) {
            this.dropdownOpen = false;
            this.$emit('updatedSelected', [val, this.side ? 'left' : 'right']);
        }
    }
});

</script>

<style lang="postcss" scoped>
    .dropdown-unit-selector {
        position: relative;
        user-select: none;
    }

    .form-tile-container {
        margin-bottom: 10px;
        padding: 0 10px;
    }

    .title {
        font-weight: 600;
        font-size: 16px;
        line-height: initial;
        color: var(--color-washed-black)
    }

    .unit-selector-click-safe-zone{
        position: relative;
    }

    .dropdown-input-box {
        position: relative;
        border: 1px solid var(--color-white);
        border-radius: 4px;
        transition: all 0.2s ease;
        height: 57px;
        background-color: var(--color-white);
        cursor: pointer;

        &.dropdown-open {
            background-color: var(--color-white);
            border-botom: 1px solid var(--color-peral);
            border-radius: 4px 4px 0 0;
        }

    }
    .selected-unit {
        padding: 18px;
        padding-right: 70px;
        
    }
    span {
        font-size: 12px;
        color: var(--color-green-jelly);
        margin-left: 5px;
    }

    .dropdown-open-button {
        user-select: none;
        height: 100%;
        position: absolute;
        display: flex;
        top: 23px;
        right: 8px;
        
        &.icon {
            align-content: center;
            font-size: 9px;
            padding: 10px 22px;
            color: #3766aa;
            margin-top: 12px;
        }
    }

    .dropdown-list-box{
        box-shadow: 0 2px 4px rbga(0, 0, 0, 0.12);
        width: 100%;
        position: absolute;
        user-select: none;
        background-color: var(--color-peral);
        border: 1px solid #adadad;
        border-radius: 0 0 4px 4px;
        z-index: 2;
        overflow-y: auto;
        overflow-x: hidden;
        max-height: 230px;
        transition: all 0.2s ease;
        opacity: 0;
        pointer-events: none;
        top: 56px;
        left: 0;
        
    }
    .show-dropdown {
        background-color: var(--color-white);
        opacity: 1;
        pointer-events: initial;
    }
    .search-block {
        padding: 10px;
        position: relative;
    }
    input {
        background-color: var(--color-peral);
        border-radius: 5px;
        border: 0;
        padding: 10px;
        width: 100%;
        padding-left: 40px
    }
    img {
        position: absolute;
        top: 21px;
        left: 20px;
    }
    ul {
        padding-left: 0; 
        margin: 0;
    }
    li {
        cursor: pointer;
        padding: 10px 15px;
        position: relative;
        display: flex;
        align-items: center;
    
        &:hover{
            background-color: #e0e0e0;
        }
    }
    li > span {
        font-size: 12px;
        color: var(--color-green-jelly);
        margin-right: 5px;
    }
    
    

</style>
