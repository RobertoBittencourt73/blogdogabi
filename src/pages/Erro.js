import React, {Component} from 'react'
import {Link} from 'react-router-dom'

class Erro extends Component{
    render(){
        return(
            <div>
                <h1>Ops!!! Página não encontrada.</h1>
                <Link to='/'>Home</Link>

            </div>
        )
    }
}
export default Erro