// Firebase Configuration
// Replace these values with your own Firebase project configuration
// Get these values from Firebase Console > Project Settings > Your apps > SDK setup and configuration

const firebaseConfig = {
    apiKey: "AIzaSyB0OdDHkx1e_4DSsXLVQbX2Mvv52-Gdx1k",
    authDomain: "lms-95b55.firebaseapp.com",
    projectId: "lms-95b55",
    storageBucket: "lms-95b55.firebasestorage.app",
    messagingSenderId: "778962405352",
    appId: "1:778962405352:web:3c16642b24e11d12a9865d"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Initialize Firebase Authentication and Firestore
const auth = firebase.auth();
const db = firebase.firestore();

// Google Auth Provider
const googleProvider = new firebase.auth.GoogleAuthProvider();
