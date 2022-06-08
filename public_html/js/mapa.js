

//pagina principal

//Contenido index
var mapa;
var introduccion;
// var videoplato;
var nombremapa;
var dades; //On se guarda sa info de es JSON de plats/begudes/productes
var dadesCocineros; //On se guarda sa info de es JSON de cocineros
var dadesComentarios;
var dadesMonumentos;
window.onload = function () {
	//localStorage.clear();
	mapa = document.getElementById("cuerpoprincipal");
	introduccion = document.getElementById("introducción-content");
	footer = document.getElementById("footer");
	document.body.removeChild(footer);
	seleccionarMapa("elementogridsecciones1");
	crearAlbumCocineros();
	crearAlbumGastronomia(false);

	crearAlbumMonumentos();
	iniciarfuncionnavegador();
	//crearGrafica();
	// videoplato = document.getElementById("videoplato");
	// videoplato.parentNode.removeChild(intro);

}

function iniciarfuncionnavegador() {
	var input = document.getElementById("buscadorNav");
	input.addEventListener("keypress", function (event) {
		event.preventDefault();
		if (event.key === "Enter") {
			var resultadobusqueda = platosRelacionados(input.value);
			crearAlbumBusqueda(resultadobusqueda, input.value);
			input.value = "";
			var boxsearch = document.getElementById("box-search");
			boxsearch.innerHTML = "";
		}
		else {
			input.value = input.value + event.key;
			var resultadobusqueda = palabraEmpiezaCon(input.value);
			mostrarboxsearch(resultadobusqueda);
		}
	});
	document.body.onclick = function (e) {
		var boxsearch = document.getElementById("box-search");
		if (e.target != document.getElementById('buscadorNav')) {

			boxsearch.style.display = "none";
		} else {
			boxsearch.style.display = "block";
		}
	}
}
function mostrarboxsearch(resultadobusqueda) {
	var boxsearch = document.getElementById("box-search");
	boxsearch.style.display = "block";
	boxsearch.innerHTML = "";
	resultadobusqueda.forEach(function (arrayItem) {
		var elementobusqueda = document.createElement("li");
		var contenidoElemento = document.createElement("a");
		var funcion = "CrearInfo(" + arrayItem.identifier + ")";
		contenidoElemento.setAttribute("onclick", funcion);
		contenidoElemento.innerHTML = arrayItem.name;
		elementobusqueda.appendChild(contenidoElemento);
		boxsearch.appendChild(elementobusqueda);

	});
}


function platosRelacionados(palabra) {
	return dades.gastronomia.filter(el => {
		var nombre = el.name.toLowerCase();
		palabra = palabra.toLowerCase();
		return (nombre.indexOf(palabra) !== -1);
	});
}

function palabraEmpiezaCon(palabra) {
	return dades.gastronomia.filter(el => {
		var nombre = el.name.toLowerCase();
		palabra = palabra.toLowerCase();
		return (nombre.startsWith(palabra));
	});
}

function crearAlbumBusqueda(elementosbusqueda, palabrabuscada) {
	var cuerpoAlbumTop = document.createElement("section");
	cuerpoAlbumTop.id = "cuerpoprincipal";
	cuerpoAlbumTop.classList.add("ses1");
	cuerpoAlbumTop.classList.add("sectionalbum");
	var tituloAlbumTop = document.createElement("div");
	tituloAlbumTop.id = "titu";
	tituloAlbumTop.classList.add = "titulo";
	var contenidoTitulo = document.createElement("H1");
	contenidoTitulo.id = "headtituloalbum";
	contenidoTitulo.classList.add("heading");
	contenidoTitulo.innerHTML = "<span> Resultados de la busqueda de '" + palabrabuscada + "'</span>";
	tituloAlbumTop.appendChild(contenidoTitulo);
	cuerpoAlbumTop.appendChild(tituloAlbumTop);

	// var firstchild = document.getElementById("headtitulosecciones");
	// firstchild.innerHTML = "<span>PLATOS</span> DE <span>LAS ISLAS BALEARES</span>";

	var album = document.createElement("div");
	album.classList.add("contenedorAlbum");

	elementosbusqueda.forEach(function (arrayItem) {
		var plat = document.createElement("div");
		plat.classList.add("gridItem");
		// plat.classList.add("gridAlbum");
		var funcion = "CrearInfo(" + + arrayItem.identifier + ")";
		plat.setAttribute("onclick", funcion);


		// switch (nombremapa) {
		// 	case 'PLATOS' :
		// 		var funcion = "CrearInfo(" + + arrayItem.identifier +")";
		// 		plat.setAttribute("onclick", funcion);
		// 		break;
		// 	case 'PRODUCTOS':
		// 		plat.setAttribute("onclick", "crearProducto()");
		// 		break;
		// 	case 'BEBIDAS':
		// 		plat.setAttribute("onclick", "location.href='info-bebidas.html'");
		// 		break;
		// }
		var imagen = document.createElement("img");
		imagen.src = arrayItem.image[0].name;
		//imagen.setAttribute("onclick", "crearPlato()");
		var texto = document.createElement("H3");
		texto.innerHTML = arrayItem.name;
		plat.appendChild(imagen);
		plat.appendChild(texto);
		album.appendChild(plat);
	});
	var reemplazo = document.getElementById("cuerpoprincipal");
	cuerpoAlbumTop.appendChild(album);
	reemplazo.parentNode.replaceChild(cuerpoAlbumTop, reemplazo);



	//Eliminar (si existen) elementos de la página principal
	if (document.getElementById("introducción-content")) {
		document.getElementById("introducción-content").parentNode.removeChild(document.getElementById("introducción-content"));
	}
	if (document.getElementById("cuerposlider")) {
		document.getElementById("cuerposlider").parentNode.removeChild(document.getElementById("cuerposlider"));
	}
	if (document.getElementById("topplatos")) {
		document.getElementById("topplatos").parentNode.removeChild(document.getElementById("topplatos"));
	}
	if (document.getElementById("layout")) {
		document.getElementById("layout").parentNode.removeChild(document.getElementById("layout"));
	}

	creargastronomiasemantica(elementosbusqueda, true, true);
	scroll(0, 0);
}




function seleccionarMapa(x) {
	var nodes = document.getElementById("contenedorelegirmapa").childNodes;
	for (var i = 0; i < nodes.length; i++) {
		if (nodes[i].nodeName.toLowerCase() == 'div') {
			nodes[i].firstElementChild.classList.remove("textactive");
			nodes[i].firstElementChild.classList.add("text");

		}
	}

	var gridseleccionado = document.getElementById(x);

	gridseleccionado.firstElementChild.classList.remove("text");
	gridseleccionado.firstElementChild.classList.add("textactive");
	//eliminar listeners
	nombremapa = gridseleccionado.title;
	var titulomapa = document.getElementById("headtitulomapa");
	titulomapa.innerHTML = "<span>MAPA </span>" + "DE <span>" + nombremapa + "</span>" + "</h1>";
}



// function muestraMensaje() {
// 	var objetivo = document.getElementById("contenedorelegirmapa");
// 	var nuevoElemento = document.createElement("div");
// 	var imagen = document.createElement("img");
// 	imagen.src = "images/gastronomia/bebidastip.jpg";
// 	nuevoElemento.classList.add("gridItem");
// 	nuevoElemento.appendChild(imagen);
// 	var texto = document.createElement("h3");
// 	texto.innerHTML = "Texto De Ejemplo";
// 	nuevoElemento.appendChild(texto);
// 	objetivo.appendChild(nuevoElemento);
// }

function mostrarpaginaprincipal() {
	while (document.body.lastChild.id != "header") {
		document.body.removeChild(document.body.lastChild);
	}
	crearAlbumGastronomia(true);
	crearAlbumCocineros();

	//crearGrafica();
	// document.body.appendChild(introduccion);
	// document.body.appendChild(mapa);
	// addslider();
	// addmejorvalorados();
	// addGrafica();
	// document.body.appendChild(footer);
}

function addslider() {
	var cuerposlider = document.createElement("section");
	cuerposlider.id = "cuerposlider";
	cuerposlider.classList.add("seccionslider");
	var contenedorSlider = document.createElement("div");
	contenedorSlider.id = "contenedorSlider";
	contenedorSlider.classList.add("contenedor5");

	var carousel = document.createElement("div");
	carousel.id = "carousel";
	carousel.classList.add("carousel");


	var tituloSlider = document.createElement("h1");
	tituloSlider.id = "tituloSlider";
	tituloSlider.classList.add("heading");
	tituloSlider.innerHTML = "<span> MEJORES COCINEROS</span></h1>";
	carousel.appendChild(tituloSlider);


	var carousel__contenedor = document.createElement("div");
	carousel__contenedor.id = "carousel__contenedor";
	carousel__contenedor.classList.add("carousel__contenedor");

	//boton anterior
	var buttonatras = document.createElement("button");
	buttonatras.id = "buttonatras";
	buttonatras.classList.add("carousel__anterior");
	buttonatras.ariaLabel = "Anterior";
	buttonatras.innerHTML = '<i class="fas fa-chevron-left"></i>';
	carousel__contenedor.appendChild(buttonatras);


	//AlbumCocineros
	var carousel__primerosplatos = document.createElement("div");
	carousel__primerosplatos.id = "carousel__primerosplatos";
	carousel__primerosplatos.classList.add("carousel__lista");
	carousel__contenedor.appendChild(carousel__primerosplatos);

	// var glidertrack = document.createElement("div");
	// glidertrack.classList.add("glider-track");
	// carousel__primerosplatos.appendChild(glidertrack);



	//Añadir cocineros a la primerosplatos
	dadesCocineros.cocineros.forEach(function (arrayItem) {
		var cocinero = document.createElement("div");
		cocinero.classList.add("carousel__elemento");
		// plat.classList.add("gridAlbum");
		var funcion = "crearcocinero('" + arrayItem.cocinero.name + "')";
		cocinero.setAttribute("onclick", funcion);
		var imagen = document.createElement("img");
		imagen.src = arrayItem.cocinero.image[0].name;
		imagen.alt = arrayItem.cocinero.name;
		//imagen.setAttribute("onclick", "crearPlato()");
		var texto = document.createElement("p");
		texto.innerHTML = arrayItem.cocinero.name;
		cocinero.appendChild(imagen);
		cocinero.appendChild(texto);
		carousel__primerosplatos.appendChild(cocinero);
	});

	//boton siguiente
	var buttonadelante = document.createElement("button");
	buttonadelante.id = "buttonadelante";
	buttonadelante.classList.add("carousel__siguiente");
	buttonadelante.ariaLabel = "Siguiente";
	buttonadelante.innerHTML = ' <i class="fas fa-chevron-right"></i>';
	carousel__contenedor.appendChild(buttonadelante);


	var tablist = document.createElement("div");
	// tablist.setAttribute("role", "tablist");
	tablist.classList.add("carousel__indicadores");




	//potonposterior



	carousel.appendChild(carousel__contenedor);
	carousel.appendChild(tablist);
	contenedorSlider.appendChild(carousel);
	cuerposlider.appendChild(contenedorSlider);
	document.body.appendChild(cuerposlider);

	new Glider(document.querySelector('.carousel__lista'), {
		slidesToShow: 1,
		slidesToScroll: 1,
		dots: '.carousel__indicadores',
		draggable: true,
		arrows: {
			prev: '.carousel__anterior',
			next: '.carousel__siguiente'
		},
		responsive: [
			{
				// screens greater than >= 775px
				breakpoint: 450,
				settings: {
					// Set to `auto` and provide item width to adjust to viewport
					slidesToShow: 2,
					slidesToScroll: 2
				}
			}, {
				// screens greater than >= 1024px
				breakpoint: 800,
				settings: {
					slidesToShow: 4,
					slidesToScroll: 4
				}
			}
		]
	});
	crearcocinerosemantica(dadesCocineros.cocineros, true)

}
function getMonumentosProvincia(provincia) {
	var elemento = dadesMonumentos.monumentos.find(function (element) {

		return Object.getOwnPropertyNames(element)[0] == provincia;
	});
	console.log(Object.entries(elemento)[0][1]);
	return Object.entries(elemento)[0][1];
}


