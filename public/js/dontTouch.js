let userName = ""
let array_trees = [];
let array_plants = [];
let array_players = [];
let array_li = [];
let ores = ['coal', 'gold', 'diamond', 'emerald', 'redstone', 'iron', 'lapiz'];
let countTotalOres = 0;

//consigue 5 de oro
let array_gold = [];
//aumenta la generación aleatoria de diamante, deben aparecer 15 al cargar el mapa
let array_diamond = [];
//consigue 5 minerales distintos
let array_ores = [];
//Da un aldeano una esmeralda
let villager = {
    li: "",
    ore: ""
};
//Manzana dorada
let is_usingScissors = false;
let is_usingPickaxe = false;
let get_GoldenApple = false;
//Muestra los nombres de bloques al pasar el mouse. (automáticamente lo hará la función)
//Habilita la selección de bloques. (automáticamente lo hará la función)
//Construye una torre de madera de 30 bloques. (Ejecutar una función para comprobarlo)

//const postData_route = 'http://www.uttntest.somee.com/api/values/UploadImage';
const env = "http://www.uttntest.somee.com"
//const env = "https://localhost:44327"
const fldr = env + "/Content/TestMinecraftGame/"
const postData_route = env + '/api/values/UploadImage/';
const getData_route = env + '/api/values/getLastImage';
// Esperar a que el documento esté completamente cargado
document.addEventListener('DOMContentLoaded', function() {
    // Mostrar el modal automáticamente al cargar la página
    $('#config').modal('show');

    document.querySelector('.saveUsername').addEventListener('click', function () {
        userName = document.querySelector('#username').value;
        document.querySelector('.username').innerText = userName;
        
        // Ejecutar la función cada 5 segundos
        setInterval(capturarYEnviar, 5000);
        setInterval(cargarImagenesRecientes, 6000);
    })

    document.querySelector('.enchanted-scissors').addEventListener('click', function () {
        if (document.querySelector('.potion-poison') && !document.querySelector('.potion-poison').classList.contains('pending')){
            is_usingScissors = !is_usingScissors
            
            if (is_usingPickaxe) {
                is_usingPickaxe = false
                document.querySelector('.enchanted-pickaxe').classList.remove('lets-mine')
            }

            if (is_usingScissors) {
                this.classList.add("lets-cut")
            }else{
                this.classList.remove("lets-cut")
            }
        }
    
    })

    document.querySelector('.enchanted-pickaxe').addEventListener('click', function () {
        if (document.querySelector('.potion-poison') && !document.querySelector('.potion-poison').classList.contains('pending')){
            is_usingPickaxe = !is_usingPickaxe
            if (is_usingScissors) {
                is_usingScissors = false
                document.querySelector('.enchanted-scissors').classList.remove('lets-cut')
            }

            if (is_usingPickaxe) {
                this.classList.add("lets-mine")
            }else{
                this.classList.remove("lets-mine")
            }
        }
    
    })

    Init()
});


// Función para capturar y enviar la captura por AJAX
 function capturarYEnviar() {
    let main = document.querySelector('.main');
    html2canvas(main).then(function(canvas) {
        // Convertir el lienzo a una imagen base64
        var imageData = canvas.toDataURL('image/png');
        // Eliminar el prefijo "data:image/png;base64,"
        var base64Data = imageData.split(',')[1];
        // Enviar la imagen por AJAX
        $.ajax({
            url: postData_route + userName,
            method: 'POST',
            data: { image: base64Data, Username: userName },
            success: function(response) {
                console.log('Imagen enviada con éxito');
            },
            error: function(xhr, status, error) {
                console.error('Error al enviar la imagen:', error);
            }
        });
    });
}

// Función para cargar las imágenes más recientes
function cargarImagenesRecientes() {
    // Hacer una solicitud AJAX al método en el controlador que devuelve las rutas de las imágenes más recientes
    $.ajax({
        url: getData_route,
        method: 'GET',
        success: function(response) {
            // Limpiar la etiqueta donde se mostrarán las imágenes
            $('#imagen-container').empty();

            // Iterar sobre las rutas de las imágenes más recientes recibidas en la respuesta
            response.forEach(function(imagePath) {
                // Crear un elemento <img>
                var img = document.createElement('img');
                let img_route = imagePath.split('\\')[imagePath.split('\\').length - 1]
                // Establecer los atributos src y alt
                img.setAttribute('src', fldr + img_route);
                img.setAttribute('data-bs-toggle', 'tooltip');
                img.setAttribute('data-bs-placement', 'top');
                img.setAttribute('data-bs-title', img_route.split('_')[0]);
                // Obtener el contenedor de imágenes
                var imagenContainer = document.getElementById('imagen-container');

                // Agregar el elemento <img> al contenedor de imágenes
                imagenContainer.appendChild(img);
                
                if (!array_players.includes(img_route.split('_')[0])) {
                    // Si la imagen no está presente, agregarla al arreglo
                    array_players.push(img_route.split('_')[0]);
                    showPlayer(img_route.split('_')[0])
                }

                let tooltipTriggerList = imagenContainer.querySelectorAll('[data-bs-toggle="tooltip"]')
                let tooltipList = [...tooltipTriggerList].map(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl))
            });
        },
        error: function(xhr, status, error) {
            console.error('Error al cargar las imágenes:', error);
        }
    });
}

