import { defineStore } from 'pinia';
import { auth } from '@/js/firebase';
import { createUserWithEmailAndPassword, signOut, signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import { useStoreNotes } from './storeNotes';

export const useStoreAuth = defineStore('storeAuth', {
  state:() => {
    return {
        user: {}
    }
  },
  actions: {
    init() {
        const storeNotes = useStoreNotes();

        onAuthStateChanged(auth, (user) => {
            if (user) {
              this.user.id = user.uid;
              this.user.email = user.email;
              this.router.push('/');
              storeNotes.init();
            } else {
                this.user = {};
                this.router.replace('/auth');
                storeNotes.clearNotes();
            }
        });
    },
    registerUser({email, password}) {
        createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const user = userCredential.user;
        })
        .catch((error) => {
            console.log('error.message ', error.message);
        });
    },
    loginUser({email, password}) {
        signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const user = userCredential.user;
            console.log('logged in')
        })
        .catch((error) => {
            console.log('error.message ', error.message);
        });
    },
    logoutUser() {
        signOut(auth).then(() => {
            console.log('User signed out');
        }).catch((error) => {
            console.log('error.message ', error.message);
        });
    }
  }
});