function addsliderMonumentos(elemento, nodopadre) {
	var cuerposlider = document.createElement("div");
	cuerposlider.id = "cuerposliderMonumentos";
	cuerposlider.classList.add("seccionslider");
	var contenedorSlider = document.createElement("div");
	contenedorSlider.id = "contenedorSlider";
	contenedorSlider.classList.add("contenedor5");

	var carousel = document.createElement("div");
	carousel.id = "carousel";
	carousel.classList.add("carousel");


	var tituloSlider = document.createElement("h1");
	tituloSlider.id = "tituloSlider";
	tituloSlider.classList.add("titleMonumentos");
	tituloSlider.innerHTML = "También te puede interesar... <span> Monumentos de " + elemento.datosextra.comunidadAutonoma + "</span></h1>";
	carousel.appendChild(tituloSlider);


	var carousel__contenedor = document.createElement("div");
	carousel__contenedor.id = "carousel__contenedor";
	carousel__contenedor.classList.add("carousel__contenedor");

	//boton anterior
	var buttonatras = document.createElement("button");
	buttonatras.id = "buttonatras";
	buttonatras.classList.add("carousel__anterior");
	buttonatras.classList.add("notsig");
	buttonatras.ariaLabel = "Anterior";
	buttonatras.innerHTML = '<i class="fas fa-chevron-left"></i>';
	carousel__contenedor.appendChild(buttonatras);


	//AlbumCocineros
	var carousel__monumentos = document.createElement("div");
	carousel__monumentos.id = "carousel__monumentos";
	carousel__monumentos.classList.add("carousel__lista");
	carousel__contenedor.appendChild(carousel__monumentos);

	// var glidertrack = document.createElement("div");
	// glidertrack.classList.add("glider-track");
	// carousel__primerosplatos.appendChild(glidertrack);


	var listamonumentos = getMonumentosProvincia(elemento.datosextra.comunidadAutonoma);
	//Añadir cocineros a la primerosplatos
	listamonumentos.forEach(function (arrayItem) {
		var cocinero = document.createElement("div");
		cocinero.classList.add("carousel__elemento");
		cocinero.classList.add("notp");
		// plat.classList.add("gridAlbum");
		var imagen = document.createElement("img");
		imagen.src = "https://practicatecmmpc.netlify.app/" + arrayItem.image[0];
		//imagen.setAttribute("onclick", "crearPlato()");
		var texto = document.createElement("p");
		texto.innerHTML = arrayItem.name;
		cocinero.appendChild(imagen);
		cocinero.appendChild(texto);
		carousel__monumentos.appendChild(cocinero);
	});

	//boton siguiente
	var buttonadelante = document.createElement("button");
	buttonadelante.id = "buttonadelante";
	buttonadelante.classList.add("carousel__siguiente");
	buttonadelante.classList.add("notsig");
	buttonadelante.ariaLabel = "Siguiente";
	buttonadelante.innerHTML = ' <i class="fas fa-chevron-right"></i>';
	carousel__contenedor.appendChild(buttonadelante);


	var tablist = document.createElement("div");
	// tablist.setAttribute("role", "tablist");
	tablist.classList.add("carousel__indicadores");
	tablist.classList.add("not");




	//potonposterior



	carousel.appendChild(carousel__contenedor);
	carousel.appendChild(tablist);
	contenedorSlider.appendChild(carousel);
	cuerposlider.appendChild(contenedorSlider);
	nodopadre.appendChild(cuerposlider);

	new Glider(carousel__monumentos, {
		slidesToShow: 1,
		slidesToScroll: 1,
		dots: '.carousel__indicadores',
		draggable: true,
		arrows: {
			prev: '.carousel__anterior',
			next: '.carousel__siguiente'
		},
		responsive: [
			{
				// screens greater than >= 775px
				breakpoint: 450,
				settings: {
					// Set to `auto` and provide item width to adjust to viewport
					slidesToShow: 2,
					slidesToScroll: 2
				}
			}, {
				// screens greater than >= 1024px
				breakpoint: 800,
				settings: {
					slidesToShow: 4,
					slidesToScroll: 4
				}
			}
		]
	});

}




function getPlatosValorados(arr) {
	return arr.filter(el => {
		return (el.aggregateRating.ratingCount != 0);
	});
}

function addmejorvalorados() {

	var mejoresPlatos = getPlatosValorados(dades.gastronomia);
	mejoresPlatos.sort(function (a, b) {
		if ((a.aggregateRating.ratingValue / a.aggregateRating.ratingCount) > (b.aggregateRating.ratingValue / b.aggregateRating.ratingCount)) {
			return -1;

		}
		if ((a.aggregateRating.ratingValue / a.aggregateRating.ratingCount) < (b.aggregateRating.ratingValue / b.aggregateRating.ratingCount)) {
			return 1;
		}
		// a must be equal to b
		return 0;
	});
	var primerosplatos = mejoresPlatos.slice(0, 8);



	var cuerpoAlbumTop = document.createElement("section");
	cuerpoAlbumTop.id = "topplatos";
	cuerpoAlbumTop.classList.add("ses1");
	//cuerpoAlbumTop.classList.add("sectionalbum");
	var tituloAlbumTop = document.createElement("div");
	tituloAlbumTop.id = "titu";
	tituloAlbumTop.classList.add = "titulo";
	var contenidoTitulo = document.createElement("H1");
	contenidoTitulo.id = "headtituloalbum";
	contenidoTitulo.classList.add("heading");
	contenidoTitulo.innerHTML = "<span>PLATOS MEJOR VALORADOS</span>";
	tituloAlbumTop.appendChild(contenidoTitulo);
	cuerpoAlbumTop.appendChild(tituloAlbumTop);

	// var firstchild = document.getElementById("headtitulosecciones");
	// firstchild.innerHTML = "<span>PLATOS</span> DE <span>LAS ISLAS BALEARES</span>";

	var album = document.createElement("div");
	album.classList.add("contenedorAlbum");

	primerosplatos.forEach(function (arrayItem) {
		var plat = document.createElement("div");
		plat.classList.add("gridItem");
		// plat.classList.add("gridAlbum");
		var funcion = "CrearInfo(" + + arrayItem.identifier + ")";
		plat.setAttribute("onclick", funcion);


		// switch (nombremapa) {
		// 	case 'PLATOS' :
		// 		var funcion = "CrearInfo(" + + arrayItem.identifier +")";
		// 		plat.setAttribute("onclick", funcion);
		// 		break;
		// 	case 'PRODUCTOS':
		// 		plat.setAttribute("onclick", "crearProducto()");
		// 		break;
		// 	case 'BEBIDAS':
		// 		plat.setAttribute("onclick", "location.href='info-bebidas.html'");
		// 		break;
		// }
		var imagen = document.createElement("img");
		imagen.src = arrayItem.image[0].name;
		imagen.alt = arrayItem.name;
		//imagen.setAttribute("onclick", "crearPlato()");
		var texto = document.createElement("H3");
		texto.innerHTML = arrayItem.name;
		plat.appendChild(imagen);
		plat.appendChild(texto);
		album.appendChild(plat);
	});
	cuerpoAlbumTop.appendChild(album);
	document.body.appendChild(cuerpoAlbumTop);
	creargastronomiasemantica(primerosplatos, true, false);
}

function addGrafica() {
	var layout = document.createElement("section");
	layout.id = "layout";
	var contenedorgrafica = document.createElement("div");
	contenedorgrafica.id = "contenedorgrafica";
	layout.appendChild(contenedorgrafica);

	//svg
	var xmlns = "http://www.w3.org/2000/svg";
	var boxWidth = 750;
	var boxHeight = 360;

	var svgElem = document.createElementNS(xmlns, "svg");
	svgElem.setAttributeNS(null, "viewBox", "0 0 " + boxWidth + " " + boxHeight);
	svgElem.setAttributeNS(null, "id", "graficaVisitas");



	// var svg =document.createElement("svg");
	// svg.setAttribute("viewBox",'0 0 750 500');
	contenedorgrafica.innerHTML = "";
	contenedorgrafica.appendChild(svgElem);
	document.body.appendChild(layout);

	var valoresGrafica = crearGrafica();
	dibujarGrafica(valoresGrafica);


}


// function crearmapa() {
// 	var contenedor = document.createElement("div");
// 	contenedor.classList.add("containermapa");
// 	contenedor.appendChild(mapa);
// 	var padre = document.getElementById("nuevo");
// 	padre.appendChild(contenedor);

