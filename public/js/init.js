
let columns = 20;
const rows = 100;


// Función para crear un <ul> con 50 <li> elementos
function crearLista() {
    // Crear 100 listas y agregarlas al contenedor
    const contenedor = document.querySelector('.main');
    contenedor.innerHTML = "";

    for (let i = 1; i <= rows; i++) {
        const ul = document.createElement('ul');
        ul.classList.add('d-flex')
        for (let j = 1; j <= columns; j++) {
            const li = document.createElement('li');
            
            assignBlockClass(li, i, j)    
            ul.appendChild(li);
            
            addEvent(li)//Se añade el evento de clic para todo elemento que se vaya generando, una vez se va cargando su información, se habilitará su evento de tipo click. Dependiendo otros factores, se determinará qué sucederá al hacer click, si permitir el intercambio de bloques, usar pico o tijeras.
        }
        contenedor.appendChild(ul);
    }
    
    for (let i = 57; i >= 0; i--) {
        let element = document.querySelector('.main').children[i - 1];
        for (let j = 0; j < columns; j++) {

            if (i >= 50) {
                let li = element.children[j];
                
                array_trees.includes(j) ? createTree(li, i, j) : ""

                array_plants.includes(j) ? createPlant(li, i, j) : ""
                
                spawnVillager(li, i, j)
            }
        }
    }
    
    array_trees = []
    array_plants = []
}

function assignBlockClass(li, i, j){

    let strange_number = numeroAleatorio(); 
    if (i >= 57) {
        if (i == 57) {
            
            strange_number < .6 ? li.classList.add('ground') : (li.classList.add('dirt') + (strange_number < .8 ? (array_trees.push(j - 1)) : (li.classList.replace("dirt", "water")))); 
            
            li.className == "ground" ? array_plants.push(j - 1) : ""    
        }
        if (i >= 58) {

            if (i < 70){
                li.classList.add('dirt')
            }
            
            if (i >= 63) {
                strange_number < (0.4 + (parseFloat("0." + i) - 0.50).toFixed(3)) ? li.classList.add('dirt') : li.classList.replace('dirt', 'solid-stone')
            }
            if (i >= 70) {
                li.classList.remove('dirt')
                li.classList.add('solid-stone')
                
                strange_number < 0.13 ? li.classList.replace('solid-stone', "coal") : "";
                strange_number < 0.3 ? li.classList.replace('solid-stone', "stone") : "";
                strange_number < 0.31 ? li.classList.replace('solid-stone', "iron") : "";
                strange_number < 0.32 ? li.classList.replace('solid-stone', "gold") : "";
                
                if (i >= 70){
        
                    
                    if (i <= 80) {
                        strange_number < 0.4 ? li.classList.replace('solid-stone', "diorita") : "";
                        
                    }
                    
                    if (i >= 85 && i <= 95) {
                        strange_number < 0.03 ? li.classList.replace('coal', "redstone") : "";
                    }
                    
                    if(i > 93 && i <= 98){
                        
                        strange_number < 1 ? li.classList.replace('lapiz', "old-lapiz") : "";
                        strange_number < 1 ? li.classList.replace('emerald',"old-emerald") : "";
                    }
        
                    if(i >= 90){
                        strange_number < 0.2 ? li.classList.replace('coal', "old-coal") : "";
                        strange_number < 1 ? li.classList.replace('redstone', "old-redstone") : "";
                        strange_number < 0.15 ? li.classList.replace('stone', "lapiz") : "";
                        strange_number < 0.04 ? li.classList.replace('old-coal', "diamond") : "";
        
                        strange_number < 0.045 ? li.classList.replace('old-coal',"emerald") : "";
                        strange_number < 0.4 ? li.classList.replace('solid-stone', "old-solid-stone") : "";
                        strange_number < 0.44 ? li.classList.replace('solid-stone', "Gravel") : "";
                    }
        
                    if(i >= 97 && i <= 98){
                        
                        strange_number <= .7 ? ((li.className = "") + li.classList.add("bedrock")) : "";
                    }
                    if(i >= 99){
                        li.className = ""; li.classList.add("bedrock")
                    }
                }
        
            }
        }
    }

}

