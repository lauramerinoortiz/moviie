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
		this.liBuscar = $('li')[3]
		
		this.liListado.click(this.pulsarListado.bind(this))
		this.liNuevo.click(this.pulsarNuevo.bind(this)) 
		this.liLogo.click(this.pulsarListado.bind(this))
		this.liBuscar.click(this.pulsarBuscar.bind(this)) 
	}

	/**
	 *	Atención a la pulsación sobre el enlace del listado
	 */
	pulsarListado() {
		this.controlador.pulsarListado()
	}


	/**
	 *	Atención a la pulsación sobre el enlace de nuevo
	 */
	pulsarNuevo() {
		this.controlador.pulsarNavNuevo()
	}

	/**
	 *	Atención a la pulsación sobre el enlace de buscar
	 */
	 pulsarBuscar() {
		this.controlador.pulsarNavBuscar()
	}

}