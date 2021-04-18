import firebase from 'firebase/app'
import 'firebase/auth'

const firebaseConfig = {
  apiKey: "AIzaSyAMVI7PeVDPdoRb96lUGSxhp71tC_lWSuc",
  authDomain: "rick-morty-64a7c.firebaseapp.com",
  projectId: "rick-morty-64a7c",
  storageBucket: "rick-morty-64a7c.appspot.com",
  messagingSenderId: "831910452663",
  appId: "1:831910452663:web:8daa89da730caa76eadc32"
};

firebase.initializeApp(firebaseConfig)

export async function loginWithGoogle() {
  const provider = new firebase.auth.GoogleAuthProvider()
  const { user } = await firebase.auth().signInWithPopup(provider)
  return user
}

export function signOutGoogle() {
  firebase.auth().signOut();
}