// }


function crearAlbum(nombreProvincia) {
	if (navigator.online) {
		const requestURL = "../JSON/gastronomia.json";
		const request = new XMLHttpRequest();

		request.onreadystatechange = function () {
			if (request.readyState == 4 && request.status == 200) {
				dades = "";
				dades = JSON.parse(request.responseText);
				crearAlbum2(dades.gastronomia, nombreProvincia);
			}
		}
		request.open('GET', requestURL);
		request.responseType = 'text';
		request.send();
	}
	else {
		crearAlbum2(dades.gastronomia, nombreProvincia);
	}
}


function crearAlbumCocineros() {
	if (navigator.onLine) {
		const requestURL = "../JSON/cocineros.json"
		const request = new XMLHttpRequest();

		request.onreadystatechange = function () {
			if (request.readyState == 4 && request.status == 200) {
				dadesCocineros = JSON.parse(request.responseText);

			}
		}
		request.open('GET', requestURL);
		request.responseType = 'text';
		request.send();
	}

}

function crearAlbumMonumentos() {
	if (navigator.onLine) {
		const requestURL = "https://practicatecmmpc.netlify.app/json/monumentos.json"
		const request = new XMLHttpRequest();

		request.onreadystatechange = function () {
			if (request.readyState == 4 && request.status == 200) {
				dadesMonumentos = JSON.parse(request.responseText);
				console.log(dadesMonumentos);
			}
		}
		request.open('GET', requestURL);
		request.responseType = 'text';
		request.send();
	}

}



function crearAlbumGastronomia(grafica) {
	if (navigator.onLine) {
		const requestURL = "../JSON/gastronomia.json"
		const request = new XMLHttpRequest();

		request.onreadystatechange = function () {
			if (request.readyState == 4 && request.status == 200) {
				dades = "";
				dades = JSON.parse(request.responseText);
				if (grafica) {
					document.body.appendChild(introduccion);
					document.body.appendChild(mapa);


					// var valoresGrafica = crearGrafica();
					// dibujarGrafica(valoresGrafica);
				}
				addslider();
				addmejorvalorados();
				addGrafica();
				document.body.appendChild(footer);


			}
		}
		request.open('GET', requestURL);
		request.responseType = 'text';
		request.send();
	}

}

function modificarValoracion(id, valoracion) {
	var estrellas = document.getElementById("Estrellas");
	estrellas.classList.remove("ec-stars-wrapper");
	estrellas.innerHTML = "Gracias por votar";
	$.post('../PHP/modificarValoracion.php', { num: id, val: valoracion }, function (result) {
		//alert(result);
	});
}



function getInfoComunidadAutonoma(arr, comAut, tipoElemento) {
	return arr.filter(el => {
		return (el.datosextra.comunidadAutonoma === comAut && el.datosextra.typeElement === tipoElemento);
	});
}


function crearAlbum2(info, nombreProvincia) {
	let primerosplatos
	switch (nombremapa) {
		case 'PLATOS':
			primerosplatos = getInfoComunidadAutonoma(info, nombreProvincia, "Plato");
			break;
		case 'PRODUCTOS':
			primerosplatos = getInfoComunidadAutonoma(info, nombreProvincia, "Producto");
			break;
		case 'BEBIDAS':
			primerosplatos = getInfoComunidadAutonoma(info, nombreProvincia, "Bebida");
			break;
	}

	var cuerpoAlbumTop = document.createElement("section");
	cuerpoAlbumTop.id = "cuerpoprincipal";
	cuerpoAlbumTop.classList.add("ses1");
	cuerpoAlbumTop.classList.add("sectionalbum");
	var tituloAlbumTop = document.createElement("div");
	tituloAlbumTop.id = "titu";
	tituloAlbumTop.classList.add = "titulo";
	var contenidoTitulo = document.createElement("H1");
	contenidoTitulo.id = "headtituloalbum";
	contenidoTitulo.classList.add("heading");
	contenidoTitulo.innerHTML = "<span>" + nombremapa + "</span> DE <span>" + nombreProvincia + "</span>";
	tituloAlbumTop.appendChild(contenidoTitulo);
	cuerpoAlbumTop.appendChild(tituloAlbumTop);

	// var firstchild = document.getElementById("headtitulosecciones");
	// firstchild.innerHTML = "<span>PLATOS</span> DE <span>LAS ISLAS BALEARES</span>";

	var album = document.createElement("div");
	album.classList.add("contenedorAlbum");

	primerosplatos.forEach(function (arrayItem) {
		var plat = document.createElement("div");
		plat.classList.add("gridItem");
		// plat.classList.add("gridAlbum");
		var funcion = "CrearInfo(" + + arrayItem.identifier + ")";
		plat.setAttribute("onclick", funcion);


		// switch (nombremapa) {
		// 	case 'PLATOS' :
		// 		var funcion = "CrearInfo(" + + arrayItem.identifier +")";
		// 		plat.setAttribute("onclick", funcion);
		// 		break;
		// 	case 'PRODUCTOS':
		// 		plat.setAttribute("onclick", "crearProducto()");
		// 		break;
		// 	case 'BEBIDAS':
		// 		plat.setAttribute("onclick", "location.href='info-bebidas.html'");
		// 		break;
		// }
		var imagen = document.createElement("img");
		imagen.src = arrayItem.image[0].name;
		//imagen.setAttribute("onclick", "crearPlato()");
		var texto = document.createElement("H3");
		texto.innerHTML = arrayItem.name;
		plat.appendChild(imagen);
		plat.appendChild(texto);
		album.appendChild(plat);
	});
	var reemplazo = document.getElementById("cuerpoprincipal");
	cuerpoAlbumTop.appendChild(album);
	reemplazo.parentNode.replaceChild(cuerpoAlbumTop, reemplazo);



	//Eliminar (si existen) elementos de la página principal
	if (document.getElementById("introducción-content")) {
		document.getElementById("introducción-content").parentNode.removeChild(document.getElementById("introducción-content"));
	}
	if (document.getElementById("cuerposlider")) {
		document.getElementById("cuerposlider").parentNode.removeChild(document.getElementById("cuerposlider"));
	}
	if (document.getElementById("topplatos")) {
		document.getElementById("topplatos").parentNode.removeChild(document.getElementById("topplatos"));
	}
	if (document.getElementById("layout")) {
		document.getElementById("layout").parentNode.removeChild(document.getElementById("layout"));
	}

	creargastronomiasemantica(primerosplatos, true, true);
	scroll(0, 0);
}


// function crearAlbum() {
// 	let primerosplatos
// 	let referencia
// 	infoGastronomia = obtenerprimerosplatosGastronomia();
// 	switch (nombremapa) {
// 		case 'PLATOS':
// 			primerosplatos = plats;
// 			break;
// 		case 'PRODUCTOS':
// 			primerosplatos = productes;
// 			break;
// 		case 'BEBIDAS':
// 			primerosplatos = begudes;
// 			break;
// 	}

// 	var cuerpoAlbumTop = document.createElement("section");
// 	cuerpoAlbumTop.id = "cuerpoprincipal";
// 	cuerpoAlbumTop.classList.add("ses1");
// 	cuerpoAlbumTop.classList.add("sectionalbum");
// 	var tituloAlbumTop = document.createElement("div");
// 	tituloAlbumTop.id = "titu";
// 	tituloAlbumTop.classList.add = "titulo";
// 	var contenidoTitulo = document.createElement("H1");
// 	contenidoTitulo.id = "headtituloalbum";
// 	contenidoTitulo.classList.add("heading");
// 	contenidoTitulo.innerHTML = "<span>" + nombremapa + "</span> DE <span>LAS ISLAS BALEARES</span>";
// 	tituloAlbumTop.appendChild(contenidoTitulo);
// 	cuerpoAlbumTop.appendChild(tituloAlbumTop);

// 	var firstchild = document.getElementById("headtitulosecciones");
// 	firstchild.innerHTML = "<span>PLATOS</span> DE <span>LAS ISLAS BALEARES</span>";

// 	var album = document.createElement("div");
// 	album.classList.add("contenedorAlbum");

// 	primerosplatos.forEach(function (arrayItem) {
// 		var plat = document.createElement("div");
// 		plat.classList.add("gridItem");
// 		// plat.classList.add("gridAlbum");
// 		switch (nombremapa) {
// 			case 'PLATOS':
// 				plat.setAttribute("onclick", "crearPlato()");
// 				break;
// 			case 'PRODUCTOS':
// 				plat.setAttribute("onclick", "crearProducto()");
// 				break;
// 			case 'BEBIDAS':
// 				plat.setAttribute("onclick", "location.href='info-bebidas.html'");
// 				break;
// 		}
// 		var imagen = document.createElement("img");
// 		imagen.src = arrayItem.imatge;
// 		//imagen.setAttribute("onclick", "crearPlato()");
// 		var texto = document.createElement("H3");
// 		texto.innerHTML = arrayItem.nom;
// 		plat.appendChild(imagen);
// 		plat.appendChild(texto);
// 		album.appendChild(plat);
// 	});
// 	var reemplazo = document.getElementById("cuerpoprincipal");
// 	cuerpoAlbumTop.appendChild(album);
// 	reemplazo.parentNode.replaceChild(cuerpoAlbumTop, reemplazo);



// 	//Eliminar estadísticas y cocineros
// 	var intro = document.getElementById("introducción-content");
// 	intro.parentNode.removeChild(intro);
// 	var cuerposlider = document.getElementById("cuerposlider");
// 	cuerposlider.parentNode.removeChild(cuerposlider);
// 	var Grafica = document.getElementById("layout");
// 	Grafica.parentNode.removeChild(Grafica);
// 	var masValorados = document.getElementById("topplatos");
// 	masValorados.parentNode.removeChild(masValorados);

// }

function encontrarElementoPorId(id) {
	var elemento = dades.gastronomia.find(function (element) {
		return element.identifier == id;
	});
	return elemento;
}


function CrearInfo(id) {
	var elemento = encontrarElementoPorId(id);

	switch (elemento.datosextra.typeElement) {
		case 'Plato':
			crearPlato(elemento);
			break;
		case 'Producto':
			crearProducto(elemento);
			break;
		case 'Bebida':
			crearProducto(elemento);
			break;
	}

}





