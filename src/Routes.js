import React, { Component } from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'

import Header from './components/Header'
import Home from './pages/Home'
import Sobre from './pages/Sobre'
import Login from './pages/Login'
import Registro from './pages/Registro'
import Painel from './pages/Painel'
import NewPainel from './pages/NewPainel'

class Routes extends Component{
    constructor(props){
        super(props)
        this.state = {

        }
    }
    render(){
        return(
             <div> 
                 <BrowserRouter>
                      <Header />
                      <Switch>
                          <Route exact path='/' component={ Home } />
                          <Route exact path='/sobre' component={ Sobre } />
                          <Route exact path='/login' component={ Login } />
                          <Route exact path='/registro' component={ Registro } />
                          <Route exact path='/painel' component={ Painel } />
                          <Route exact path='/painel/newpainel' component={ NewPainel } />
                      </Switch>
                 </BrowserRouter>

             </div>
        )
    }
}

export default Routes