var api = {
  url: 'http://examen-laboratoria-sprint-5.herokuapp.com/topics'
};

var $themesList = $("#themes-list");

var cargarPagina = function () {
	cargarTemas();
	$("#add-form").submit(agregarTema);
};

var cargarTemas = function (){
	$.getJSON(api.url, function (temas){
		temas.forEach(crearTema);
	});
};

var crearTema = function (tema){
	var contenido = tema.content;
	var nombreAutor = tema.author_name;
	var respuestas = tema.responses_count;
	//fila donde irá todo
	var $tr = $("<tr />");
	//celda del tema
	var $nombreTema = $("<td />");
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

var agregarTema = function(e){
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




$(document).ready(cargarPagina);