function crearPlato(elemento) {
	//Aumentar numero de visitas en el plato
	$.post('../PHP/aumentarVisitas.php', { num: elemento.identifier }, function (result) {
		//alert(result);
	});
	var indexelemento = dades.gastronomia.findIndex((obj => obj.identifier == elemento.identifier))
	dades.gastronomia[indexelemento].interactionStatistic.userInteractionCount++;
	console.log(dades.gastronomia[indexelemento].interactionStatistic.userInteractionCount);

	//Dibujar plato
	var cuerpoPlato = document.createElement("section");
	cuerpoPlato.id = "cuerpoprincipal";
	cuerpoPlato.classList.add("ses1");
	cuerpoPlato.classList.add("sectioninfoplatos");
	var contenedorinfoplatos = document.createElement("div");
	contenedorinfoplatos.id = "contenedorinfoplatos";
	contenedorinfoplatos.classList.add("contenedor");
	var contenidoplato = document.createElement("div");
	contenidoplato.id = "contenidoplato";
	contenidoplato.classList.add("contenido");
	var descripcionplato = document.createElement("p");
	descripcionplato.innerHTML = elemento.description;
	contenidoplato.appendChild(descripcionplato);
	contenedorinfoplatos.appendChild(contenidoplato);

	//Estrellas
	var puntuacionplato = document.createElement("div");
	puntuacionplato.id = "puntuacionplato";
	puntuacionplato.classList.add("puntuacion");


	var estrellas = document.createElement("div");
	estrellas.id = "Estrellas";
	estrellas.classList.add("ec-stars-wrapper");
	for (var i = 1; i <= 5; i++) {
		var estrella = document.createElement("a");
		estrella.setAttribute("onclick", "modificarValoracion(" + elemento.identifier + "," + i + ")");
		//estrella.href = "modificarValoracion("+ elemento.identifier + "," + i +")";
		estrella.title = "Votar con " + i + " estrellas";
		estrella.innerHTML = "&#9733;";
		estrellas.appendChild(estrella);
	}

	// estrellas.innerHTML = '<a href="#" title="Votar con 1 estrellas">&#9733;</a>' +
	// 	'<a href="#" title="Votar con 2 estrellas">&#9733;</a>' +
	// 	'<a href="#" title="Votar con 3 estrellas">&#9733;</a>' +
	// 	'<a href="#" title="Votar con 4 estrellas">&#9733;</a>' +
	// 	'<a href="#" title="Votar con 5 estrellas">&#9733;</a>';
	puntuacionplato.appendChild(estrellas);

	if (elemento.aggregateRating.ratingCount != 0) {
		var puntuacionMedia = document.createElement("p");
		var pts = elemento.aggregateRating.ratingValue / elemento.aggregateRating.ratingCount
		puntuacionMedia.innerHTML = pts.toFixed(1) + " &#9733;";
		puntuacionplato.appendChild(puntuacionMedia);
	}

	var favEstrella = document.createElement("a");
	favEstrella.id = "favEstrella"
	if (esfavorito(elemento.identifier)) {
		favEstrella.innerHTML = " &#128148 Eliminar de favoritos";
		favEstrella.style.color = "#C1121F";
		favEstrella.style.cursor = "pointer";
	}
	else {
		favEstrella.innerHTML = " &#x2764 Añadir a favoritos";
		favEstrella.style.color = "#003049";
		favEstrella.style.cursor = "pointer";
	}
	favEstrella.setAttribute("onclick", "modificarfavoritos('" + elemento.identifier + "')");
	puntuacionplato.appendChild(favEstrella);
	contenedorinfoplatos.appendChild(puntuacionplato);

	//Video
	//Api Youtube
	//ponerIdvideo(elemento.video);
	var videoplato = document.createElement("div");
	videoplato.id = "videoplato";
	videoplato.classList.add("video");
	ponerIdvideo(elemento.video);
	loadVideo();



	// videoplato.innerHTML = '<iframe width="560" height="315" src="https://www.youtube.com/embed/bMItEFgyvf8"' +
	// 	'title="YouTube video player" frameborder="0"' +
	// 	'allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"' +
	// 	'allowfullscreen></iframe>';

	contenedorinfoplatos.appendChild(videoplato);

	//imagen
	var imagenPlato = document.createElement("div");
	imagenPlato.id = "imagenplato";
	imagenPlato.classList.add("imagen");

	var imgplato = document.createElement("img");
	imgplato.src = elemento.image[0].name;
	var tituloplato = document.createElement("h3");
	tituloplato.innerHTML = elemento.name;
	imagenPlato.appendChild(imgplato);
	imagenPlato.appendChild(tituloplato);
	contenedorinfoplatos.appendChild(imagenPlato);


	//Ingredientes
	var recetaplato = document.createElement("aside");
	recetaplato.id = "recetaplato";
	recetaplato.classList.add("sidebar");

	var ingredientes = '<h3>INGREDIENTES</h3>' +
		'<ul>';
	elemento.recipeIngredient.forEach(function (arrayItem) {
		ingredientes += '<li>';
		ingredientes += arrayItem;
		ingredientes += '</li>';
	});
	ingredientes += '</ul>';

	var instrucciones = '<br>' + '<h3>INSTRUCCIONES</h3>' +
		'<ul>';
	elemento.recipeInstructions.forEach(function (arrayItem) {
		instrucciones += '<li>';
		instrucciones += arrayItem;
		instrucciones += '</li>';
	});
	instrucciones += '</ul>';

	var tiempoPrep = '<br>' + '<strong>Tiempo de preparación: </strong>' + elemento.prepTime;
	var tiempoCocinado = '<br>' + '<strong>Tiempo de cocinado: </strong>' + elemento.cookTime;
	var tiempoTotal = '<br>' + '<strong>Tiempo total: </strong>' + elemento.totalTime;
	recetaplato.innerHTML = ingredientes + instrucciones + tiempoPrep + tiempoCocinado + tiempoTotal;
	contenedorinfoplatos.appendChild(recetaplato);
	cuerpoPlato.appendChild(contenedorinfoplatos);
	//document.getElementById("cuerpoprincipal").appendChild(cuerpoPlato);


	//Cambiar info de la pagina
	var reemplazo = document.getElementById("cuerpoprincipal");
	reemplazo.parentNode.replaceChild(cuerpoPlato, reemplazo);

	//Eliminar (si existen) elementos de la página principal
	if (document.getElementById("introducción-content")) {
		document.getElementById("introducción-content").parentNode.removeChild(document.getElementById("introducción-content"));
	}
	if (document.getElementById("cuerposlider")) {
		document.getElementById("cuerposlider").parentNode.removeChild(document.getElementById("cuerposlider"));
	}
	if (document.getElementById("topplatos")) {
		document.getElementById("topplatos").parentNode.removeChild(document.getElementById("topplatos"));
	}
	if (document.getElementById("layout")) {
		document.getElementById("layout").parentNode.removeChild(document.getElementById("layout"));
	}


	//Botón anterior, siguiente y volver.
	var canviarelemento = document.createElement("div");
	canviarelemento.id = "canviarelemento";
	canviarelemento.classList.add("canviarelemento");

	var idAnterior = elemento.identifier - 1;
	var idSiguiente = elemento.identifier + 1;

	if (encontrarElementoPorId(idAnterior)) {
		var botonanterior = document.createElement("div");
		botonanterior.id = "botonanterior";
		botonanterior.setAttribute("onclick", "CrearInfo('" + idAnterior + "')");
		botonanterior.classList.add("indicadorcambio");
		botonanterior.innerHTML = '<i class="fa-solid fa-angles-left"></i>';
		canviarelemento.appendChild(botonanterior);
	}



	var volver = document.createElement("a");
	volver.id = "volver";
	volver.classList.add("volver");
	volver.setAttribute("onclick", "crearAlbum('" + elemento.datosextra.comunidadAutonoma + "')");
	volver.innerHTML = "VOLVER";
	canviarelemento.appendChild(volver);

	if (encontrarElementoPorId(idSiguiente)) {
		var botonsiguiente = document.createElement("div");
		botonsiguiente.id = "botonsiguiente";
		botonsiguiente.classList.add("indicadorcambio");
		botonsiguiente.setAttribute("onclick", "CrearInfo('" + idSiguiente + "')");
		botonsiguiente.innerHTML = '<i class="fa-solid fa-angles-right"></i>';
		canviarelemento.appendChild(botonsiguiente);
	}

	//Comentarios
	var contenedorComentarios = document.createElement("div");
	contenedorComentarios.id = "contenedorComentarios";
	contenedorComentarios.classList.add("contenedorComentarios");

	var tituloComentarios = document.createElement("div");
	tituloComentarios.id = "tituloComentarios";
	tituloComentarios.classList.add("heading");
	tituloComentarios.innerHTML = "<span>COMENTARIOS</span>";
	contenedorComentarios.appendChild(tituloComentarios);


	agafar(2, elemento);



	var crearcomentario = document.createElement("div");
	crearcomentario.id = "crearcomentario";
	crearcomentario.classList.add("comment");
	crearcomentario.innerHTML = '<h3>Deja tu comentario</h3>' +
		'<textarea id="msg" name="user_message"></textarea>' +
		'<h4>Nombre</h4>' +
		'<input type="text" id="name" name="user_name">' +
		'<h4>Email</h4>' +
		'<input type="email" id="mail" name="user_mail">' +
		'<div class="comentar">' +
		'<a onclick="verificar(' + elemento.identifier + ')">Comenta</a>' +
		'</div>' +
		'</div>';
	contenedorComentarios.appendChild(crearcomentario);

	cuerpoPlato.appendChild(canviarelemento);
	addsliderMonumentos(elemento, cuerpoPlato);
	cuerpoPlato.appendChild(contenedorComentarios);

	creargastronomiasemantica(elemento, false, true);//Web Semántica
	scroll(0, 0);


}
var nom;
var msg;
var mail;
var id;
var tiempoTranscurrido;
var hoy;
function verificar(elemento) {

	nom = $('#name').val();
	msg = $('#msg').val();
	mail = $('#mail').val();
	id = elemento;
	tiempoTranscurrido = Date.now();
	hoy = new Date(tiempoTranscurrido);
	if (msg == "") {
		alert('Escriba el comentario');
		return;
	} else if (nom == "") {
		alert('Escriba el nombre');
		return;
	} else if (mail == "") {
		alert('Escriba el Email');
		return;
	} else {
		var primerosplatoscomentarios = document.createElement("div");
		primerosplatoscomentarios.id = "primerosplatoscomentarios";
		primerosplatoscomentarios.classList.add("comment");
		primerosplatoscomentarios.innerHTML = '<h4>' + nom + '</h4> <span>' + hoy.toLocaleDateString() + '</span> <br>' +
			'<p> ' + msg + '</p >' +
			'</div>';
		contenedorComentarios.appendChild(primerosplatoscomentarios);
		document.getElementById("msg").value = "";
		$('input[type="text"]').val('');
		$('input[type="email"]').val('');
		agafar(1, elemento);
	}
}

