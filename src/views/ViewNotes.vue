<template>
    <div class="notes">
        <add-edit-note v-model="newNote" ref="addEditNote" placeholder="Add a new note">
            <template #buttons>
                <button class="button is-link has-background-success" :disabled="!newNote" @click="addNote">Add New Note</button>
            </template>
        </add-edit-note>
        <progress v-if="!storeNotes.notesLoaded" class="progress is-large is-success" max="100"></progress>
        <template v-else>
            <note v-for="note in storeNotes.notes" :key="note.id" :note="note"></note>
            <div class="is-size-4 has-text-centered has-text-grey-light is-family-monospace py-6" v-if="!storeNotes.notes.length">No notes here yet...</div>
        </template>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import Note from '@/components/Notes/Note.vue';
import { useStoreNotes } from '@/stores/storeNotes';
import AddEditNote from '@/components/Notes/AddEditNote.vue';
import { useWatchCharacters } from '@/use/useWatchCharacters';

const newNote = ref('');
const addEditNote = ref(null);

const storeNotes = useStoreNotes();

const addNote = () => {
    storeNotes.addNote(newNote.value);
    newNote.value = '';
    addEditNote.value.focusTextarea();
};

useWatchCharacters(newNote);
</script>