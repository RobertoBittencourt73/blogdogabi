import React, { Component } from 'react'
import firebase from '../Firebase'
import { withRouter} from 'react-router-dom'
import '../css/new.css'

class NewPainel extends Component{
    constructor(props){
        super(props)
        this.state = {
              titulo: '',
              image: '',
              url: '',
              descricao: '',
              autor: '',
              alert: ''
        }
        this.salvar = this.salvar.bind(this)
    }
    componentDidMount(){
        if(!firebase.getCurrent()){
            this.props.history.replace('/login')
            return null
        }
    }
    salvar(e){
       e.preventDefault()
       if(this.state.titulo !== '' && this.state.image !== '' && this.state.descricao !== '' && this.state.autor !== ''){
           let posts = firebase.app().ref('posts')
           let chaves = posts.push().key
            posts.child(chaves).set({
               titulo: this.state.titulo,
               image: this.state.image,
               descricao: this.state.descricao,
               autor: this.state.autor,
           })
           this.props.history.replace('/painel')
       }else{
           this.setState({alert: 'Preencha Todos os Campos'})
       }
       
    }
    render(){
        return(
             <div>
                 <form onSubmit={this.salvar} id='newForm'>
                     <span>{this.state.alert}</span>
                     <label htmlFor='image'>Imagem</label>
                     <input type='text' id='image' placeholder='url da imagem' autoFocus
                       value={this.state.image} onChange={(e)=> this.setState({image: e.target.value})}/>


                     <label htmlFor='titulo'>Título</label>
                     <input type='text' id='titulo' placeholder='Título do Post'
                       value={this.state.titulo} onChange={(e)=> this.setState({titulo: e.target.value})}/>

                     <label htmlFor='descricao'>Descrição</label>
                     <textarea type='text' id='descricao' placeholder='Conteúdo do Post'
                       value={this.state.descricao} onChange={(e)=> this.setState({descricao: e.target.value})}/> 

                     <label htmlFor='autor'>Autor</label>
                     <input type='text' id='autor' placeholder='Autor do Post' 
                       value={this.state.autor} onChange={(e)=> this.setState({autor: e.target.value})}/>  

                     <button type='submit'>Salvar</button>   
                 </form>
             </div>
        )
    }
}

export default withRouter( NewPainel )