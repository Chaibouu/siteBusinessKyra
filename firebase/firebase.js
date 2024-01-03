// firebase.js
import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.7.0/firebase-app.js'
/* import { initializeApp } from 'firebase/app'; */
/* import { getStorage } from 'firebase/storage'; */
// Add Firebase products that you want to use
import { getAuth } from 'https://www.gstatic.com/firebasejs/10.7.0/firebase-auth.js'
import { getFirestore, collection, getDocs, addDoc } from 'https://www.gstatic.com/firebasejs/10.7.0/firebase-firestore.js'
import { getStorage,ref, uploadBytesResumable, getDownloadURL, deleteObject } from 'https://www.gstatic.com/firebasejs/10.7.0/firebase-storage.js'

/* const firebaseConfig = {
    // Vos informations de configuration Firebase ici
    apiKey: process.env.NEXT_PUBLIC_APIKEY,
    authDomain: process.env.NEXT_PUBLIC_AUTHDOMAIN,
    projectId: process.env.NEXT_PUBLIC_PROJECTID,
    storageBucket: process.env.NEXT_PUBLIC_STORAGEBUCKET,
    messagingSenderId: process.env.NEXT_PUBLIC_MESSAGINGSENDERID,
    appId: process.env.NEXT_PUBLIC_APPID,
    measurementId: process.env.NEXT_PUBLIC_MEASUREMENTID

}; */

const firebaseConfig = {
    apiKey: "AIzaSyBjtm-e31v9bwtFPiTkwhV_09ZJhPaLiFY",
    authDomain: "businesskyra.firebaseapp.com",
    projectId: "businesskyra",
    storageBucket: "businesskyra.appspot.com",
    messagingSenderId: "116680662181",
    appId: "1:116680662181:web:e50593cb3c3b0699c6814c"
  };

const app = initializeApp(firebaseConfig);
const storage = getStorage(firebaseApp);


const addFile = async (file, folderName, filename) => {
    const storageRef = ref(storage, `${folderName}/${filename}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    return new Promise((resolve, reject) => {
        uploadTask.on(
            'state_changed',
            (snapshot) => {
                // Gérer la progression du téléchargement si nécessaire
            },
            (error) => {
                reject(error);
            },
            () => {
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    resolve(downloadURL);
                });
            }
        );
    });
  };

const updateFile = async (oldFileURL, newFile, folderName, filename) => {
    // Supprimer l'ancien fichier
    const oldFileRef = ref(storage, oldFileURL);
    await deleteObject(oldFileRef);

    // Ajouter le nouveau fichier
    return addFile(newFile, folderName, filename);
};

const deleteFile = async (fileURL) => {
    const fileRef = ref(storage, fileURL);
    await deleteObject(fileRef);
};









export { storage };