import React, { Component } from 'react'
import firebase from '../Firebase'
import '../css/home.css'

class Home extends Component{
    constructor(props){
        super(props)
        this.state = {
             posts: []
        }
    }
    componentDidMount(){
      firebase.app().ref('posts').once('value', (snapshot)=>{
            let state = this.state
            state.posts = []

            snapshot.forEach(itens => {
                state.posts.push({
                    key: itens.key,
                    titulo: itens.val().titulo,
                    image: itens.val().image,
                    descricao: itens.val().descricao,
                    autor: itens.val().autor
        
                })
            });
            state.posts.reverse()
            this.setState(state)
       })
        
    }
    render(){
        return(
            <section>
                   {this.state.posts.map((item)=>{
                       return(
                           <article key={item.key}>
                               <img src={item.image} alt='imagem do post' id='capa'/>
                               <header>
                                   <h1 id='titulo'>{item.titulo}</h1><br/>
                                   <span>Autor: {item.autor}</span>
                               </header>
                                   
                               <footer>
                                     <p>{item.descricao}</p>
                               </footer>    
                           </article>
                       )
                   })}
            </section>            
        )
    }
}

export default Home

