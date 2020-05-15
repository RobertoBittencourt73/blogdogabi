import React, { Component } from 'react'
import firebase from '../Firebase'
import { withRouter} from 'react-router-dom'
import { Editor } from '@tinymce/tinymce-react'
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
             <div id='main-container'>
                 <form onSubmit={this.salvar} id='newForm'>
                     <span>{this.state.alert}</span>
                     <label htmlFor='image'>Imagem</label>
                     <input type='text' id='image' placeholder='url da imagem' autoFocus
                       value={this.state.image} onChange={(e)=> this.setState({image: e.target.value})}/>


                     <label htmlFor='titulo'>Título</label>
                     <input type='text' id='titulo' placeholder='Título do Post'
                       value={this.state.titulo} onChange={(e)=> this.setState({titulo: e.target.value})}/>

                     <div className='main-edit'>
                        <label  >Descrição do Post</label>
                        < Editor initialValue = "<p>Descrição do Post</p>"
                            apiKey="s59yj03jzpitx6opcqosvi2hfhbb46tguq9zogwe2e3wvxfx"
                            init = {{                           
                                    height : 200 ,                             
                                    menubar : false , 
                                    plugins : [ 'advlist autolink lists link image charmap print preview anchor' , 
                                    'searchreplace visualblocks code fullscreen' , 
                                    'insertdatetime media table paste code help wordcount' ], 
                                    toolbar : 'undo redo | formatselect | bold italic backcolor |  alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | removeformat | help'
                                }}
                            value={this.state.descricao}
                            onEditorChange ={(e) => this.setState({descricao: e.target.getContent()}) }
                           
                        /> 
                     </div>
                      
                     <label htmlFor='autor'>Autor</label>
                     <input type='text' id='autor' placeholder='Autor do Post' 
                       value={this.state.autor} onChange={(e)=> this.setState({autor: e.target.value})}/>  
                     
                     <div id="btn">
                          <button className='btns' type='submit'>Salvar</button> 
                          <button className='btns' type=''>Voltar</button>   
                     </div>
                 </form>
             </div>
        )
    }
}

export default withRouter( NewPainel )