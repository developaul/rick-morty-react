import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyAMVI7PeVDPdoRb96lUGSxhp71tC_lWSuc",
  authDomain: "rick-morty-64a7c.firebaseapp.com",
  projectId: "rick-morty-64a7c",
  storageBucket: "rick-morty-64a7c.appspot.com",
  messagingSenderId: "831910452663",
  appId: "1:831910452663:web:8daa89da730caa76eadc32"
};

firebase.initializeApp(firebaseConfig)

const db = firebase.firestore().collection('favs')

export async function getFavs(uid) {
  const snap = await db.doc(uid).get()
  return snap.data().array
}

export function updateDB(array, uid) {
  return db.doc(uid).set({ array })
}

export async function loginWithGoogle() {
  const provider = new firebase.auth.GoogleAuthProvider()
  const { user } = await firebase.auth().signInWithPopup(provider)
  return user
}

export function signOutGoogle() {
  firebase.auth().signOut();
}