<template>
    <div class="card p-4 mb-5" :class="`has-background-${bgColor}-dark`"> 
        <label v-if="label" class="label has-text-white">{{ label }}</label>
        <div class="field">
            <div class="control">
                <textarea maxlength="100" v-autofocus class="textarea" :placeholder="placeholder" ref="textareaRef" :value="props.modelValue" @input="$emit('update:modelValue', $event.target.value)"></textarea>
            </div>
        </div>
        <div class="field is-grouped is-grouped-right">
            <div class="control">
                <slot name="buttons"></slot>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import { vAutofocus } from '@/directives/vAutofocus';

const props = defineProps({
    modelValue: {
        type: String,
        required: true
    },
    bgColor: {
        type: String,
        default: 'success'
    },
    placeholder: {
        type: String,
        default: 'Type something...'
    },
    label: {
        type: String
    }
});

const emit = defineEmits(['update:modelValue']);

const textareaRef = ref(null);

const focusTextarea = () => {
    textareaRef.value.focus();
};

defineExpose({
    focusTextarea
});
</script>