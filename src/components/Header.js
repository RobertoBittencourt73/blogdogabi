import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import '../css/header.css'

class Header extends Component{
    constructor(props){
        super(props)
        this.state = {

        }
    }
    render(){
        return(
            <div className='main-header'>
                <header>
                    <Link to='/'>Blog do Gabi</Link>
                    <Link to='/sobre'>Gabriel Barboza</Link>
                    <Link to='/login'>Entrar</Link>

                </header>
            </div>
        )
    }
}

export default Header