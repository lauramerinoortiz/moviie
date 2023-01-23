"use strict" //activo modo estricto
import { Pelicula } from './pelicula.js'
import {Vista} from './vista.js'
/**
 * Clase VistaModificar que muestra el formulario para una nueva pelicula
 * Gestiona los elementos y métodos de esta Vista
 */
export class VistaModificar extends Vista {

	/**
     * Contructor de la clase VistaModificar
     * @param {HTMLDivElement} div Div de la vista
     * @param {Object} controlador Controlador de la vista
     */
	constructor(div, controlador) {
		super(div)
          this.controlador = controlador
          this.div=document.getElementById('modificar')

          this.nombre=document.getElementById('nombreEditar')
          this.descripcion=document.getElementById('descripcionEditar')
          this.fecha=document.getElementById('fechaEditar')
          this.duracion=document.getElementById('duracionEditar')
          this.imagen=document.getElementById('imagenEditar')

          this.netflix=document.getElementById('netflixEditar')
          this.netflix.onclick=this.anadirPlataforma.bind(this,'Netflix')

          this.hbo=document.getElementById('hboEditar')
          this.hbo.onclick=this.anadirPlataforma.bind(this, 'Hbo')

          this.disney=document.getElementById('disneyEditar')
          this.disney.onclick=this.anadirPlataforma.bind(this, 'Disney')

          this.amazon=document.getElementById('amazonEditar')
          this.amazon.onclick=this.anadirPlataforma.bind(this,'Amazon')

          this.cancelar=this.div.getElementsByTagName('button')[0]
          this.cancelar.onclick = this.pulsarCancelar.bind(this)

          this.plataformas=new Set()  //Set para guardar los datos introducidos
	}

     /**
      * Método para cuando damos click a Cancelar
      */
     pulsarCancelar() {
          this.controlador.pulsarCancelar()
     }

     /**
      * Método para cuando damos click a Aceptar
      */
     pulsarAceptar(id) {
          let error=document.getElementById('camposrellenosEditar')
          console.log(id)
          if(this.nombre.value==''){
               error.style.display='block'
               this.nombre.style.borderColor="red"
          }
          else if(this.descripcion.value==''){
               error.style.display='block'
               this.descripcion.style.borderColor="red"
          }
          else if(this.fecha.value==''){
               error.style.display='block'
               this.fecha.style.borderColor="red"
          }
          else if(this.duracion.value==''){
               error.style.display='block'
               this.duracion.style.borderColor="red"
          }
          else{
               //Coger los datos del formulario
               let peliculaNueva=new Pelicula()
               peliculaNueva.setNombre(this.nombre.value)
               peliculaNueva.setDescripcion(this.descripcion.value)
               peliculaNueva.setFecha(this.fecha.value)
               peliculaNueva.setDuracion(this.duracion.value)
               peliculaNueva.setImagen(this.imagen.value)
               peliculaNueva.setPlataforma(this.plataformas)

               let vista=null
               if(document.getElementById('vistaSiEditar').checked){
                    vista=true
               }
               if(document.getElementById('vistaNoEditar').checked){
                    vista=false
               }

               let genero=document.getElementById('generoEditar')
               let opcion=genero.options[genero.selectedIndex].value
               peliculaNueva.setVista(vista)
               peliculaNueva.setGenero(opcion)

               this.controlador.modificarPelicula(id, peliculaNueva)
          }
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
          document.getElementsByTagName('select')[0].value='Drama'
     
          
          this.netflix.checked=false
          this.hbo.checked=false
          this.disney.checked=false
          this.amazon.checked=false
          this.plataformas.clear()
          let error=document.getElementById('camposrellenosEditar')
          error.style.display='none'
          this.nombre.style.borderColor="#808080"
          this.descripcion.style.borderColor="#808080"
          this.fecha.style.borderColor="#808080"
          this.duracion.style.borderColor="#808080"
     }

     /**
      * Método que muestra los datos de la pelicula introducidos en el formulario
      * @param {Oject} pelicula 
      */
     mostrarDatos(pelicula){
          this.pulsarBorrar()
          this.nombre.value=pelicula.nombre
          this.descripcion.value=pelicula.descripcion
          this.fecha.value=pelicula.fecha
          this.duracion.value=pelicula.duracion
          this.imagen.value=pelicula.imagen
          for(let item of pelicula.plataforma){
               this.plataformas.add(item)
          }
          document.getElementById('generoEditar').value=pelicula.genero
          if(this.plataformas.has('Netflix')){
               this.netflix.checked=true
          }
          if(this.plataformas.has('Hbo')){
               this.hbo.checked=true
          }
          if(this.plataformas.has('Amazon')){
               this.amazon.checked=true
          }
          if(this.plataformas.has('Disney')){
               this.disney.checked=true
          }

          this.aceptar=this.div.getElementsByTagName('button')[1]
          this.aceptar.onclick = this.pulsarAceptar.bind(this, pelicula.id)
          
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

     }
}