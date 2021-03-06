import app from 'firebase/app'
import 'firebase/database'
import 'firebase/auth'
import 'firebase/storage'


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
        this.storage = app.storage()
    }

//===================== metodo de Login ===============================================

Login(email, senha){
    return app.auth().signInWithEmailAndPassword(email, senha)
}

//===================== metodo para deslogar ==========================================
    Logout(){
        return app.auth().signOut()
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



//================= Metodo para buscar o nome no banco de dados ========================

async getName(callback){
    if(!app.auth().currentUser){
        return null
    }
     
    const uid = app.auth().currentUser.uid
    await app.database().ref('usuarios').child(uid).once('value').then(callback)
}
//================== Metodo para buscar o uid do usuario ================================

getUser(){
    return app.auth().currentUser && app.auth().currentUser.uid
}

}
export default new Firebase()