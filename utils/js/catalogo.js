// FUNCION PARA HACER LA PRIMERA CARGA DE ELEMENTOS
// LOS ELEMENTOS SE CARGAN EN UNA CARD DONDE APARECEN
// LA IMAGEN, EL TITULO, EL PRECIO Y UN BOTON PARA ACCEDER AL DETALLE DEL MISMO
function cargarElementos(id) {
    console.log("id", id);
    url = `https://test.krama.es:8014/item/list/${id}`;
    $.ajax({
        type: "GET",
        url: url,
        data: id,
        dataType: "json",
        success: function (response) {
            response.forEach((element) => {
                let codigoCarta =
                    `<div class="col-lg-4 mb-3 d-flex align-items-stretch">
                        <div class="card" id="div-elementos">
                            <div class="card ">
                                <img class="card-img-top " src="${element.pictureUrl}" alt="Card image" id="img_card">
                                <div class="card-body d-flex flex-column">
                                    <h5 class="card-title" id="title_card">${element.description}</h5>
                                    <h3 class="card-text" id="price_card">${element.price} €</h3>                              
                                    <a href="#" class="btn btn-secondary mt-auto align-self-star" onclick="cargarDetalle(${element.id})" id="btn_detalle">Detalle</a>   
                                </div>
                            </div>
                        </div>
                    </div>`;
                $(".card").fadeIn();
                $("#contenedor_cartas").append(codigoCarta);
            });
        },
    });
    // ESTO SE UTILIZA PARA BORRAR LOS DATOS DE LA VISTA Y 
    // EVITAR QUE SE DUPLIQUE LA INFOMRACION
    $("#contenedor_cartas").html("");
    $("#contenedor_detalle ").html("");
}
// AL PULSAR EL LOGO, CARGA LA PANTALLA PRINCIPAL
function cargarInicio() {
    let inicio =
        `<h2>Proceso de seleccion de Krama</h2>
    <p>
      En esta aplicación desarrollada con JavaScript, podemos elegir entre
      las distintas opciones del navegador, ver los elementos y ver el
      detalle de estos.
    </p>`
    // ESTO SE UTILIZA PARA BORRAR TODOS LOS DATOS 
    // Y CARGAR LA PAGINA PRINCIPAL
    $("#contenedor_cartas").html("").append(inicio);
    $("#contenedor_detalle ").html("");
}
// CON ESTA FUNCION PODEMOS ACCEDER AL DETALLE DE CADA ELEMENTO
function cargarDetalle(id) {
    $("#contenedor_cartas ").html("");
    console.log("id", id);
    let url = `https://test.krama.es:8014/item/${id}`;
    $("#contenedor_detalle ").html("");
    $.ajax({
        type: "GET",
        url: url,
        data: id,
        dataType: "json",
        success: function (response) {
            console.log("resultados contenido: ", response);
            let detalleItem = `
                    <div class="container" id="detalle">
                    <img src="${response.pictureUrl}" class="w3-image responsive center" id="img_detalle">
                        <div class="w3-padding-32">
                            <h4><b>${response.description}</b></h4>
                            <h5>Stock: </h5><div class="progress">
                                <div class="progress-bar" role="progressbar" 
                                aria-valuenow="${response.stock}" 
                                aria-valuemin="0" aria-valuemax="100" 
                                style="width:${response.stock}%">
                                <span class="sr-only">Stock</span>
                                </div>
                            </div>
                            <p>${response.text}</p>
                        </div>
                    </div>`;
            $("#contenedor_detalle").append(detalleItem);
        },
    });
}
