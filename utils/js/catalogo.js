let dispositivos;
let item;
let itemSeleccionado;
let dispositivoSeleccionado;
let descripcion;
let text;
let stock;
let picturelUrl;
let price;
let tipo;
let contCartas;

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
                    `<div class="col" id="div-elementos">
                        <div class="card d-flex">
                            <img class="card-img-top responsive" src="${element.pictureUrl}" alt="Card image" id="img_card">
                            <div class="card-body">
                                <h5 class="card-title" id="title_card">${element.description}</h4>
                                <h5 class="card-text" id="price_card">${element.price} €</h5>
                                <a href="#" class="btn btn-secondary" onclick="cargarDetalle(${element.id})" id="btn_detalle">Detalle</a>
                            </div>
                        </div>
                    </div>`;
                $(".card").fadeIn();
                $("#contenedor_cartas").append(codigoCarta);
            });
        },
    });
    $("#contenedor_cartas ").html("");
    $("#contenedor_detalle ").html("");
}

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
                    <div class="w3-container w3-padding-32 w3-center col-md-6">
                    <img src="${response.pictureUrl}" class="w3-image responsive" id="img_detalle">
                        <div class="w3-padding-32">
                            <h4><b>${response.description}</b></h4>
                            <div class="progress">
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
            console.log(detalleItem);


        },
    });


}
