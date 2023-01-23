"use strict" //activo modo estricto
import { Pelicula } from './pelicula.js'
import {Vista} from './vista.js'
/**
 * Clase VistaNueva que muestra el formulario para una nueva pelicula
 * Gestiona los elementos y métodos de esta Vista
 */
export class VistaNueva extends Vista {

	/**
     * Contructor de la clase VistaNueva
     * @param {HTMLDivElement} div Div de la vista
     * @param {Object} controlador Controlador de la vista
     */
	constructor(div, controlador) {
		super(div)
          this.controlador = controlador
          this.div=$('#nueva')

          this.nombre=$('#nombre')
          this.descripcion=$('#descripcion')
          this.fecha=$('#fecha')
          this.duracion=$('#duracion')
          this.imagen=$('#imagen')

          this.borrar=this.div.find('button')[0]
          this.borrar.click(this.pulsarBorrar.bind(this)) 

          this.aceptar=this.div.find('button')[1]
          this.aceptar.click(this.pulsarAceptar.bind(this)) 

          this.netflix=$('#netflix')
          this.netflix.click(this.anadirPlataforma.bind(this,'Netflix'))

          this.hbo=$('#hbo')
          this.hbo.click(this.anadirPlataforma.bind(this, 'Hbo'))

          this.disney=$('#disney')
          this.disney.click(this.anadirPlataforma.bind(this, 'Disney'))

          this.amazon=$('#amazon')
          this.amazon.click(this.anadirPlataforma.bind(this,'Amazon'))

          this.plataformas=new Set()
	}

     /**
      * Método para cuando damos al boton borrar que limpia el formulario
      */
     pulsarBorrar() {
          this.nombre.value=''
          this.descripcion.value=''
          this.fecha.value=''
          this.duracion.value=''
          this.imagen.value=''
          $('select')[0]='Drama'
  
          
          this.netflix.checked=false
          this.hbo.checked=false
          this.disney.checked=false
          this.amazon.checked=false
          this.plataformas.clear()
          let error=document.getElementById('camposrellenos')
          error.style.display='none'
          let insertado=document.getElementById('insertado')
          insertado.style.display='none'
          this.nombre.style.borderColor="#808080"
          this.descripcion.style.borderColor="#808080"
          this.fecha.style.borderColor="#808080"
          this.duracion.style.borderColor="#808080"
     }

     /**
      * Método para cuando damos al boton aceptar
      */
     pulsarAceptar() {
          let error=document.getElementById('camposrellenos')
          error.style.display='none'
          let insertado=document.getElementById('insertado')
          insertado.style.display='none'
          this.nombre.style.borderColor="#808080"
          this.descripcion.style.borderColor="#808080"
          this.fecha.style.borderColor="#808080"
          this.duracion.style.borderColor="#808080"

          let nombre=this.nombre.value

          let descripcion=this.descripcion.value
          
          let fecha=this.fecha.value
          
          let duracion=this.duracion.value

          let imagen=this.imagen.value

          let vista=null
          if(document.getElementById('vistaSi').checked){
               vista=true
          }
          if(document.getElementById('vistaNo').checked){
               vista=false
          }

          let genero=document.getElementById('genero')
          let opcion=genero.options[genero.selectedIndex].value
          
          if(nombre==''){
               error.style.display='block'
               this.nombre.style.borderColor="red"
          }
          else if(descripcion==''){
               error.style.display='block'
               this.descripcion.style.borderColor="red"
          }
          else if(fecha==''){
               error.style.display='block'
               this.fecha.style.borderColor="red"
          }
          else if(duracion==''){
               error.style.display='block'
               this.duracion.style.borderColor="red"
          }
          else{
               let pelicula= new Pelicula()
               pelicula.setNombre(nombre)
               pelicula.setDescripcion(descripcion)
               pelicula.setFecha(fecha)
               pelicula.setDuracion(duracion)
               pelicula.setVista(vista)
               pelicula.setGenero(opcion)
               pelicula.setPlataforma(this.plataformas)
               pelicula.setImagen(imagen)
               
               this.controlador.nuevaPelicula(pelicula)
               this.pulsarBorrar()
               insertado.style.display='block'
          }

     }

     /**
      * Método que se ejecuta al pulsar cualquier checkbox, eliminandolo del Set si existe o añadiendolo
      */
     anadirPlataforma(elemento){
          if(this.plataformas.has(elemento)){
               this.plataformas.delete(elemento)
          }
          else{
               this.plataformas.add(elemento)
          }

          console.log(this.plataformas)
     }

}