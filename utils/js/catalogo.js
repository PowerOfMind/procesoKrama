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
let activo;

window.addEventListener("load", () => {
    dispositivos = document.querySelector("#dispositivos");
    elementos = document.querySelector("#elementos");
    descripcion = document.querySelector("#descripcion");
    imagen = document.querySelector("#imagen");

    dispositivos.addEventListener("change", (e) => {
        option = false;
        itemSeleccionado = e.target.value;
        cargarDispositivos(itemSeleccionado);
    })
    elementos.addEventListener("click", (e) => {
        dispositivoSeleccionado = e.target.value;
        cargarContenido(dispositivoSeleccionado);
        cargarImagen(dispositivoSeleccionado);
    })
})


function cargarDispositivos(id) {
    let url = `https://test.krama.es:8014/item/list/${id}`;
    let nodosBorrar = document.querySelectorAll("#elementos a");
    nodosBorrar.forEach((e) => e.remove());
    console.log(url);
    fetch(url)
        .then(
            (res) => res.json(),
            (rej) => { }
        ).then(
            (res) => {
                console.log("resultados", res);
                res.forEach((element) => {
                    console.log("description: ", element.description + "id:", element.id);
                    let nodoOption = document.createElement("a");
                    nodoOption.value = element.id;
                    nodoOption.classList += "list-group-item list-group-item-action";
                    nodoOption.href += "#"
                    nodoOption.innerHTML += `descripcion: ${element.description} precio: ${element.price}€`;
                    elementos.appendChild(nodoOption);
                })
            }
        )
}

function cargarContenido(id) {
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

                //if (element.id == id) {
                let nodoOption = document.createElement("p");
                nodoOption.innerHTML = `${res.text}`;
                descripcion.appendChild(nodoOption);
                //}

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