// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase-admin/app';
import { getStorage } from 'firebase-admin/storage';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCLf7YUCTyPN9spPSmbzwxFpxSLfz7Mqoc",
  authDomain: "whisper-key.firebaseapp.com",
  projectId: "whisper-key",
  storageBucket: "whisper-key.appspot.com",
  messagingSenderId: "1097281157212",
  appId: "1:1097281157212:web:e9c42bc24d566fd269ce99"
};


 export const app = initializeApp(firebaseConfig);
 export const storage = getStorage(app);
