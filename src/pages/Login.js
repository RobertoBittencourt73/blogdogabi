import React, { Component } from 'react'
import {Link, withRouter} from 'react-router-dom'
import firebase from '../Firebase'
import '../css/login.css'

class Login extends Component{
    constructor(props){
        super(props)
        this.state = {
            email: '',
            senha: ''
        }
        this.entrar = this.entrar.bind(this)
        this.login = this.login.bind(this)
    }
    componentDidMount(){
        if(firebase.getCurrent()){
            this.props.history.replace('/painel')
        }
    }
    entrar(e){
        this.login()
     e.preventDefault()
    }
    login = async () =>{
        const {email, senha} = this.state
        try{
            await firebase.Login(email, senha)
            .catch((error)=>{
                if(error.code === 'auth/user-not-found'){
                    alert('Usuário não Cadastrado!')
                }else{
                    alert('código do erro: ' + error.code)
                }
            })
            this.props.history.replace('/painel')
        }catch(error){
             alert(error.message)
        }
         
        
    }
    render(){
        return(
             <div id='form-login'>
                    
                    <form onSubmit={this.entrar}>
                        <h1>Gabriel Barboza</h1>
                        <label htmlFor='email'>Email</label><br/>
                        <input type='email' id='email' placeholder='exemplo@exemplo.com'
                        value={this.state.email} onChange={(e) => this.setState({email: e.target.value})}
                        autoFocus/><br/>

                        <label htmlFor='senha'>Senha</label><br/>
                        <input type='password' id='senha' placeholder='sua senha'
                        value={this.state.senha} onChange={(e) => this.setState({senha: e.target.value})}/><br/>

                        <button type='submir'>Entrar</button>
                        <Link to='/registro'>Cadastrar Um Novo Usuário</Link>
                    </form>
                    
             </div>
        )
    }
}

export default withRouter(Login)