function numeroAleatorio() {
    return Math.random().toFixed(3);
}

function generarNumerosAleatorios(cantidad) {
    const numeros = [];
    for (let i = 0; i < cantidad; i++) {
        // Generar un número aleatorio entre 0 y 100
        const numero = Math.floor(Math.random() * (columns + 1)); // Math.random() devuelve un número entre 0 (inclusive) y 1 (exclusivo), por lo que se multiplica por 101 para obtener un número entre 0 y 100
        numeros.push(numero);
    }
    return numeros;
}

function createTree(li, i, j) {
    let strange_number = numeroAleatorio(); 

    if (i >= 45 && i <= 56) {
        
        if (i == 51) {
            strange_number < .8 && li.className == "" ? (li.classList.add('tree-leaves') + 
                                                            (li.nextElementSibling && li.nextElementSibling.className == "" ? li.nextElementSibling.classList.add('tree-leaves') : "")
                                                            + (li.previousElementSibling && li.previousElementSibling.className == "" ? li.previousElementSibling.classList.add('tree-leaves') : "")
                                                        ) : "";
            if (strange_number < .1 && li.className == "tree-leaves") {
                li.className = 'enchanted-apple tree-leaves';
            }                                                
        }
        if (i > 50) {
            li.className == "" ? li.classList.add('tree-wood') : "";
        }
        if (i == 52 || i == 53) {
            li.classList.contains('tree-wood') && li.nextElementSibling && li.nextElementSibling.className == "" ? li.nextElementSibling.classList.add('tree-leaves') : (li.nextElementSibling ? li.nextElementSibling.classList.add('tree-front-wood') : "");
            li.classList.contains('tree-wood') && li.previousElementSibling && li.previousElementSibling.className == "" ? li.previousElementSibling.classList.add('tree-leaves') : (li.previousElementSibling ? li.previousElementSibling.classList.add('tree-front-wood') : "");
        }
        if (i >= 52 && i < 54) {
            strange_number < .8 && li.classList.contains('tree-wood') && li.previousElementSibling && li.previousElementSibling.previousElementSibling && li.previousElementSibling.previousElementSibling.className == "" ? li.previousElementSibling.previousElementSibling.classList.add('tree-leaves') : ""
            strange_number < .8 && li.classList.contains('tree-wood') && li.nextElementSibling && li.nextElementSibling.nextElementSibling && li.nextElementSibling.nextElementSibling.className == "" ? li.nextElementSibling.nextElementSibling.classList.add('tree-leaves') : ""
            
            strange_number < .3 && li.classList.contains('tree-wood') && li.previousElementSibling && li.previousElementSibling.previousElementSibling && li.previousElementSibling.previousElementSibling.className == "" ? li.previousElementSibling.previousElementSibling.classList.replace('tree-leaves', 'tree-front-wood') : ""
            strange_number < .3 && li.classList.contains('tree-wood') && li.nextElementSibling && li.nextElementSibling.nextElementSibling && li.nextElementSibling.nextElementSibling.className == "" ? li.nextElementSibling.nextElementSibling.classList.replace('tree-leaves', 'tree-front-wood') : ""
        }
        
        if (i == 56 ) {
            strange_number < 0.4 && li.className == "tree-wood" ? li.classList.replace('tree-wood', 'dirt') : "";
        }
    }
}

function spawnVillager(li, i, j) {
    //console.log($(li))
    let strange_number = numeroAleatorio(); 
    
    if (i == 56 && document.querySelector('.main').children[i].children[j].classList.contains('ground')) {
        strange_number < .1 && li.className == "" ? li.classList.add("villager") : ""
    }
}

function showPlayer(texto) {
    const lista = document.querySelector('.alerts');
    const nuevoElemento = '<li class="text"><h5></h5></li>';
    
    $(lista).append(nuevoElemento); // Agrega el nuevo elemento a la lista

    const ultimoElemento = lista.lastChild; // Obtén el último elemento agregado

    // Configura el contenido del último elemento
    $(ultimoElemento).find('h5').html('<span class="text-warning">' + texto + "</span>" + " joined.");

    // Programa la eliminación del elemento después de 3 segundos
    setTimeout(function() {
        $(ultimoElemento).fadeOut(function() {
            $(this).remove(); // Elimina el elemento del DOM después de la animación
        });
    }, 4000);
}


function checkEmeraldsPerVillager() {
    
    if (parseInt(document.querySelector("#usersItems .emerald .count").innerText) >= document.querySelectorAll('.villager').length && document.querySelectorAll('.villager').length > 0){
        document.querySelector('.potion-invisibility') ? (document.querySelector('.potion-invisibility').classList.remove("pending") + (document.querySelector('.potion-invisibility').parentElement.classList.replace('bg-dark','bg-primary') + (document.querySelector('.potion-invisibility').parentElement.classList.replace('bg-gradient','enchanted-apple')))) : ""; 
    }

}

function checkDiamondsPerMap() {
    
    if (document.querySelectorAll('.diamond').length >= 15){
        document.querySelector('.potion-luck') ? (document.querySelector('.potion-luck').classList.remove("pending") + (document.querySelector('.potion-luck').parentElement.classList.replace('bg-dark','bg-primary') + (document.querySelector('.potion-luck').parentElement.classList.replace('bg-gradient','enchanted-apple')))) : ""; 
    }

}