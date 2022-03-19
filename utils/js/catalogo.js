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
        });
    });
    $("#dispositivos").change(function (e) {
        $("#contenedor_cartas ").html("");
        $("#contenedor_detalle ").html("");
    })




});

// function cargarDetalle(id) {
//     let detalleItem = `<!-- About Section -->
//     <div class="w3-container w3-padding-32 w3-center">  
//       <h3>About Me, The Food Man</h3><br>
//       <img src="${cargarImagen(id)}" alt="Me" class="w3-image" style="display:block;margin:auto" width="800" height="533">
//       <div class="w3-padding-32">
//         <h4><b>I am Who I Am!</b></h4>
//         <h6><i>With Passion For Real, Good Food</i></h6>
//         <p>Just me, myself and I, exploring the universe of unknownment. I have a heart of love and an interest of lorem ipsum and mauris neque quam blog. I want to share my world with you. Praesent tincidunt sed tellus ut rutrum. Sed vitae justo condimentum, porta lectus vitae, ultricies congue gravida diam non fringilla. Praesent tincidunt sed tellus ut rutrum. Sed vitae justo condimentum, porta lectus vitae, ultricies congue gravida diam non fringilla.</p>
//       </div>
//     </div>`;
//     $("#contenedor_detalle").append(detalleItem);
//     cargarContenido(id);
//     cargarImagen(id)
// }

function cargarDetalle(id) {
    console.log("id", id);
    let url = `https://test.krama.es:8014/item/${id}`;

    // let nodosBorrar = document.querySelectorAll("#contenedor_detalle");
    // nodosBorrar.forEach((e) => e.remove());
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
                    <h3>About Me, The Food Man</h3><br>
                    <img src="${response.pictureUrl}" alt="Me" class="w3-image" style="display:block;margin:auto" width="800" height="533">
                        <div class="w3-padding-32">
                            <h4><b>${response.description}</b></h4>
                            <h6><i>${response.stock}</i></h6>
                            <p>${response.text}</p>
                        </div>
                    </div>`;
            $("#contenedor_detalle").append(detalleItem);
            console.log(detalleItem);


        },
    });
    // function cargarImagen(id) {
    //     let url = `https://test.krama.es:8014/item/${id}`;
    //     let nodosBorrar = document.querySelectorAll("#imagen img");
    //     nodosBorrar.forEach((e) => e.remove());
    //     console.log(url);
    //     fetch(url)
    //         .then(
    //             (res) => res.json(),
    //             (rej) => { }
    //         )
    //         .then(
    //             (res) => {
    //                 let nodoOption = document.createElement("img");
    //                 nodoOption.src = res.pictureUrl;
    //                 imagen.appendChild(nodoOption);


    //             },
    //             (rej) => { }
    //         );
    // }
}