function agafar(valor, elemento) {
	const request = new XMLHttpRequest();
	request.onreadystatechange = function () {
		if (request.readyState == 4 && request.status == 200) {
			dadesComentarios = JSON.parse(request.responseText);

			if (valor == 1) {
				addarray();
			}
			if (valor == 2) {
				pintar(elemento);
			}

		}
	}
	request.open('GET', 'JSON/comentario.json');
	request.responseType = 'text';
	request.send();
}
function addarray() {
	console.log(dadesComentarios.comentarios);
	dadesComentarios.comentarios.push(
		{
			"comentario": {
				"@context": "http://schema.org",
				"@type": "comment",
				"identifier": id,
				"text": msg,
				"author": {
					"@type": "person",
					"name": nom,
					"email": mail
				},
				"datePublished": hoy.toLocaleDateString()
			}

		}
	);
	console.log(dadesComentarios.comentarios);
	$.post('../PHP/escribircoment.php', { dadesComentarios }, function (result) {
		//alert(result);
	});
}
function pintar(elemento) {

	var ComentarioPlato = getInfocomentario(dadesComentarios.comentarios, elemento.identifier);
	console.log(dadesComentarios.comentarios);
	console.log(ComentarioPlato);
	ComentarioPlato.forEach(function (id1) {
		var primerosplatoscomentarios = document.createElement("div");
		primerosplatoscomentarios.id = "primerosplatoscomentarios";
		primerosplatoscomentarios.classList.add("comment");
		primerosplatoscomentarios.innerHTML = '<h4>' + id1.comentario.author.name + '</h4> <span>' + id1.comentario.datePublished + '</span> <br>' +
			'<p> ' + id1.comentario.text + '</p >' +
			'</div>';
		console.log(id1);
		contenedorComentarios.appendChild(primerosplatoscomentarios);
	});
}
function getInfocomentario(arr, idcom) {
	return arr.filter(el => {
		if (el.comentario.identifier == idcom) {
			return el;
		}

	});
}

function crearProducto(elemento) {
	$.post('../PHP/aumentarVisitas.php', { num: elemento.identifier }, function (result) {
		//alert(result);
	});




	var cuerpoProducto = document.createElement("section");
	cuerpoProducto.id = "cuerpoprincipal";
	cuerpoProducto.classList.add("ses1");
	cuerpoProducto.classList.add("sectioninfoproductos");
	var contenedorinfoproductos = document.createElement("div");
	contenedorinfoproductos.id = "contenedorinfoproductos";
	contenedorinfoproductos.classList.add("contenedorProductos");


	//imagen
	var imagenproducto = document.createElement("div");
	imagenproducto.id = "imagenproducto";
	imagenproducto.classList.add("imagen");

	var imgproducto = document.createElement("img");
	imgproducto.src = elemento.image[0].name;
	var tituloproducto = document.createElement("h3");
	tituloproducto.innerHTML = elemento.name;
	imagenproducto.appendChild(imgproducto);
	imagenproducto.appendChild(tituloproducto);
	contenedorinfoproductos.appendChild(imagenproducto);

	//Estrellas
	var puntuacionproducto = document.createElement("div");
	puntuacionproducto.id = "puntuacionproducto";
	puntuacionproducto.classList.add("puntuacion");


	var estrellas = document.createElement("div");
	estrellas.id = "Estrellas";
	estrellas.classList.add("ec-stars-wrapper");
	for (var i = 1; i <= 5; i++) {
		var estrella = document.createElement("a");
		estrella.setAttribute("onclick", "modificarValoracion(" + elemento.identifier + "," + i + ")");
		//estrella.href = "modificarValoracion("+ elemento.identifier + "," + i +")";
		estrella.title = "Votar con " + i + " estrellas";
		estrella.innerHTML = "&#9733;";
		estrellas.appendChild(estrella);
	}
	// estrellas.innerHTML = '<a href="#" data-value="1" title="Votar con 1 estrellas">&#9733;</a>' +
	// 	'<a href="#" data-value="2" title="Votar con 2 estrellas">&#9733;</a>' +
	// 	'<a href="#" data-value="3" title="Votar con 3 estrellas">&#9733;</a>' +
	// 	'<a href="#" data-value="4" title="Votar con 4 estrellas">&#9733;</a>' +
	// 	'<a href="#" data-value="5" title="Votar con 5 estrellas">&#9733;</a>';
	puntuacionproducto.appendChild(estrellas);

	if (elemento.aggregateRating.ratingCount != 0) {
		var puntuacionMedia = document.createElement("p");
		var pts = elemento.aggregateRating.ratingValue / elemento.aggregateRating.ratingCount
		puntuacionMedia.innerHTML = pts.toFixed(1) + " &#9733;";
		puntuacionproducto.appendChild(puntuacionMedia);
	}

	var favEstrella = document.createElement("a");
	favEstrella.id = "favEstrella"
	if (esfavorito(elemento.identifier)) {
		favEstrella.innerHTML = " &#128148 Eliminar de favoritos";
		favEstrella.style.color = "#C1121F";
		favEstrella.style.cursor = "pointer";
	}
	else {
		favEstrella.innerHTML = " &#x2764 Añadir a favoritos";
		favEstrella.style.color = "#003049";
		favEstrella.style.cursor = "pointer";
	}
	favEstrella.setAttribute("onclick", "modificarfavoritos('" + elemento.identifier + "')");
	puntuacionproducto.appendChild(favEstrella);
	contenedorinfoproductos.appendChild(puntuacionproducto);


	//Descripcion
	var ContenidoDescripcion
	if (elemento.datosextra.typeElement === "Bebida") {
		ContenidoDescripcion = "<strong>% Alcohol: </strong>" + elemento.datosextra.alcoholPorcentage + "<br>";
		ContenidoDescripcion += elemento.description;
	} else {
		ContenidoDescripcion = elemento.description;
	}

	var contenidoproducto = document.createElement("div");
	contenidoproducto.id = "contenidoproducto";
	contenidoproducto.classList.add("contenido");
	var descripcionproducto = document.createElement("p");
	descripcionproducto.innerHTML = ContenidoDescripcion;
	contenidoproducto.appendChild(descripcionproducto);
	contenedorinfoproductos.appendChild(contenidoproducto);

	//Imagenes
	var galeriaproducto = document.createElement("div");
	galeriaproducto.id = "galeriaproducto";
	galeriaproducto.classList.add("imagenes");
	elemento.image.slice(1).forEach(function (value) {
		var nuevaimg = document.createElement("img");
		nuevaimg.src = value.name;
		galeriaproducto.appendChild(nuevaimg);
	});



	// galeriaproducto.innerHTML = '<img src="images/gastronomia/Alimentos/Islas Baleares/sobrassadatendre.jpg" alt="Sobrassada Tendre">' +
	// 	'<img src="images/gastronomia/Alimentos/Islas Baleares/sobrassadacurada.jpg" alt="Sobrassada Curada">' +
	// 	'<img src="images/gastronomia/Alimentos/Islas Baleares/sobrassadaetiquetanegra.jpg"' +
	// 	'alt="Sobrassada Etiqueta Negra">' +
	// 	'<img src="images/gastronomia/Alimentos/Islas Baleares/sobrassadapoltru.jpg" alt="Sobrassada Poltru">';
	contenedorinfoproductos.appendChild(galeriaproducto);
	cuerpoProducto.appendChild(contenedorinfoproductos);

	//Botones anterior siguiente y volver al album
	var canviarelemento = document.createElement("div");
	canviarelemento.id = "canviarelemento";
	canviarelemento.classList.add("canviarelemento");

	var idAnterior = elemento.identifier - 1;
	var idSiguiente = elemento.identifier + 1;

	if (encontrarElementoPorId(idAnterior)) {
		var botonanterior = document.createElement("div");
		botonanterior.id = "botonanterior";
		botonanterior.setAttribute("onclick", "CrearInfo('" + idAnterior + "')");
		botonanterior.classList.add("indicadorcambio");
		botonanterior.innerHTML = '<i class="fa-solid fa-angles-left"></i>';
		canviarelemento.appendChild(botonanterior);
	}



	var volver = document.createElement("a");
	volver.id = "volver";
	volver.classList.add("volver");
	volver.setAttribute("onclick", "crearAlbum('" + elemento.datosextra.comunidadAutonoma + "')");
	volver.innerHTML = "VOLVER";
	canviarelemento.appendChild(volver);

	if (encontrarElementoPorId(idSiguiente)) {
		var botonsiguiente = document.createElement("div");
		botonsiguiente.id = "botonsiguiente";
		botonsiguiente.classList.add("indicadorcambio");
		botonsiguiente.setAttribute("onclick", "CrearInfo('" + idSiguiente + "')");
		botonsiguiente.innerHTML = '<i class="fa-solid fa-angles-right"></i>';
		canviarelemento.appendChild(botonsiguiente);
	}
	cuerpoProducto.appendChild(canviarelemento);




	var reemplazo = document.getElementById("cuerpoprincipal");
	reemplazo.parentNode.replaceChild(cuerpoProducto, reemplazo);

	//Eliminar (si existen) elementos de la página principal
	if (document.getElementById("introducción-content")) {
		document.getElementById("introducción-content").parentNode.removeChild(document.getElementById("introducción-content"));
	}
	if (document.getElementById("cuerposlider")) {
		document.getElementById("cuerposlider").parentNode.removeChild(document.getElementById("cuerposlider"));
	}
	if (document.getElementById("topplatos")) {
		document.getElementById("topplatos").parentNode.removeChild(document.getElementById("topplatos"));
	}
	if (document.getElementById("layout")) {
		document.getElementById("layout").parentNode.removeChild(document.getElementById("layout"));
	}

	creargastronomiasemantica(elemento, false, true);
	scroll(0, 0);

}

