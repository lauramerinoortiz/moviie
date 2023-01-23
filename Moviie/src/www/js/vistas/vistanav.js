"use strict"
/**
 *	Implementa una vista del menú de navegación.
 */
export class VistaNav{
	/**
	 *	Constructor de la clase.
	 *	@param {HTMLElement} nav Nav de HTML en el que se desplegará la vista.
	 *	@param {Object} controlador Controlador de la vista del administrador.
	 */
	constructor(nav, controlador) {
		this.controlador = controlador
		this.nav = nav
		
		this.liLogo = $('li')[0]
		this.liListado = $('li')[1]
		this.liNuevo = $('li')[2]
		console.log(this.liNuevo)
		this.liBuscar = $('li')[3]
		
		this.liListado.onclick=this.pulsarListado.bind(this)
		this.liNuevo.onclick=this.pulsarNuevo.bind(this)
		this.liLogo.onclick=this.pulsarListado.bind(this)
		this.liBuscar.onclick=this.pulsarBuscar.bind(this) 
	}

	/**
	 *	Atención a la pulsación sobre el enlace del listado
	 */
	pulsarListado() {
		console.log('pulsando listado')
		this.controlador.pulsarListado()
	}


	/**
	 *	Atención a la pulsación sobre el enlace de nuevo
	 */
	pulsarNuevo() {
		console.log('pulsando nuevo')
		this.controlador.pulsarNavNuevo()
	}

	/**
	 *	Atención a la pulsación sobre el enlace de buscar
	 */
	 pulsarBuscar() {
		console.log('pulsando buscar')
		this.controlador.pulsarNavBuscar()
	}

}