function createPlant(li, i, j) {

    let strange_number = numeroAleatorio(); 
    
    if (i == 56 && document.querySelector('.main').children[i].children[j].classList.contains('ground')) {
        //console.log($(li))
        //console.log($(document.querySelector('.main').children[i].children[j].classList.add("identifier")))

        //li.classList.add('identifier')
        strange_number < .6 && li.className == "" ?
            (strange_number < .05 ? li.classList.add("plant-1") 
            : (strange_number < .09 ? li.classList.add("plant-2") 
            : (strange_number < .11 ? li.classList.add("plant-3") 
            : (strange_number < .13 ? li.classList.add("plant-4") 
            : (strange_number < .14 ? li.classList.add("plant-5") 
            : (strange_number < .17 ? li.classList.add("plant-6") 
            : (strange_number < .20 ? li.classList.add("plant-7") 
            : (strange_number < .23 ? li.classList.add("plant-8") 
            : (strange_number < .25 ? li.classList.add("plant-9") 
            : (strange_number < .28 ? li.classList.add("plant-10") 
            : (strange_number < .29 ? li.classList.add("plant-11") 
            : (strange_number < .31 ? li.classList.add("plant-12") 
            : (strange_number < .36 ? li.classList.add("plant-13") 
            : (strange_number < .38 ? li.classList.add("plant-14") 
            : (strange_number < .44 ? li.classList.add("plant-15") 
            : (strange_number < .47 ? li.classList.add("plant-16") 
            : (strange_number < .50 ? li.classList.add("plant-17") 
            : (strange_number < .54 ? li.classList.add("plant-18") 
            : (strange_number < .57 ? li.classList.add("plant-19") 
            : (strange_number < .59 ? li.classList.add("plant-20") 
            : "")))))))))))))))))))) 
            : ""
    }
}

