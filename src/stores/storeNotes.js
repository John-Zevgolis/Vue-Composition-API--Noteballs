import { defineStore } from 'pinia';
import { collection, onSnapshot, doc, deleteDoc, updateDoc, query, orderBy, addDoc  } from "firebase/firestore";
import { db } from '@/js/firebase';
import { useStoreAuth } from './storeAuth';

let notesCollectionRef;
let notesCollectionQuery;
let getNotesSnapshot = null

export const useStoreNotes = defineStore('storeNotes', {
  state:() => {
    return {
        notes: [],
        notesLoaded: false
    }
  },
  actions: {
    init() {
        const storeAuth = useStoreAuth();

        notesCollectionRef = collection(db, "users", storeAuth.user.id, "notes");
        notesCollectionQuery = query(notesCollectionRef, orderBy("date", "desc"));
        this.getNotes();
    },
    async getNotes() {
        this.notesLoaded = false;
        if(getNotesSnapshot) getNotesSnapshot(); // unsubscribe from any active listener
        getNotesSnapshot = onSnapshot(notesCollectionQuery, (querySnapshot) => {
            const notes = [];
            querySnapshot.forEach((doc) => {
                const note = {
                    id: doc.id,
                    content: doc.data().content,
                    date: doc.data().date
                };
                notes.push(note);
            });
            this.notes = notes;
            this.notesLoaded = true;
        }, error => {
            console.log('error.message: ', error.message);
        });
    },
    clearNotes() {
        this.notes = [];
    },
    async addNote(newNoteContent) {
        const currentDate = new Date().getTime();
        const date = currentDate.toString();

        await addDoc(notesCollectionRef, {
            content: newNoteContent,
            date
        });
    },
    async deleteNote(idToDelete) {
        await deleteDoc(doc(notesCollectionRef, idToDelete));
    },
    async updateNote(id, content) {
        await updateDoc(doc(notesCollectionRef, id), {
            content
        });
    }
  },
  getters: {
    getNoteContent: state => {
        return id => {
            return state.notes.filter(note => note.id === id)[0].content;
        }
    },
    totalNotesCount: state => {
        return state.notes.length;
    },
    totalCharactersCount: state => {
        let count = 0;
        state.notes.forEach(note => {
            count += note.content.length;
        });
        return count;
    }
  }
});