function crearcocinero(nombreCocinero) {
	var elemento = dadesCocineros.cocineros.find(function (element) {
		// alert(element.name);
		return element.cocinero.name == nombreCocinero;
	});
	var cuerpoCocinero = document.createElement("section");
	cuerpoCocinero.id = "cuerpoprincipal";
	cuerpoCocinero.classList.add("ses1");
	cuerpoCocinero.classList.add("cocineros");
	var contenedorinfococineros = document.createElement("div");
	contenedorinfococineros.id = "contenedorinfococineros";
	contenedorinfococineros.classList.add("contenedorCocineros");

	//imagen
	var imagencocinero = document.createElement("div");
	imagencocinero.id = "imagencocinero";
	imagencocinero.classList.add("imagen");

	var imgproducto = document.createElement("img");
	imgproducto.src = elemento.cocinero.image[0].name;
	var tituloproducto = document.createElement("h3");
	tituloproducto.innerHTML = elemento.cocinero.name;
	imagencocinero.appendChild(imgproducto);
	imagencocinero.appendChild(tituloproducto);
	contenedorinfococineros.appendChild(imagencocinero);


	//restaurantes
	var listarestaurantes = [];//lista con la información de los restaurantes, usada en la creación del mapa
	var restaurantescocinero = document.createElement("div");
	restaurantescocinero.id = "restaurantescocinero";
	restaurantescocinero.classList.add("restaurantes");
	var primerosplatosrestaurantes = "<h2>Sus restaurantes</h2>" + "<ul>";
	elemento.restaurantes.restaurant.forEach(function (value) {
		primerosplatosrestaurantes += "<li>" + value.name + " (" + value.starRating.ratingValue + " Michelin)" + "</li>";
		let lugarInfo = {
			posicion: { lat: value.geo.latitude, lng: value.geo.longitude },
			nombre: value.name
		}
		listarestaurantes.push(lugarInfo)
	});
	primerosplatosrestaurantes += "</ul>";
	restaurantescocinero.innerHTML = primerosplatosrestaurantes;
	contenedorinfococineros.appendChild(restaurantescocinero);

	//Descripcion
	var contenidococinero = document.createElement("div");
	contenidococinero.id = "contenidococinero";
	contenidococinero.classList.add("contenido");
	var descripcionproducto = document.createElement("p");
	//Pensar a posar API wikipedia
	// var masinfo = document.createElement("a");
	// masinfo.innerHTML = "Ver más información";
	// masinfo.href = "";
	var premios = '<h3>PREMIOS</h3>' +
		'<ul>';
	elemento.cocinero.awards.forEach(function (arrayItem) {
		premios += '<li>';
		premios += arrayItem;
		premios += '</li>';
	});
	premios += '</ul>';
	descripcionproducto.innerHTML = elemento.cocinero.description + premios;
	contenidococinero.appendChild(descripcionproducto);
	// contenidococinero.appendChild(masinfo);
	contenedorinfococineros.appendChild(contenidococinero);


	//galeria de imagenes
	var galeriacocinero = document.createElement("div");
	galeriacocinero.id = "galeriacocinero";
	galeriacocinero.classList.add("imagenes");
	elemento.cocinero.image.slice(1).forEach(function (value) {
		var nuevaimg = document.createElement("img");
		nuevaimg.src = value.name;
		galeriacocinero.appendChild(nuevaimg);
	});
	contenedorinfococineros.appendChild(galeriacocinero);


	//audio
	var audioCocinero = document.createElement("div");
	audioCocinero.id = "audioCocinero";
	audioCocinero.classList.add("audio");
	var audio = document.createElement("audio");
	audio.controls = true;
	audioCocinero.appendChild(audio);
	var fuentemp3 = document.createElement("source");
	fuentemp3.src = elemento.cocinero.url[0];
	audio.appendChild(fuentemp3);
	var fuenteOgg = document.createElement("source");
	fuenteOgg.src = elemento.cocinero.url[1];
	audio.appendChild(fuenteOgg);
	contenedorinfococineros.appendChild(audioCocinero);

	//TIEMPO
	var tiempococinero = document.createElement("div");
	tiempococinero.id = "tiempoCocinero";
	tiempococinero.classList.add("tiempos");
    var tituloTiempo = document.createElement("h1");
    tituloTiempo.id = "tituloTiempo";
    tituloTiempo.classList.add("titleTiempos");
    tituloTiempo.innerHTML = "Cónoce el tiempo que hace en sus restaurantes";
    tiempococinero.appendChild(tituloTiempo);


	elemento.restaurantes.restaurant.forEach(function (value) {
		var nombrerestaurante = document.createElement("div");
		nombrerestaurante.id = "nombrerestaurante";
		nombrerestaurante.classList.add("restauranteselec");
		var nombrerest = document.createElement("h1");
		nombrerest.innerHTML = value.name;
		var butonver = document.createElement("button");
		butonver.classList.add("vertiempo");
		var flecha = document.createElement("i");
		flecha.classList.add("fa-solid");
		flecha.classList.add("fa-angle-down");
		butonver.appendChild(flecha);

		nombrerestaurante.appendChild(nombrerest);
		nombrerestaurante.appendChild(butonver);

		// nombrerestaurante.innerHTML = '<i class="fa-solid fa-angle-down"></i>';
		// nombrerestaurante.appendChild(nombrerest);
		tiempococinero.appendChild(nombrerestaurante);
		var tiemposrestaurante = document.createElement("div");
		tiemposrestaurante.id = "tiemposrestaurante";
		tiemposrestaurante.classList.add("tiemposrestaurante");
		tiemposrestaurante.classList.add("mostrar");
		// tiemposrestaurante.classList.add("mostrar");
		tiempococinero.appendChild(tiemposrestaurante);
		crearTiempo(value.geo.longitude, value.geo.latitude, tiemposrestaurante);
		// const flechaTiempo = document.querySelector(".vertiempo");
		// const tiempos = document.querySelector(".tiemposrestaurante");

		butonver.addEventListener("click", () => {
			if (tiemposrestaurante.classList.contains("mostrar")) {
				tiemposrestaurante.classList.remove("mostrar");
			} else {
				tiemposrestaurante.classList.add("mostrar");
			}
		});

	});

	contenedorinfococineros.appendChild(tiempococinero);


	//mapa
	var mapacocinero = document.createElement("div");
	mapacocinero.id = "mapacocinero";
	mapacocinero.classList.add("mapa");
	//mapacocinero.innerHTML = '<img src="images/Cocineros/Jordi cruz/restaurantesmapa.PNG">';

	contenedorinfococineros.appendChild(mapacocinero);
	iniciarMap(mapacocinero, listarestaurantes);
	cuerpoCocinero.appendChild(contenedorinfococineros);


	//NOTICIAS
	crearNoticias(contenedorinfococineros, elemento.cocinero.name);

	//volver
	//	var volver = document.createElement("a");
	//	volver.href = "index.html";
	//	volver.innerHTML = "VOLVER";
	//	cuerpoCocinero.appendChild(volver);


	var reemplazo = document.getElementById("cuerpoprincipal");
	reemplazo.parentNode.replaceChild(cuerpoCocinero, reemplazo);


	//Eliminar (si existen) elementos de la página principal
	if (document.getElementById("introducción-content")) {
		document.getElementById("introducción-content").parentNode.removeChild(document.getElementById("introducción-content"));
	}
	if (document.getElementById("cuerposlider")) {
		document.getElementById("cuerposlider").parentNode.removeChild(document.getElementById("cuerposlider"));
	}
	if (document.getElementById("topplatos")) {
		document.getElementById("topplatos").parentNode.removeChild(document.getElementById("topplatos"));
	}
	if (document.getElementById("layout")) {
		document.getElementById("layout").parentNode.removeChild(document.getElementById("layout"));
	}

	crearcocinerosemantica(elemento, false);
	scroll(0, 0);



}

function modificarJSONGastronomia() {
	// const requestURL = "../JSON";
	// let request = new XMLHttpRequest();
	// request.open("POST", requestURL);

	// request.setRequestHeader("Accept", "application/json");
	// request.setRequestHeader("Content-Type", "application/json");

	// request.onload = () => console.log(request.responseText);
	// var dadesJSON =  JSON.stringify(dades);
	// request.send(dadesJSON);
	let request = new XMLHttpRequest();
	request.open("POST", "../JSON/gastronomia.json");
	request.setRequestHeader("Accept", "application/json");
	request.setRequestHeader("Content-Type", "application/json");

	request.onreadystatechange = function () {
		if (request.readyState === 4) {
			console.log(request.status);
			console.log(xhr.responseText);
		}
	};
	request.onload = () => console.log(request.responseText);
	var dadesJSON = JSON.stringify(dades);
	let data = `{
		"Id": 78912,
		"Customer": "Jason Sweet",
	  }`;
	request.send(data);
}

// function modificarJSON() {
// 	const fs = require("fs");
// 	const fileName = "../JSON/gastronomia2.json";
// 	file.key = "new value";
// 	let data = `{
// 		"Id": 78912,
// 		"Customer": "Jason Sweet",
// 	  }`;
// 	fs.writeFile(fileName, data, function writeJSON(err) {
// 		if (err) return console.log(err);
// 		console.log(JSON.stringify(file));
// 		console.log('writing to ' + fileName);
// 	});
// }
function esfavorito(idfav) {
	if (localStorage.getItem("fav") == null) {//Crear lista favoritos
		return false;
	}
	var listafavoritos = [];
	listafavoritos = JSON.parse(localStorage.getItem("fav"));
	stringid = "" + idfav;

	console.log(stringid);
	console.log(listafavoritos);
	console.log(listafavoritos.indexOf(stringid));
	console.log(listafavoritos.indexOf(stringid) != -1);
	if (listafavoritos.indexOf(stringid) != -1) {
		console.log(`Está en fav`);
		return true;
	}
	else {
		console.log(`No está en fav`);
		return false;
	};
}