function addEvent(li) {

    
    li.addEventListener('click', function() {
        if (!is_usingScissors && !is_usingPickaxe) {
            this.classList.toggle('select-this');
            array_li.push(this)
        }
        
        // Realizar otras acciones si es necesario
        document.querySelector('.potion-poison') ? (document.querySelector('.potion-poison').classList.remove("pending") + (document.querySelector('.potion-poison').parentElement.classList.replace('bg-dark','bg-primary') + (document.querySelector('.potion-poison').parentElement.classList.replace('bg-gradient','enchanted-apple')))) : ""; 
        
        if (is_usingScissors && this.classList.contains('tree-leaves')) {
            
            this.classList.remove(this.classList[this.classList.length-1]);
            
            if (this.className == "enchanted-apple") {
                document.querySelector('.potion-healing') ? (document.querySelector('.potion-healing').classList.remove("pending") + (document.querySelector('.potion-healing').parentElement.classList.replace('bg-dark','bg-primary') + (document.querySelector('.potion-healing').parentElement.classList.replace('bg-gradient','enchanted-apple')))) : ""; 
            }
        }

        if (is_usingPickaxe && ores.some(className => this.classList.contains(className))) {
            console.log('yes')
            

            ores.forEach(className => {
                if (this.classList.contains(className)) {
                    this.classList.remove(className);
                    this.className = "empty-box solid-stone";
                    let countElement = document.querySelector("#usersItems ." + className + " .count");
                    if (countElement) {
                        countElement.innerText = parseInt(countElement.innerText) + 1;
                        
                        if (countElement.innerText !== "0" && !array_ores.some(cN => cN == className)) {
                            countTotalOres++
                            array_ores.push(className)
                        }
                    }

                    checkEmeraldsPerVillager()

                    if (document.querySelector("#usersItems .gold .count").innerText == 5) {
                        document.querySelector('.potion-strength') ? (document.querySelector('.potion-strength').classList.remove("pending") + (document.querySelector('.potion-strength').parentElement.classList.replace('bg-dark','bg-primary') + (document.querySelector('.potion-strength').parentElement.classList.replace('bg-gradient','enchanted-apple')))) : ""; 
                    }
                }
            });
            
            if (countTotalOres >= 5) {
                document.querySelector('.potion-slowness') ? (document.querySelector('.potion-slowness').classList.remove("pending") + (document.querySelector('.potion-slowness').parentElement.classList.replace('bg-dark','bg-primary') + (document.querySelector('.potion-slowness').parentElement.classList.replace('bg-gradient','enchanted-apple')))) : ""; 
            } 
        }
        
        if(is_usingScissors == false && is_usingPickaxe == false){
            if (array_li.length > 1) {
                let array_ul = [];
                array_ul.push(array_li[0].closest('ul'));
                array_ul.push(array_li[1].closest('ul'));
    
                // Intercambiar los elementos li entre los ul
                let li1 = array_li[0].cloneNode(true);
                let li2 = array_li[1].cloneNode(true);
    
                // Eliminar tooltips de los elementos li seleccionados
                array_li.forEach(item => {
                    $('[data-bs-toggle="tooltip"]').tooltip('dispose'); // Disponer de todos los tooltips
    
                    item.removeAttribute('data-bs-toggle');
                    item.removeAttribute('data-bs-title');
                });
    
                if (array_li[0] != array_li[1]) {
                    array_ul[0].replaceChild(li2, array_li[0]);
                    array_ul[1].replaceChild(li1, array_li[1]);
                }
                
                addEvent(li1)
                addEvent(li2)
                
                // Limpiar la selección
                document.querySelectorAll('.select-this').forEach(li => {
                    li.classList.remove('select-this');
                    // Reiniciar tooltips
                    $('[data-bs-toggle="tooltip"]').tooltip(); // Volver a inicializar los tooltips
                    //loadBlockNames()
                });
    
                // Limpiar el array_li
                array_li = [];
    
            }
        }
    });

}

function loadBlockNames() {
 
    document.querySelector('.potion-night-vision') ? (document.querySelector('.potion-night-vision').classList.remove("pending") + (document.querySelector('.potion-night-vision').parentElement.classList.replace('bg-dark','bg-primary') + (document.querySelector('.potion-night-vision').parentElement.classList.replace('bg-gradient','enchanted-apple')))) : ""; 

    let li_elements = document.querySelectorAll('.main li')
    // Filtrar los elementos que tienen al menos una clase
    li_elements = Array.from(li_elements).filter(function(elemento) {
        return elemento.classList.length > 0;
    });
    // Iterar sobre los elementos seleccionados
    li_elements.forEach(function(li) {
        let title = li.className.split('-').join(' ');
        li.setAttribute('data-bs-toggle', 'tooltip');
        li.setAttribute('data-bs-placement', 'top');
        li.setAttribute('data-bs-title', title);
    });

    let tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]')
    let tooltipList = [...tooltipTriggerList].map(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl))
}

function Init(){
    crearLista()//Primero debemos crear toda la estructura de filas y columnas, al mismo tiempo, dependiendo por rangos de filas establecidos, habrá probabilidad de generar ciertos elementos de forma aleatoria
    loadBlockNames()//Una vez que todos los elementos han sido creados, y que contienen clases, se tomará la información de sus clases para asignarles un tooltip como nombre desplegable, eliminando los guines de los textos de la clase para reeplazarlos por espacios y tener nombres limpios, al final cargaremos esos tooltips con la función específica de bootstrap, ya que añadir el atributo no es necesario, hará falta inicializarlos
    checkEmeraldsPerVillager()//Cuando se hayan cargado los elementos del mapa, se verificará que la cantidad de esmeraldas sea igual o mayor a la cantidad de aldeanos generados
    checkDiamondsPerMap()//Se hará un conteo de los minerales generados en el mapa para corroborar que se haya alcanzado la cantidad deseada una vez aumentada su probabilidad
}