import app from 'firebase/app'
import 'firebase/database'
import 'firebase/auth'

let firebaseConfig = {
    apiKey: "AIzaSyDPlGeFDmQN4W60tLSb6qc6sfqyQV7X3sw",
    authDomain: "blog-do-gabi-fbb01.firebaseapp.com",
    databaseURL: "https://blog-do-gabi-fbb01.firebaseio.com",
    projectId: "blog-do-gabi-fbb01",
    storageBucket: "blog-do-gabi-fbb01.appspot.com",
    messagingSenderId: "644791163940",
    appId: "1:644791163940:web:2f6b61c06e77465efc8cb1"
  };
  
 

class Firebase{
    constructor(){
         app.initializeApp(firebaseConfig);
        this.app = app.database
    }

//===================== metodo de Login ===============================================

Login(email, senha){
    return app.auth().signInWithEmailAndPassword(email, senha)
}

//===================== Metodo de Cadastro ============================================

async Cadastrar (nome, email, senha){
    await app.auth().createUserWithEmailAndPassword(email, senha)
    const uid = app.auth().currentUser.uid

    return app.database().ref('usuarios').child(uid).set({
        nome: nome
    })
}

//===================== metodo para inicializar o projeto ==============================
inicializado(){
    return new Promise(res => {
        app.auth().onAuthStateChanged(res)
    })
}



//================= metodo para verificar se já tem um usuario logado ===================

getCurrent(){
   return app.auth().currentUser && app.auth().currentUser.email
}

}

export default new Firebase()