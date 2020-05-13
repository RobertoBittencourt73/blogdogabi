import React, { Component } from 'react';
import Routes from './Routes'
import firebase from './Firebase'
import './css/app.css'


class App extends Component{
  constructor(props){
    super(props)
    this.state = {
      iniciar: false
    }
  }
  componentDidMount(){
       firebase.inicializado().then(res =>{
         this.setState({iniciar: res})
       })
  }
  render(){
    return this.state.iniciar !== false
    ?
        (
            <Routes />
        )
    :
        (
          <h1>Carregando...</h1>
        )    
  }
}

export default App;
