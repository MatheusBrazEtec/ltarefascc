import firebase from 'firebase/compat/app';
import 'firebase/compat/database';
import 'firebase/compat/auth'; 


const firebaseConfig = {
  apiKey: "AIzaSyB7Mev47x4w4WfcR5wMvcLdMgrwKwb1P6M",
  authDomain: "etec-e4e49.firebaseapp.com",
  databaseURL: "https://etec-e4e49-default-rtdb.firebaseio.com",
  projectId: "etec-e4e49",
  storageBucket: "etec-e4e49.appspot.com",
  messagingSenderId: "520864674547",
  appId: "1:520864674547:web:67ab4d228a6f89de753d86",
  measurementId: "G-20R8HN0FM2"
}

// Inicialize o Firebase
// Delete o Firebase App existente, se existir
if (firebase.apps.length) {
  firebase.apps[0].delete()
    .then(() => {
      console.log('Firebase App excluído com sucesso');
      // Inicialize o Firebase com a nova configuração
      firebase.initializeApp(firebaseConfig);
    })
    .catch(error => {
      console.error('Erro ao excluir o Firebase App:', error);
    });
} else {
  console.log('Nenhum Firebase App encontrado para excluir');
  firebase.initializeApp(firebaseConfig);
}

export default firebase;
