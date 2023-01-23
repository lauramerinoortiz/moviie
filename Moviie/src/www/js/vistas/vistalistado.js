"use strict" //activo modo estricto
import {Vista} from './vista.js'
/**
 * Clase VistaListado que muestra el CRUD de categorías y subcategorías
 * Gestiona los elementos y métodos de esta Vista
 */
export class VistaListado extends Vista {

	/**
     * Contructor de la clase VistaListado
     * @param {HTMLDivElement} div Div de la vista
     * @param {Object} controlador Controlador de la vista
     */
	constructor(div, controlador) {
		super(div)
          this.controlador = controlador

          this.listado=$('#listado')
          this.peliculas
          this.anadirClick()

	}

     /**
      * Método que añade a cada div de pelicula el onclick al metodo pulsarPelicula del controlador
      */
     anadirClick(){
          this.peliculas=document.getElementsByClassName('pelicula')
          for(let peli of this.peliculas){
               let nombre=peli.lastChild.innerHTML
               peli.onclick=this.pulsarPelicula.bind(this, nombre)
          }
     }

     /**
      * Método para cuando damos click a una pelicula
      */
     pulsarPelicula(nombre){
          this.controlador.pulsarPelicula(nombre)
     }

     /**
      * Método que saca el listado de peliculas guardadas en la base de datos
      * @param {Array} lista 
      */
     mostrarListado(lista){
          this.listado.innerHTML = ""        //vaciamos el div
          if(lista==''){
               let vacio=$('<h1></h1>')
               vacio.append('No hay datos aún. Dale ya a "Nueva" y añade una película.')
               this.listado.append(vacio)
          }
          else{
               let cabezado=$('<h1></h1>')
               cabezado.append('Listado de películas')
               this.listado.append(cabezado)
     
               for(let item of lista){
                    let div=$('<div></div>')
                    div.className='pelicula'
                    if(item.imagen!=''){
                         div.style.backgroundImage="url('"+item.imagen+"')"
                    }
                    else{
                         div.style.backgroundImage="url('assets/recursos/fondo.png')"
                    }
     
                    let oculto=$('<div></div>')
                    oculto.className='oculto'
                    div.append(oculto)
     
                    let titulo=document.createElement('<h2></h2>')
                    div.append(titulo)
                    titulo.append(item.nombre)
                    this.listado.append(div)
               }
               this.anadirClick()       //añadimos a todas las peliculas el onclick que abre sus datos
          }
          
     }
}