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
              image: null,
              url: '',
              descricao: '',
              autor: '',
              alert: '',
             progress: '0'
        }
        this.salvar = this.salvar.bind(this)
        this.handleEditorChange = this.handleEditorChange.bind(this)
        this.newFile = this.newFile.bind(this)
        this.carregarFile = this.carregarFile.bind(this)
        
    }
    componentDidMount(){
        if(!firebase.getCurrent()){
            this.props.history.replace('/login')
            return null
        }
    }
    salvar(e){
       e.preventDefault()
       if(this.state.titulo !== '' && this.state.descricao !== '' &&
        this.state.autor !== '' && this.state.image !== null && this.state.url !== '' ){
           let posts = firebase.app().ref('posts')
           let chaves = posts.push().key
            posts.child(chaves).set({
               titulo: this.state.titulo,
               image: this.state.url,
               descricao: this.state.descricao,
               autor: this.state.autor,
           })
           this.props.history.replace('/painel')
       }else{
           this.setState({alert: 'Preencha Todos os Campos'})
       }
       
    }
    handleEditorChange = async ( content ) => {
        console.log ( 'Content was updated:' , content )
       await this.setState({descricao: content})
   }
   newFile = async (e) =>{
       if(e.target.files[0]){     
        const image = e.target.files[0]

         if(image.type === 'image/png' || image.type === 'image/jpeg'){
            await this.setState({image})
            this.carregarFile()
         }else{
             this.setState({alert: 'Selecione uma imagem no formato PNG ou JPG'})
             this.setState({image: null})
             return null
         }
        }
   }  
   carregarFile = async () =>{
       const {image} = this.state
       const uid = firebase.getUser()
       const uploadTaks = firebase.storage.ref(`/images/${uid}/${image.name}`)
       .put(image)

       await uploadTaks.on('state_changed', 
       (snapshot)=>{
           this.setState({alert: ''})
            const progress = Math.round(
                (snapshot.bytesTransferred / snapshot.totalBytes) * 100
            )
            this.setState({progress})
       },
       (error)=>{
           console.log('Erro ao carregar a imagem: ' + error)
       },
       ()=>{
           firebase.storage.ref(`/images/${uid}`)
           .child(image.name).getDownloadURL()
           .then(url=>{
               this.setState({url})
           })
       }
       )
    }     
   
    render(){
        return(
             <div id='main-container'>
                 <form onSubmit={this.salvar} id='newForm'>
                     <span>{this.state.alert}</span>
                     
                     <label >Imagem</label>
                     <input className='imagem' type='file' onChange={this.newFile}/>
                    
                        { this.state.url !== ''
                        ?
                            <img src={this.state.url}  alt='imagem do post' />
                              
                        :
                            <progress value={this.state.progress} max='100'/>
                          
                        }
                       
                     <label htmlFor='titulo'>Título</label>
                     <input type='text' id='titulo' placeholder='Título do Post' autoFocus
                       value={this.state.titulo} onChange={(e)=> this.setState({titulo: e.target.value})}/>

                     <div className='main-edit'>
                        <label  >Descrição do Post</label>
                        < Editor 
                            apiKey="s59yj03jzpitx6opcqosvi2hfhbb46tguq9zogwe2e3wvxfx"
                            outputFormat= 'text'
                            init = {{                           
                                    height : 200 ,                             
                                    menubar : false , 
                                    plugins : [ 'advlist autolink lists link image charmap print preview anchor' , 
                                    'searchreplace visualblocks code fullscreen' , 
                                    'insertdatetime media table paste code help wordcount' ], 
                                    toolbar : 'undo redo | formatselect | bold italic backcolor |  alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | removeformat | help'
                                }}
                                value={this.state.descricao}
                                onEditorChange = { this.handleEditorChange }
                           
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