function modificarfavoritos(idfav) {
	var listafavoritos = [];
	//console.log(idfav);
	if (localStorage.getItem("fav") == null) {//Crear lista favoritos
		console.log(`crear lista favoritos`);
		listafavoritos.push(idfav);
		localStorage.setItem("fav", JSON.stringify(listafavoritos));
		var favEstrella = document.getElementById("favEstrella");
		favEstrella.innerHTML = " &#128148 Eliminar de favoritos";
		favEstrella.style.color = "#C1121F";

		return null;
	}
	listafavoritos = JSON.parse(localStorage.getItem("fav"));

	if (listafavoritos.indexOf(idfav) != -1) {
		//console.log(`existe favorito`);
		var favEstrella = document.getElementById("favEstrella");
		favEstrella.innerHTML = " &#x2764 Añadir a favoritos";
		favEstrella.style.color = "#003049";
		listafavoritos.splice(listafavoritos.indexOf(idfav), 1);
		localStorage.setItem("fav", JSON.stringify(listafavoritos));

	} else {
		//console.log(`No existe en favoritos`);
		var favEstrella = document.getElementById("favEstrella");
		favEstrella.innerHTML = " &#128148 Eliminar de favoritos";
		favEstrella.style.color = "#C1121F";
		listafavoritos.push(idfav);
		localStorage.setItem("fav", JSON.stringify(listafavoritos));
	}
	// var listaFavoritos = localStorage.getItem("fav");
	// localStorage.setItem("color","rojo");
	// console.log(localStorage.getItem("color"));
	console.log(JSON.parse(localStorage.getItem("fav")));
}


// function modificarfavoritos(idfav) {
// 	if (localStorage.getItem(idfav) != null) {
// 		console.log(`existe favorito`);
// 		localStorage.removeItem(idfav);

// 	} else {
// 		console.log(`No existe en favoritos`);
// 		localStorage.setItem(idfav, JSON.stringify(encontrarElementoPorId(idfav)));
// 	}
// 	// var listaFavoritos = localStorage.getItem("fav");
// 	// localStorage.setItem("color","rojo");
// 	// console.log(localStorage.getItem("color"));
// 	console.log(allStorage());
// }

// function allStorage() {

// var values = [],
// keys = Object.keys(localStorage),
// 		i = keys.length;

// 	while (i--) {
//  		values.push(localStorage.getItem(keys[i]));
//  	}

//  	return values;
//  }

function mostrarFavoritos() {
	var listafavoritos = JSON.parse(localStorage.getItem("fav"));
	var cuerpoAlbumTop = document.createElement("section");
	cuerpoAlbumTop.id = "cuerpoprincipal";
	cuerpoAlbumTop.classList.add("ses1");
	//cuerpoAlbumTop.classList.add("sectionalbum");
	var tituloAlbumTop = document.createElement("div");
	tituloAlbumTop.id = "titu";
	tituloAlbumTop.classList.add = "titulo";
	var contenidoTitulo = document.createElement("H1");
	contenidoTitulo.id = "headtituloalbum";
	contenidoTitulo.classList.add("heading");
	contenidoTitulo.innerHTML = "<span>FAVORITOS</span>";
	tituloAlbumTop.appendChild(contenidoTitulo);
	cuerpoAlbumTop.appendChild(tituloAlbumTop);

	// var firstchild = document.getElementById("headtitulosecciones");
	// firstchild.innerHTML = "<span>PLATOS</span> DE <span>LAS ISLAS BALEARES</span>";

	var album = document.createElement("div");
	album.classList.add("contenedorAlbum");

	if (listafavoritos != null) {
		listafavoritos.forEach(function (arrayItem) {
			var favorito = encontrarElementoPorId(arrayItem);
			var plat = document.createElement("div");
			plat.classList.add("gridItem");
			// plat.classList.add("gridAlbum");
			var funcion = "CrearInfo(" + + favorito.identifier + ")";
			plat.setAttribute("onclick", funcion);
			var imagen = document.createElement("img");
			imagen.src = favorito.image[0].name;
			//imagen.setAttribute("onclick", "crearPlato()");
			var texto = document.createElement("H3");
			texto.innerHTML = favorito.name;
			plat.appendChild(imagen);
			plat.appendChild(texto);
			album.appendChild(plat);
		});
	}
	var reemplazo = document.getElementById("cuerpoprincipal");
	cuerpoAlbumTop.appendChild(album);
	reemplazo.parentNode.replaceChild(cuerpoAlbumTop, reemplazo);



	//Eliminar (si existen) elementos de la página principal
	if (document.getElementById("introducción-content")) {
		document.getElementById("introducción-content").parentNode.removeChild(document.getElementById("introducción-content"));
	}
	if (document.getElementById("cuerposlider")) {
		document.getElementById("cuerposlider").parentNode.removeChild(document.getElementById("cuerposlider"));
	}
	if (document.getElementById("topplatos")) {
		document.getElementById("topplatos").parentNode.removeChild(document.getElementById("topplatos"));
	}
	if (document.getElementById("layout")) {
		document.getElementById("layout").parentNode.removeChild(document.getElementById("layout"));
	}

	scroll(0, 0);
}

function iniciarMap(mapa, restaurantes) {

	function onSuccess(position) {
		var coord = { lat: parseFloat(position.coords.latitude), lng: parseFloat(position.coords.longitude) };
		var map = new google.maps.Map(mapa, {
			zoom: 5,
			center: coord
		});
		var marker = new google.maps.Marker({
			position: coord,
			map: map
		});

		var infowindow = new google.maps.InfoWindow();

		var marker, i;
		restaurantes.forEach(function (restaurante) {
			marker = new google.maps.Marker({
				position: new google.maps.LatLng(restaurante.posicion.lat, restaurante.posicion.lng),
				map: map,
				icon: {
					url: "http://maps.google.com/mapfiles/ms/icons/blue-dot.png"
				}
			});

			google.maps.event.addListener(marker, 'click', (function (marker, i) {
				return function () {
					infowindow.setContent(restaurante.nombre);
					infowindow.open(map, marker);
				}
			})(marker, i));
		});
	}

	function onError() {
		var coord = { lat: restaurantes[0].posicion.lat, lng: restaurantes[0].posicion.lng };
		var map = new google.maps.Map(mapa, {
			zoom: 6,
			center: coord
		});
		var marker = new google.maps.Marker({
			position: coord,
			map: map
		});

		var infowindow = new google.maps.InfoWindow();

		var marker, i;
		restaurantes.forEach(function (restaurante) {
			marker = new google.maps.Marker({
				position: new google.maps.LatLng(restaurante.posicion.lat, restaurante.posicion.lng),
				map: map,
			});

			google.maps.event.addListener(marker, 'click', (function (marker, i) {
				return function () {
					infowindow.setContent(restaurante.nombre);
					infowindow.open(map, marker);
				}
			})(marker, i));
		});
	}
	navigator.geolocation.getCurrentPosition(onSuccess, onError);
	//var coord = { lat: restaurantes[0].posicion.lat, lng: restaurantes[0].posicion.lng };

}


//Datos visitas
function crearGrafica() {
	const datosgrafica = [{
		comunidad: 'Andalucía',
		value: 0
	},
	{
		comunidad: 'Aragón',
		value: 0
	},
	{
		comunidad: 'Asturias',
		value: 0
	},
	{
		comunidad: 'Islas Baleares',
		value: 0
	},
	{
		comunidad: 'Cantabria',
		value: 0
	},
	{
		comunidad: 'La Mancha',
		value: 0
	},
	{
		comunidad: 'León',
		value: 0
	},
	{
		comunidad: 'Cataluña',
		value: 0
	},
	{
		comunidad: 'Valencia',
		value: 0
	},
	{
		comunidad: 'Extremadura',
		value: 0
	},
	{
		comunidad: 'Galicia',
		value: 0
	},
	{
		comunidad: 'La Rioja',
		value: 0
	},
	{
		comunidad: 'Madrid',
		value: 0
	},
	{
		comunidad: 'Murcia',
		value: 0
	},
	{
		comunidad: 'Navarra',
		value: 0
	},
	{
		comunidad: 'País Vasco',
		value: 0
	}
	];
	dades.gastronomia.forEach(function (elemento) {
		//console.log(elemento.name);
		datosgrafica.forEach(function (elementoGrafica) {
			if (elemento.datosextra.comunidadAutonoma == elementoGrafica.comunidad) {
				//console.log(elementoGrafica.comunidad);
				elementoGrafica.value += elemento.interactionStatistic.userInteractionCount;
			}
		});

	});
	//console.log(datosgrafica);
	return datosgrafica;



}

function crearNoticias(contenedorinfococineros, nombreCocinero) {
	const topic = nombreCocinero;
	const apiKey = "ke_VTjCKk4nc1UnYjGDhhf49s3MltrBL9l_j99XaZescO1f8";
	var url = `https://api.currentsapi.services/v1/search?` +
		`keywords=${topic}&language=es&` +
		`apiKey=${apiKey}`;
	const request = new XMLHttpRequest();

	request.onreadystatechange = function () {
		if (request.readyState == 4 && request.status == 200) {
			dadesnoticias = "";
			dadesnoticias = JSON.parse(request.responseText);
			crearNoticias2(contenedorinfococineros, dadesnoticias);
		}
	}
	request.open('GET', url);
	request.responseType = 'text';
	request.send();
}

