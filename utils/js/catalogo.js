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


// function cargarDispositivos(id) {
//     let url = `https://test.krama.es:8014/item/list/${id}`;
//     let nodosBorrar = document.querySelectorAll("#elementos a");
//     nodosBorrar.forEach((e) => e.remove());
//     console.log(url);
//     fetch(url)
//         .then(
//             (res) => res.json(),
//             (rej) => { }
//         ).then(
//             (res) => {
//                 console.log("resultados", res);
//                 res.forEach((element) => {
//                     console.log("description: ", element.description + "id:", element.id);
//                     let nodoOption = document.createElement("a");
//                     nodoOption.value = element.id;
//                     nodoOption.classList += "list-group-item list-group-item-action";
//                     nodoOption.href += "#"
//                     nodoOption.innerHTML += `descripcion: ${element.description} precio: ${element.price}€`;

//                     elementos.appendChild(nodoOption);
//                 })
//             }
//         )
// }

$(document).ready(function () {

    $("#dispositivos").change(function (e) {
        id = $("#dispositivos").val();
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
                                    <a class="list-group-item list-group-item-action active" id="btn_detalle" data-toggle="list" href="#list-home" role="tab" aria-controls="detalle" onclick="cargarDetalle(${element.id})">Detalle</a>
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
            rej: function () {

            }
        });
    });
    $("#dispositivos").change(function (e) {
        $("#contenedor_cartas ").html("");
    })

    
    

});

function cargarDetalle(id){
    cargarContenido(id);
    cargarImagen(id)
}

function cargarContenido(id) {
    console.log("id",id);
    let url = `https://test.krama.es:8014/item/${id}`;

    let nodosBorrar = document.querySelectorAll("#descripcion p");
    nodosBorrar.forEach((e) => e.remove());
    console.log(url);
    fetch(url)
        .then(
            (res) => res.json(),
            (rej) => { }
        )
        .then(
            (res) => {
                console.log("resultados contenido: ", res);

                let nodoOption = document.createElement("p");
                nodoOption.innerHTML = `${res.text}`;
                descripcion.appendChild(nodoOption);


            },
            (rej) => { }
        );
}
function cargarImagen(id) {
    let url = `https://test.krama.es:8014/item/${id}`;
    let nodosBorrar = document.querySelectorAll("#imagen img");
    nodosBorrar.forEach((e) => e.remove());
    console.log(url);
    fetch(url)
        .then(
            (res) => res.json(),
            (rej) => { }
        )
        .then(
            (res) => {
                let nodoOption = document.createElement("img");
                nodoOption.src = res.pictureUrl;
                imagen.appendChild(nodoOption);


            },
            (rej) => { }
        );
}