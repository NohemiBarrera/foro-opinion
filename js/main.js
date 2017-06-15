var api = {
  url: 'http://examen-laboratoria-sprint-5.herokuapp.com/topics'
};



var $themesList = $("#themes-list");

var cargarPagina = function () {
	cargarTemas();
	$("#add-form").submit(agregarTema);
	$(document).on("click", ".detalle", mostrarDetalle);
	$("#search-form").submit(filtrarTemas);
	
};

var cargarTemas = function (){
	$.getJSON(api.url, function (temas){
		temas.forEach(crearTema);
		temas.forEach(filtrarTemas);
	});
};

function crearTema (tema){
	var contenido = tema.content;
	var nombreAutor = tema.author_name;
	var respuestas = tema.responses_count;
	//fila donde irá todo
	var $tr = $("<tr />");
	//celda del tema
	var $nombreTema = $("<td />");
	$nombreTema.addClass("detalle")
	$nombreTema.text(contenido);
	//celda del autor
	var $nombreAutor = $("<td />");
	$nombreAutor.text(nombreAutor);
	//celda respuestas
	var $numeroRespuestas = $("<td />");
	$numeroRespuestas.text(respuestas);
	//agregar celdas a la fila
	$tr.append($nombreTema);
	$tr.append($nombreAutor);
	$tr.append($numeroRespuestas);
	//agregar fila a tabla
	$themesList.append($tr);

};

function agregarTema (e){
	e.preventDefault();
	var nombreTema = $("#tema").val();
	var nombreAutor = $("#autor").val();
	var respuestas = $("respuestas").val();
	$.post(api.url, {
		author_name: nombreAutor,
		content: nombreTema,
		responses_count: respuestas
	}, function(tema){
		crearTema(tema);
		$("#myModal").modal("hide");
	});
};
var mostrarDetalle = function(){

};

var filtrarTemas = function (){
 /* La idea es filtrar el tema, para esto sería necesario recuperar content directamente de la api 
 	y comparar el valor del input para que así sólo muestre aquellos que coincidan, creo que en este 
 	caso habría sido mejor haber utilizado una plantilla para así poder cambiar los valores más rápido
 	pero ya no puedo pensar
 	 */
};

/*var filtrarTemas = function(e){
	//e.preventDefault();
//	var contenido = api.url;

//En este punto ya no sé qué estoy haciendo, aiuda :( 

	var criterio = $("#buscar").val().toLowerCase();
	var resultados = api.url.filter(function(tema){
		return tema.toLowerCase().indexOf(criterio)>=0;
	});
	console.log(contenido);
};
*/




$(document).ready(cargarPagina);
