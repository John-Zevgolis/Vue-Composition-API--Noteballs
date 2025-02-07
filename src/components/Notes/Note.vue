<template>
    <div class="card mb-4">
        <div class="card-content">
            <div class="content">{{ note.content }}</div>
            <div class="columns is-mobile has-text-grey-light mt-2">
                <small class="column">{{ dateFormatted }}</small>
                <small class="column has-text-right">{{ characterLength }}</small>
            </div>
        </div>
        <footer class="card-footer">
            <router-link :to="`/editNote/${note.id}`" class="card-footer-item">Edit</router-link>
            <a href="#" class="card-footer-item" @click.prevent="modals.deleteNote = true">Delete</a>
        </footer>
        <modal-delete-note v-if="modals.deleteNote" v-model="modals.deleteNote" :noteId="note.id"></modal-delete-note>
    </div>
</template>

<script setup>
import { computed, reactive } from 'vue';
import { useStoreNotes } from '@/stores/storeNotes';
import ModalDeleteNote from './ModalDeleteNote.vue';
import { useDateFormat } from '@vueuse/core';

const storeNotes = useStoreNotes();

const dateFormatted = computed(() => {
    let date = new Date(parseInt(props.note.date));
    let formattedDate = useDateFormat(date, 'DD/MM/YYYY @ HH:mm');
    return formattedDate.value;
});

const props = defineProps({
    note: {
        type: Object,
        required: true
    }
});

const characterLength = computed(() => {
    const length = props.note.content.length;
    let description = length > 1 ? 'characters' : 'character';
    return `${length} ${description}`;
});

const modals = reactive({
    deleteNote: false
});
</script>