function crearNoticias2(contenedorinfococineros, dadesNot) {
	var noticiasCocinero = document.createElement("div");
	noticiasCocinero.id = "noticiasCocinero";
	noticiasCocinero.classList.add("noticias");
	contenedorinfococineros.appendChild(noticiasCocinero);

	var carouselNoticias = document.createElement("div");
	carouselNoticias.id = "carouselNoticias";
	carouselNoticias.classList.add("carousel");
	noticiasCocinero.appendChild(carouselNoticias);

	var carousel_contenedor_noticias = document.createElement("div");
	carousel_contenedor_noticias.id = "carouselContenedorNoticias";
	carousel_contenedor_noticias.classList.add("carousel__contenedor");
	carouselNoticias.appendChild(carousel_contenedor_noticias);

	//boton anterior
	var noticiaAnterior = document.createElement("button");
	noticiaAnterior.id = "noticiaAnterior";
	noticiaAnterior.classList.add("carousel__anterior");
	noticiaAnterior.classList.add("notsig");
	noticiaAnterior.ariaLabel = "Anterior";
	noticiaAnterior.innerHTML = '<i class="fas fa-chevron-left"></i>';
	carousel_contenedor_noticias.appendChild(noticiaAnterior);


	//álbum noticias
	var carousellistanoticias = document.createElement("div");
	carousellistanoticias.id = "carousellistanoticias";
	carousellistanoticias.classList.add("carousel__lista__noticias");
	carousel_contenedor_noticias.appendChild(carousellistanoticias);

	dadesNot.news.forEach(function (arrayItem) {
		if (arrayItem.image != "None") {
			var noticia = document.createElement("div");
			noticia.id = "noticia_elemento";
			noticia.classList.add("carousel__elemento");
			noticia.classList.add("notp");
			var imagen_noticia = document.createElement("img");
			imagen_noticia.id = "imagen_noticia";
			imagen_noticia.src = arrayItem.image;
			noticia.appendChild(imagen_noticia);
			var titulo_noticias = document.createElement("a");
			titulo_noticias.id = "titulo_noticias";
			titulo_noticias.textContent = arrayItem.title;
			titulo_noticias.setAttribute('href', arrayItem.url);
			titulo_noticias.setAttribute('target', "_blank");
			noticia.appendChild(titulo_noticias);
			carousellistanoticias.appendChild(noticia);
		}
	});


	//boton posterior
	var noticiaPosterior = document.createElement("button");
	noticiaPosterior.id = "noticiaPosterior";
	noticiaPosterior.classList.add("carousel__siguiente");
	noticiaPosterior.classList.add("notsig");
	noticiaPosterior.ariaLabel = "Anterior";
	noticiaPosterior.innerHTML = '<i class="fas fa-chevron-right"></i>';
	carousel_contenedor_noticias.appendChild(noticiaPosterior);


	var tablist_noticia = document.createElement("div");
	// tablist_noticia.setAttribute("role", "tablist");
	tablist_noticia.classList.add("carousel__indicadores");
	tablist_noticia.classList.add("not");
	carouselNoticias.appendChild(tablist_noticia);


	new Glider(document.querySelector('.carousel__lista__noticias'), {
		slidesToShow: 1,
		slidesToScroll: 1,
		dots: '.carousel__indicadores',
		draggable: true,
		arrows: {
			prev: '.carousel__anterior',
			next: '.carousel__siguiente'
		}
	});
}
function creargastronomiasemantica(elemento, album, borrar) {
	const script = document.createElement('script');
	script.id = "gastronomiaInfo";
	script.setAttribute('type', 'application/ld+json');

	if (album) {
		var obj = "";
		for (var j = 0; j < elemento.length; j++) {
			obj = elemento[j];
			let s = {
				"@context": "http://schema.org",
				"@type": "recipe",
				"identifier": obj.identifier,
				"name": obj.name,
				"image": obj.image[0],
				"aggregateRating": {
					"@type": "AggregateRating",
					"ratingCount": obj.ratingCount,
					"ratingValue": obj.ratingValue
				},
			};
			//script.textContent += JSON.stringify(s);
			script.innerHTML +=
				JSON.stringify(s);
		}

	}
	else {
		if (elemento.datosextra.typeElement == "Plato") {
			let s = {
				"@context": "http://schema.org",
				"@type": "recipe",
				"identifier": elemento.identifier,
				"name": elemento.name,
				"description": elemento.description,
				"image": elemento.image,
				"recipeIngredient": elemento.recipeIngredient,
				"recipeInstructions": elemento.recipeInstructions,
				"prepTime": elemento.prepTime,
				"cookTime": elemento.cookTime,
				"totalTime": elemento.totalTime,
				"video": elemento.video,
				"aggregateRating": {
					"@type": "AggregateRating",
					"ratingCount": elemento.ratingCount,
					"ratingValue": elemento.ratingValue
				},
				"interactionStatistic": {
					"@type": "InteractionCounter",
					"interactionType": "https://schema.org/ViewAction",
					"userInteractionCount": elemento.userInteractionCount
				}
			};
			script.innerHTML +=
				JSON.stringify(s);
		}
		else {
			let s = {
				"@context": "http://schema.org",
				"@type": "recipe",
				"identifier": elemento.identifier,
				"name": elemento.name,
				"description": elemento.description,
				"image": elemento.image,
				"aggregateRating": {
					"@type": "AggregateRating",
					"ratingCount": elemento.ratingCount,
					"ratingValue": elemento.ratingValue
				},
				"interactionStatistic": {
					"@type": "InteractionCounter",
					"interactionType": "https://schema.org/ViewAction",
					"userInteractionCount": elemento.userInteractionCount
				}
			};
			script.innerHTML +=
				JSON.stringify(s);
		}
	}
	//script.textContent += JSON.stringify(s);


	var LDCocinetos = document.getElementById("cocineroInfo");
	if (LDCocinetos != null && borrar) {

		LDCocinetos.parentNode.removeChild(LDCocinetos);
	}

	var reemplazo = document.getElementById("gastronomiaInfo");

	if (reemplazo != null) {

		reemplazo.parentNode.replaceChild(script, reemplazo);
	}
	else {

		document.head.appendChild(script);
	}

}

function crearcocinerosemantica(elemento, album) {
	const script = document.createElement('script');
	script.id = "cocineroInfo";
	script.setAttribute('type', 'application/ld+json');
	if (album) {
		var obj = "";
		for (var j = 0; j < elemento.length; j++) {
			obj = elemento[j];
			let s = {
				"@context": "http://schema.org",
				"@type": "person",
				"name": obj.cocinero.name,
				"image": [
					{
						"@type": "ImageObject",
						"name": obj.cocinero.image[0].name
					}
				],
			};
			//script.textContent += JSON.stringify(s);
			script.innerHTML +=
				JSON.stringify(s);
		}

	}
	else {
		let s = {
			"cocinero": elemento.cocinero,
			"restaurantes": elemento.restaurantes
		};
		//script.textContent += JSON.stringify(s);
		script.innerHTML +=
			JSON.stringify(s);
	}
	var LDGastronomia = document.getElementById("gastronomiaInfo");
	if (LDGastronomia != null) {

		LDGastronomia.parentNode.removeChild(LDGastronomia);
	}

	var reemplazo = document.getElementById("cocineroInfo");
	if (reemplazo != null) {
		console.log("ya existe");
		reemplazo.parentNode.replaceChild(script, reemplazo);
	}
	else {
		console.log("no existe");
		document.head.appendChild(script);
	}

}

function crearTiempo(longitud, latitud, tiemposrestaurante) {
	const lat = latitud;
	const lon = longitud;
	const apiKey = "9bbe773df1f64c39bd15069e39bbd15e";
	var url = `https://api.weatherbit.io/v2.0/forecast/daily?lat=${lat}&lon=${lon}&key=${apiKey}&days=5&lang=es`;
	const request = new XMLHttpRequest();

	request.onreadystatechange = function () {
		if (request.readyState == 4 && request.status == 200) {
			dadesTiempo = "";
			dadesTiempo = JSON.parse(request.responseText);
			crearTiempo2(dadesTiempo, tiemposrestaurante);
		}
	}
	request.open('GET', url);
	request.responseType = 'text';
	request.send();
}

function crearTiempo2(dadesTiempo, tiemposrestaurante) {
	var tiempohoy = document.createElement("div");
	tiempohoy.id = "tiempohoy";
	tiempohoy.classList.add("tiempohoy");
	var hoy = document.createElement("h3");
	hoy.innerHTML = "HOY";
	tiempohoy.appendChild(hoy);
	var tiempotemp = document.createElement("div");
	tiempotemp.id = "tiempotemp";
	tiempotemp.classList.add("tiempotemp");
	tiempohoy.appendChild(tiempotemp);
	var iconotiempo = document.createElement("img");
	const icon = dadesTiempo.data[0].weather.icon;
	iconotiempo.src = `https://www.weatherbit.io/static/img/icons/${icon}.png`;
	var grados = document.createElement("h2");
	grados.innerHTML = dadesTiempo.data[0].temp + " º";
	tiempotemp.appendChild(grados);
	tiempotemp.appendChild(iconotiempo);
	var desc = document.createElement("h4");
	desc.innerHTML = dadesTiempo.data[0].weather.description;
	tiempohoy.appendChild(desc);
	tiemposrestaurante.appendChild(tiempohoy);
	var forecast = document.createElement("div");
	forecast.classList.add("forecasttiempo");
	tiemposrestaurante.appendChild(forecast);

	for (var i = 1; i < 5; i++) {
		var pred = document.createElement("div");
		pred.classList.add("prediction");
		forecast.appendChild(pred);
		var dia = document.createElement("h3");
		var diaPrediccion = new Date(dadesTiempo.data[i].datetime);
		var NumDia = diaPrediccion.getDate();
		var NumMes = diaPrediccion.getMonth();
		var mes = devolverMes(NumMes);
		dia.innerHTML = mes + " " + NumDia;
		pred.appendChild(dia);
		var predicciontiempo = document.createElement("div");
		predicciontiempo.classList.add("predtiempo");
		pred.appendChild(predicciontiempo);
		var imagentiempo = document.createElement("img");
		const imaget = dadesTiempo.data[i].weather.icon;
		imagentiempo.src = `https://www.weatherbit.io/static/img/icons/${imaget}.png`;
		var temp = document.createElement("h2");
		temp.innerHTML = dadesTiempo.data[i].temp + "º";
		predicciontiempo.appendChild(imagentiempo);
		predicciontiempo.appendChild(temp);
	}


}

// const flechaTiempo = document.querySelector(".vertiempo");
// const tiempos = document.querySelector(".tiemposrestaurante")

// flechaTiempo.addEventListener("click", () => {
//   tiempos.classList.toogle("mostrar");

//   if (tiempos.classList.contains("mostrar")) {
//     navToggle.setAttribute("aria-label", "Cerrar menú");
//   } else {
//     navToggle.setAttribute("aria-label", "Abrir menú");
//   }

// });

function devolverMes(mes) {
	var meses = [
		"ENE",
		"FEB",
		"MAR",
		"ABR",
		"MAY",
		"JUN",
		"JUL",
		"AGO",
		"SEP",
		"OCT",
		"NOV",
		"DIC",
	];
	return (meses[mes]);
}