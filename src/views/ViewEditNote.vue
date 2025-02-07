<template>
    <div class="edit-note">
        <add-edit-note ref="addEditNote" v-model="noteContent" bgColor="link" placeholder="Edit note"  label="Edit Note">
            <template #buttons>
                <router-link to="/" class="button is-link is-light mr-2">Cancel</router-link>
                <button class="button is-link has-background-link" :disabled="!noteContent" @click="handleSaveClicked">Save Note</button>
            </template>
        </add-edit-note>
    </div>
</template>

<script setup>
import AddEditNote from '@/components/Notes/AddEditNote.vue';
import { ref } from 'vue';
import { useStoreNotes } from '@/stores/storeNotes';
import { useRoute, useRouter } from 'vue-router';

const route = useRoute();

const router = useRouter();

const storeNotes = useStoreNotes();

const noteContent = ref('');

noteContent.value = storeNotes.getNoteContent(route.params.id);

const handleSaveClicked = () => {
    storeNotes.updateNote(route.params.id, noteContent.value);
    router.push('/');
};
</script>