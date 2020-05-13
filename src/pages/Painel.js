import React, { Component } from 'react'
import {withRouter, Link} from 'react-router-dom'
import firebase from '../Firebase'
import '../css/painel.css'



class Painel extends Component{
    constructor(props){
        super(props)
        this.state = {
             nome: localStorage.nome
        }
        this.sair = this.sair.bind(this )
    }
    componentDidMount(){
        if(!firebase.getCurrent()){
            this.props.history.replace('/login')
            return null
        }
        firebase.getName((info)=>{
            localStorage.nome = info.val().nome
            this.setState({nome: localStorage.nome })
        })
    }
    sair = async() => {
       await firebase.Logout()

       this.props.history.replace('/')
       localStorage.removeItem('nome')
        
    }
    render(){
        return(
             <div id="main-painel">
                   <header>
                      <h3>Bem vindo: {this.state.nome}</h3> 
                      <h4>Logado por: roberto@teste.com</h4>
                   </header>
                    <section>
                        <Link to='/painel/newpainel'>Novo Post</Link>
                        <Link to='/registro'>Cadastrar Usuários</Link>
                        <button onClick={ this.sair}>Sair</button>
                    </section>
             </div>
        )
    }
}

export default withRouter( Painel )