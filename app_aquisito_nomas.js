// Variable que mantiene el estado visible del carrito

var carritoVisible = false;

//Esperamos que todos los elementos de la pagina se carguen para continuar con el script
if(document.readyState=='loading'){
    document.addEventListener('DOMContentLoaded', ready)
} else{
    ready();
}

function ready(){
    var botonesEliminarItem = document.getElementsByClassName('btn-eliminar');
    for (var i=0; i < botonesEliminarItem.length; i++){
        var button = botonesEliminarItem [i];
        button.addEventListener('click', eliminarItemCarrito);
    }

    //Agrego funcion al boton sumar cantidad
    var botonesSumarCantidad = document.getElementsByClassName('suma-cantidad');
    for (var i=0; i < botonesSumarCantidad.length; i++){
        var button = botonesSumarCantidad[i];
        button.addEventListener('click', sumarCantidad);
    }

    //Agrego funcion al boton restar cantidad
    var botonesRestarCantidad = document.getElementsByClassName('resta-cantidad');
    for (var i=0; i < botonesRestarCantidad.length; i++){
        var button = botonesRestarCantidad[i];
        button.addEventListener('click', restarCantidad);
    }

    //Agregamos funcionalidad a los botones agregar al carrito
    var botonesAgregarAlCarrito = document.getElementsByClassName('boton-item');
    for (var i=0; i <botonesAgregarAlCarrito.length; i++){
        var button = botonesAgregarAlCarrito[i];
        button.addEventListener('click', agregarAlCarritoClicked);
        actualizarTotalCarrito();
    }

    //Agregar funcionalidad al boton pagar
    document.getElementsByClassName('btn-pagar')[0].addEventListener('click', pagarClicked);
}

//Elimino el item seleccionado del carrito
function eliminarItemCarrito(event){
    var buttonClicked = event.target;
    buttonClicked.parentElement.remove();

    //Actualizamos el total del carrito una vez que hemos eliminado el item
    actualizarTotalCarrito();

    //La siguiente funcion controla si hay elemento en el carrito una vez que se elimino
    //Si no hay debo ocultar el carrito
    ocultarCarrito();
}

//Actualiza el total del carrito
function actualizarTotalCarrito(){
    //seleccionamos el contenedor carrito
    var carritoContenedor = document.getElementsByClassName('carrito')[0];
    var carritoItems = carritoContenedor.getElementsByClassName('carrito-item');
    var total = 0;
    
    //Recorremos cada elemento del carrito para actualizar
    for (var i=0; i < carritoItems.length; i++){
        var item = carritoItems[i];
        var precioElemento = item.getElementsByClassName('carrito-item-precio')[0];
        console.log(precioElemento);
        //Quitamos el simbolo de dolar y el punto de milesimas
        var precio = parseFloat(precioElemento.innerText.replace('$', '').replace('$', ''));
        console.log(precio);
        var cantidadItem = item.getElementsByClassName('carrito-item-cantidad')[0];
        var cantidad = cantidadItem.value;
        console.log(cantidad);
        total = total + (precio * cantidad);
    }
    total = Math.round(total*100)/100;
    document.getElementsByClassName('carrito-precio-total')[0].innerText = '$' + total.toLocaleString("es");
}

function ocultarCarrito(){
    var carritoItems = document.getElementsByClassName('carrito-items')[0];
    if(carritoItems.childElementCount==0){
        var carrito = document.getElementsByClassName('carrito')[0];
        carrito.style.marginRight= '-100%';
        carrito.style.opacity='0';
        carritoVisible= false;

        //ahora maximixo el contenedor de los elementos
        var items = document.getElementsByClassName('contenedor-items')[0];
        items.style.width = '100%';
    }
}

//Aumentamos en uno la cantidad del elemento seleccionado
function sumarCantidad(event){
    var buttonClicked = event.target;
    var selector = buttonClicked.parentElement;
    var cantidadActual = selector.getElementsByClassName('carrito-item-cantidad')[0].value;
    console.log(cantidadActual);
    cantidadActual++;
    selector.getElementsByClassName('carrito-item-cantidad')[0].value = cantidadActual;
    //Actualizamos el carrito total
    actualizarTotalCarrito();
}

