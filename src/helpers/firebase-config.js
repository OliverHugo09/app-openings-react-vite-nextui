// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAR0y4SWY7hsUwTjzvq7RK0IbCCZCGyk3c",
    authDomain: "openings-cloud-react.firebaseapp.com",
    projectId: "openings-cloud-react",
    storageBucket: "openings-cloud-react.appspot.com",
    messagingSenderId: "311170324177",
    appId: "1:311170324177:web:ffb27e8611eaea24b0d7f0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app)