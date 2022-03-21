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

window.addEventListener("load", () => {
    dispositivos = document.querySelector("#dispositivos");
    elementos = document.querySelector("#elementos");
    descripcion = document.querySelector("#descripcion");
    imagen = document.querySelector("#imagen");

    // $(document).on('click', '.dropdown-menu li a', function () {
    //     $('#dispositivos').val($(this).html());
    // });
    // dispositivos.addEventListener("click", (e) => {
    //     activo = $('#dispositivos').val();
    //     console.log("activo", activo);
    //     itemSeleccionado = e.target.value;
    //     cargarDispositivos(itemSeleccionado);
    // })
    // elementos.addEventListener("click", (e) => {
    //     dispositivoSeleccionado = e.target.value;
    //     cargarContenido(dispositivoSeleccionado);
    //     cargarImagen(dispositivoSeleccionado);
    // })
})

$(document).ready(function () {

    // $("#dispositivos").change(function (e) {
    //     id = $("#dispositivos").val();
    //     console.log("id", id);
    //     url = `https://test.krama.es:8014/item/list/${id}`;
    //     $.ajax({
    //         type: "GET",
    //         url: url,
    //         data: id,
    //         dataType: "json",
    //         success: function (response) {
    //             response.forEach((element) => {
    //                 let codigoCarta = `<div class="col" id="div-elementos">
    //                 <div class="card">
    //                     <img src="${element.pictureUrl}" class="card-img-top" alt="...">
    //                     <div class="card-body">
    //                     <h5 class="card-title">${element.description}</h5>
    //                     <div>
    //                         <ul class="list-group">
    //                             <li class="list-group-item">${element.price} €</li>
    //                             <li class="list-group-item">
    //                                 <a class="list-group-item list-group-item-action
    //                                     active" id="btn_detalle" data-toggle="list" 
    //                                     href="#" role="tab" aria-controls="detalle" 
    //                                     onclick="cargarDetalle(${element.id})">
    //                                     Detalle
    //                                 </a>
    //                             </li>
    //                         </ul>
    //                     </div>
    //                     </div>
    //                 </div>
    //                 </div>`;
    //                 $(".card").fadeIn();
    //                 $("#contenedor_cartas").append(codigoCarta);
    //             });
    //         },
    //     });
    // });
    $("#dispositivos").change(function () {
        $("#contenedor_cartas ").html("");
        $("#contenedor_detalle ").html("");
    })
});

function cargarElementos(id){
    console.log("id", id);
        url = `https://test.krama.es:8014/item/list/${id}`;
        $.ajax({
            type: "GET",
            url: url,
            data: id,
            dataType: "json",
            success: function (response) {
                response.forEach((element) => {
                    let codigoCarta = `<div class="col" id="div-elementos">
                    <div class="card">
                        <img src="${element.pictureUrl}" class="card-img-top" alt="...">
                        <div class="card-body">
                        <h5 class="card-title">${element.description}</h5>
                        <div>
                            <ul class="list-group">
                                <li class="list-group-item">${element.price} €</li>
                                <li class="list-group-item">
                                    <a class="list-group-item list-group-item-action
                                        active" id="btn_detalle" data-toggle="list" 
                                        href="#" role="tab" aria-controls="detalle" 
                                        onclick="cargarDetalle(${element.id})">
                                        Detalle
                                    </a>
                                </li>
                            </ul>
                        </div>
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
                    <div class="w3-container w3-padding-32 w3-center">
                    <img src="${response.pictureUrl}" class="w3-image">
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
    
    var bar1 = new ldBar("#progBar");
    var bar2 = document.getElementById('progBar').ldBar;
    bar1.set(60);
    

}