function restarCantidad(event){
    var buttonClicked = event.target;
    var selector = buttonClicked.parentElement;
    var cantidadActual = selector.getElementsByClassName('carrito-item-cantidad')[0].value;
    console.log(cantidadActual);
    cantidadActual--;

    //Controlamos que no sea menor que 1
    if(cantidadActual>=1){
        selector.getElementsByClassName('carrito-item-cantidad')[0].value = cantidadActual;
        //Actualizamos el carrito total
        actualizarTotalCarrito();
    }
}

function agregarAlCarritoClicked(event){
    var button = event.target;
    var item = button.parentElement;
    var titulo = item.getElementsByClassName('titulo-item')[0].innerText;
    console.log(titulo);
    var precio = item.getElementsByClassName('precio-item')[0].innerText;
    var imagenSrc = item.getElementsByClassName('img-item')[0].src;
    console.log(imagenSrc);
    actualizarTotalCarrito();
    //La siguiente funcion agrega el elemento al carrito, le mando por parametros los valores
    agregarItemAlCarrito(titulo, precio, imagenSrc);

    //Hacemos visible el carrito cuando agrega por primera vez
    hacerVisibleCarrito();
}

function agregarItemAlCarrito(titulo, precio, imagenSrc){
    var item = document.createElement('div');
    item.classList.add = 'item';
    var ItemsCarrito = document.getElementsByClassName('carrito-items')[0]; 
    //Vamos a controlar que el item esta ingresanfo no se encuentre ta en el carrito
    var nombresItemsCarrito = ItemsCarrito.getElementsByClassName('carrito-item-titulo');
    for (var i=0; i < nombresItemsCarrito.length; i++){
        if(nombresItemsCarrito[i].innerText==titulo){
            alert("El producto ya se encuentra en el carrito");
            return;
        }
    }

    var itemCarritoContenido = `
    <div class="carrito-item">
        <img src="${imagenSrc}" width="80px" alt="">
        <div class="carrito-item-detalles">
            <span class="carrito-item-titulo"> ${titulo}</span>
            <div class="selector-cantidad">
                <br>
                <i class="fa-solid fa-minus resta-cantidad"></i>
                <input type="text" value="1" class="carrito-item-cantidad" disabled>
                <i class="fa-solid fa-plus suma-cantidad"></i>
            </div>
            <br>
            <span class="carrito-item-precio" id="total">${precio}</span>
        </div>
        <br> 
        <span class="btn-eliminar">
            <i class="fa-solid fa-trash"></i>
        </span>
    </div>
    `

    item.innerHTML = itemCarritoContenido;
    ItemsCarrito.append(item);

    //Agregamos la funcion eliminar del nuevo carrito
    item.getElementsByClassName('btn-eliminar')[0].addEventListener('click', eliminarItemCarrito);

    //Agregamos la funcionalidad de sumar del nuevo item
    var botonesSumarCantidad = item.getElementsByClassName('suma-cantidad')[0];
    botonesSumarCantidad.addEventListener('click', sumarCantidad);

    
    //Agregamos la funcionalidad de restar del nuevo item
    var botonesRestarCantidad= item.getElementsByClassName('resta-cantidad')[0];
    botonesRestarCantidad.addEventListener('click', restarCantidad);
}

function pagarClicked(event){
    alert("Gracias por su compra");
    //elimino todos los elementos del carrito
    var carritoItems = document.getElementsByClassName('carrito-items')[0];
    while(carritoItems.hasChildNodes()){
        carritoItems.removeChild(carritoItems.firstChild);
    }
    actualizarTotalCarrito();

    //Funcion que oculta al carrito
    ocultarCarrito();

}

function hacerVisibleCarrito(){
    carritoVisible = true;
    var carrito = document.getElementsByClassName('carrito')[0];
    carrito.style.marginRight= '0';
    carrito.style.opacity = '1';

    var items = document.getElementsByClassName('contenedor-items')[0];
    items.style.width = '100%';
}