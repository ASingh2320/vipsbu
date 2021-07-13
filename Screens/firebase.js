import firebase from "firebase/app"
import "firebase/auth"

const app = firebase.initializeApp({
    apiKey: "AIzaSyDxJr0fpODiY_dFuRYxhgQfAOTej3Z9Xa0",
    authDomain: "sbumaps-42dca.firebaseapp.com",
    projectId: "sbumaps-42dca",
    storageBucket: "sbumaps-42dca.appspot.com",
    messagingSenderId: "60167860875",
    appId: "1:60167860875:web:cb4942615f0e89d6bada8e"
});

export const auth = app.auth();
export default app;