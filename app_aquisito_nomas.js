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
}

//Elimino el item seleccionado del carrito
function eliminarItemCarrito(event){
    var buttonClicked = event.target;
    buttonClicked.parentElement.remove();

    //Actualizamos el total del carrito una vez que hemos eliminado el item
    actualizarTotalCarrito();
    //La siguiente funcion controla si hay elementos en el carrito una vez que se elimina
    //Si no hay debo ocultar carrito
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
        total = total + (precio*cantidad);
    }
    total = Math.round(total*100)/100;
    document.getElementsByClassName('carrito-precio-total')[0].innerText = '$' + total.toLocaleString("es") + ',00';
}

function ocultarCarrito(){
    var carritoItems = document.getElementsByClassName('carrito-items')[0];
    if (carritoItems.childElementCount==0){
        var carrito = document.getElementsByClassName('carrito')[0];
        carrito.style.marginRight= '100%';
        carrito.style.opacity='0';
        carritoVisible = false;

        //Ahora maximizo el contenedor de los elementos
        var items = document.getElementsByClassName('contenedor-items')[0];
        items.style.width='100%'
    }
}
