import React, { Component } from 'react'
import firebase from '../Firebase'
import { withRouter} from 'react-router-dom'
import '../css/registro.css'

class Registro extends Component{
    constructor(props){
        super(props)
        this.state = {
              nome: '',
              email: '',
              senha: ''
        }
        this.salvar = this.salvar.bind(this)
    }
    salvar(){
        try{
            const{nome, email, senha} = this.state
            firebase.Cadastrar(nome,email,senha)
            this.props.history.replace('/painel')

        }catch(error){
            alert(error.message)
        }
    }
  
    render(){
        return(
            <div id='form-registro'>
                    
            <form onSubmit={this.salvar} id='form'>
                <h1>Gabriel Barboza</h1>

                <label htmlFor='nome'>Nome</label><br/>
                <input type='text' id='nome' placeholder='Digite seu nome completo'
                value={this.state.nome} onChange={(e) => this.setState({nome: e.target.value})}
                autoFocus/><br/>

                <label htmlFor='email'>Email</label><br/>
                <input type='email' id='email' placeholder='exemplo@exemplo.com'
                value={this.state.email} onChange={(e) => this.setState({email: e.target.value})}
                /><br/>

                <label htmlFor='senha'>Senha</label><br/>
                <input type='password' id='senha' placeholder='sua senha'
                value={this.state.senha} onChange={(e) => this.setState({senha: e.target.value})}/><br/>

                <button type='submir'>Salvar</button>
                
            </form>
            
     </div>
        )
    }
}

export default withRouter( Registro )