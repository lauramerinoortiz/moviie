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
          this.borrar.onclick=this.pulsarBorrar.bind(this)

          this.aceptar=this.div.find('button')[1]
          this.aceptar.onclick=this.pulsarAceptar.bind(this)

          this.netflix=$('#netflix')
          this.netflix.onclick=this.anadirPlataforma.bind(this,'Netflix')

          this.hbo=$('#hbo')
          this.hbo.onclick=this.anadirPlataforma.bind(this, 'Hbo')

          this.disney=$('#disney')
          this.disney.onclick=this.anadirPlataforma.bind(this, 'Disney')

          this.amazon=$('#amazon')
          this.amazon.onclick=this.anadirPlataforma.bind(this,'Amazon')

          this.plataformas=new Set()
	}

     /**
      * Método para cuando damos al boton borrar que limpia el formulario
      */
     pulsarBorrar() {
          this.nombre.text=''
          this.descripcion.text=''
          this.fecha.text=''
          this.duracion.text=''
          this.imagen.text=''
          $('select')[0]='Drama'
  
          
          this.netflix.checked=false
          this.hbo.checked=false
          this.disney.checked=false
          this.amazon.checked=false
          this.plataformas.clear()
          let error=$('#camposrellenos')
          error.css('display','none')
          let insertado=$('#insertado')
          insertado.css('display','none')
          this.nombre.css('borderColor',"#808080")
          this.descripcion.css('borderColor',"#808080")
          this.fecha.css('borderColor',"#808080")
          this.duracion.css('borderColor',"#808080")
     }

     /**
      * Método para cuando damos al boton aceptar
      */
     pulsarAceptar() {
          let error=$('#camposrellenos')
          error.css('display','none')
          let insertado=$('#insertado')
          insertado.css('display','none')
          this.nombre.css('borderColor',"#808080")
          this.descripcion.css('borderColor',"#808080")
          this.fecha.css('borderColor',"#808080")
          this.duracion.css('borderColor',"#808080")

          let nombre=this.nombre.val()

          let descripcion=this.descripcion.val()
          
          let fecha=this.fecha.val()
          
          let duracion=this.duracion.val()

          let imagen=this.imagen.val()

          let vista=null
          if($('#vistaSi').is(':checked')){
               vista=true
          }
          if($('#vistaNo').is(':checked')){
               vista=false
          }

          let genero=$('#genero option:selected');
          let opcion=genero.val()
          
          if(nombre==''){
               error.css('display', 'block')
               this.nombre.css('borderColor',"red")
          }
          else if(descripcion==''){
               error.css('display', 'block')
               this.descripcion.css('borderColor',"red")
          }
          else if(fecha==''){
               error.css('display', 'block')
               this.fecha.css('borderColor',"red")
          }
          else if(duracion==''){
               error.css('display', 'block')
               this.duracion.css('borderColor',"red")
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
               insertado.css('display','block')
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