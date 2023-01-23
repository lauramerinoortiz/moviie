"use strict" //activo modo estricto
import {Vista} from './vista.js'
/**
 * Clase VistaBuscar que muestra el formulario para buscar una pelicula
 * Gestiona los elementos y métodos de esta Vista
 */
export class VistaBuscar extends Vista {

	/**
     * Contructor de la clase VistaBuscar
     * @param {HTMLDivElement} div Div de la vista
     * @param {Object} controlador Controlador de la vista
     */
	constructor(div, controlador) {
		super(div)
          this.controlador = controlador

          this.div=$('#buscar')

          this.aceptar=this.div.find('button')[0]
          this.aceptar.click(this.pulsarAceptar.bind(this))
	}

     /**
      * Método para cuando pulsamos el boton aceptar
      */
     pulsarAceptar() {
          let vista
          if(document.getElementById('vistaSiBuscar').checked){
               vista=true
          }
          if(document.getElementById('vistaNoBuscar').checked){
               vista=false
          }

          let genero=document.getElementById('generoBuscar')
          let opcion=genero.options[genero.selectedIndex].value
          let lista=this.controlador.pulsarBuscar(vista, opcion)
     }

     /**
      * Método que saca las peliculas según la lista de resultados que recibe
      * @param {Array} lista 
      */
     listar(lista){
          let resul=document.getElementById('resul')
          resul.innerHTML = ""        //vaciamos el div
          if(lista==''){      //si la lista viene vacia porque no hay coincidencias
               let vacio=document.createElement('h2')
               vacio.appendChild(document.createTextNode('No hay datos que coincidan'))
               resul.appendChild(vacio)
          }
          else{
               for(let item of lista){
                    let div=document.createElement('div')
                    div.className='pelicula'
                    if(item.imagen!=''){
                         div.style.backgroundImage="url('"+item.imagen+"')"
                    }
                    else{
                         div.style.backgroundImage="url('assets/recursos/fondo.png')"
                    }

                    let oculto=document.createElement('div')
                    oculto.className='oculto'
                    div.appendChild(oculto)

                    let titulo=document.createElement('h2')
                    div.appendChild(titulo)
                    titulo.appendChild(document.createTextNode(item.nombre))
                    resul.appendChild(div)
               }
               this.anadirClick()
          }
     }

     /**
      * Método para añadir el método onclick a cada pelicula
      */
     anadirClick(){
          let div=document.getElementById('resul')
          let listado=div.getElementsByClassName('pelicula')
          for(let peli of listado){
               peli.onclick=this.pulsarPelicula.bind(this)
          }
     }

     /**
      * Método para cuando damos click a una pelicula
      */
     pulsarPelicula(){
          this.controlador.pulsarPelicula()
     }
}