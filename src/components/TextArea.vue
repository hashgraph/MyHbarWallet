<template>
    <div class="input-container">
        <label>
            <span v-if="label" class="label">{{ label }}</span>
            <textarea
                ref="input"
                :placeholder="placeholder"
                :tabindex="tabindex"
                :value="value"
                :rows="rows"
                :class="{ resize: resizeable }"
                class="text-area"
                @input="handleInput"
            />
        </label>
        <MaterialDesignIcon
            v-if="showValidation"
            class="validation"
            :class="{ valid }"
            :icon="checkmark"
            :size="18"
        />
        <div class="actions">
            <div v-if="canClear" class="action" @click="onClickClear">
                Clear
            </div>
            <div v-if="canCopy" class="action" @click="onClickCopy">
                Copy
            </div>
        </div>
    </div>
</template>

