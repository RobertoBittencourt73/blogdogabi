import React, { Component } from 'react'
import '../css/sobre.css'

class Sobre extends Component{
    constructor(props){
        super(props)
        this.state = {

        }
    }
    render(){
        return(
            <section>
                 <h1>Gabriel Barboza</h1>
                 <img src='foto-gabi.png' alt='imagem do Gabriel barboza' />
               
                        <p> Sou Gabriel professor e estudante de educação física,
                        formado em licenciatura pera UFRGS/2018,
                        atualmente graduando em bacharelado.</p> 
                        <p>Atuo na área de treinamento físico, 
                        trabalhando com musculação e treinamento funcional.</p>
                        <p> Minha paixão pelo movimento teve seu início em 2010 ao me matricular em uma academia.
                            A partir desse ponto passei a observar a educação física com outros olhos
                        e buscar conhecimento na área.</p>
                        <p> Foi então que em 2013 decidi prestar o vestibular para educação física
                        e assim ingressar na universidade.</p>
                 

            </section>
        )
    }
}

export default Sobre