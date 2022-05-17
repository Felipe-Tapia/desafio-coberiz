const urlGet = 'https://corebiz-test.herokuapp.com/api/v1/products';
const cards = document.getElementById('dataApi');
const items = document.getElementById('items');
const footer = document.getElementById('footer');
const shooper = document.getElementById('shooper');
const conteo = document.getElementById('conteo');
const tabla = document.querySelector('.container');
const cerrar = document.querySelector('.cerrar');
const templateCard = document.getElementById('card-producto').content;
const templateFooter = document.getElementById('template-footer').content;
const templateCarrito = document.getElementById('template-carrito').content;
const fragment = document.createDocumentFragment();
let carrito = {}


document.addEventListener('DOMContentLoaded',() =>{
    fetchData()
    if(localStorage.getItem('carrito')){
        carrito = JSON.parse(localStorage.getItem('carrito'))
        pintarCarrito()
    }
});
cards.addEventListener('click', e => {
    addCarrito(e)
    ocultarItemsCarrito()
})
items.addEventListener('click', e => {
    btnAumentarDisminuir(e)
})
shopper.addEventListener('click', () => {
    mostrarItemsCarrito()
})
cerrar.addEventListener('click', () => {
    ocultarItemsCarrito()
})
const fetchData = async() => {
    try {
        const res = await fetch(urlGet)
        const data = await res.json()
        pintarCards(data)
        //console.log(json)
        carrusel();
    }catch(error){
        console.log(error)
    }
}

const pintarCards = data => {
    data.forEach(producto => {
        if(!producto.installments.length > 0){
            producto.installments= "\u00a0"
        }
        console.log(producto);
        templateCard.querySelector('img').setAttribute('src', producto.imageUrl)
        templateCard.querySelector('h5').textContent = producto.productName
        templateCard.querySelector('.estrellas-producto').textContent = ``
        //templateCard.querySelector('.estrellas-producto').textContent = producto.stars
        templateCard.querySelector('.precio-antiguo').textContent = producto.listPrice
        if(producto.listPrice === null){
            producto.listPrice = "\u00a0"
            var elemento = document.getElementsByClassName("slick-slide");
            for(var i = 0; i < elemento.length; i++)
            elemento[i].className += " queridaaaaaaaaaaaaaaa"
        }
        templateCard.querySelector('.precio-nuevo').textContent = producto.price
        templateCard.querySelector('.cuotas-producto').textContent = `ou em ${producto.installments[0].quantity}x de R$ ${producto.installments[0].value } ` 
        templateCard.querySelector('.buy-btn').dataset.id = producto.productId
        const clone = templateCard.cloneNode(true)
        fragment.appendChild(clone)

        //console.log(producto.installments[0].quantity);
    })
    cards.appendChild(fragment)

}

const addCarrito = e =>{
    const capturaBoton = e.target.classList.contains('buy-btn')
    if(capturaBoton){
        setCarrito(e.target.parentElement)
        swal.fire({
            imageUrl: 'https://jansportcl.vtexassets.com/arquivos/LOGO_COREBIZ.PNG',
            title: "¡Su producto ha sido agregado al carrito!",
            icon: "success",
        })
    }
    e.stopPropagation()
}

const setCarrito = objeto => {
    console.log(objeto)
    const producto = {
        productName: objeto.querySelector('h5').textContent,
        price: objeto.querySelector('.precio-nuevo').textContent,
        productId: objeto.querySelector('.buy-btn').dataset.id,
        cantidad: 1
    }
    if(carrito.hasOwnProperty(producto.productId)){
        producto.cantidad = carrito[producto.productId].cantidad + 1
    }
    carrito[producto.productId] ={...producto}
    //console.log(carrito)
    pintarCarrito()
}

const pintarCarrito = () => {
    //console.log(carrito)
    items.innerHTML = '';
    //console.log(carrito)
    Object.values(carrito).forEach(producto => {
        templateCarrito.querySelector('th').textContent = producto.productName;
        templateCarrito.querySelectorAll('td')[0].textContent = producto.cantidad;
        templateCarrito.querySelector('.btn-info').dataset.id = producto.productId;
        templateCarrito.querySelector('.btn-danger').dataset.id = producto.productId;
        templateCarrito.querySelector('span').textContent = producto.cantidad * producto.price;
        const clone = templateCarrito.cloneNode(true)
        fragment.appendChild(clone)
    })
    items.appendChild(fragment)

    pintarFooter()

    localStorage.setItem('carrito', JSON.stringify(carrito))
}
const pintarFooter = () => {
    footer.innerHTML = ''
    
    if (Object.keys(carrito).length === 0) {
        footer.innerHTML = `
        <th scope="row" colspan="5">Carrito vacío </th>
        `
        return
    }
    
    // sumar cantidad y sumar totales
const nCantidad = Object.values(carrito).reduce((acc, { cantidad }) => acc + cantidad, 0)
//console.log(nCantidad)
const nPrecio = Object.values(carrito).reduce((acc, {cantidad, price}) => acc + cantidad * price ,0)
console.log(nPrecio)

templateFooter.querySelectorAll('td')[0].textContent = nCantidad
templateFooter.querySelector('span').textContent = nPrecio
conteo.textContent= nCantidad
const clone = templateFooter.cloneNode(true)
fragment.appendChild(clone)

footer.appendChild(fragment)

const boton = document.querySelector('#vaciar-carrito')
    boton.addEventListener('click', () => {
        carrito = {}
        pintarCarrito()
    })

}

const btnAumentarDisminuir = e => {
    console.log(e.target.classList.contains('btn-info'))
    if (e.target.classList.contains('btn-info')) {
        const producto = carrito[e.target.dataset.id]
        producto.cantidad++
        carrito[e.target.dataset.id] = { ...producto }
        pintarCarrito()
    }

    if (e.target.classList.contains('btn-danger')) {
        const producto = carrito[e.target.dataset.id]
        producto.cantidad--
        if (producto.cantidad === 0) {
            delete carrito[e.target.dataset.id]
        } else {
            carrito[e.target.dataset.id] = {...producto}
        }
        pintarCarrito()
    }
    e.stopPropagation()
}

const mostrarItemsCarrito = () => {
    div = document.querySelector('.container');
    div.style.display = 'block';
}
const ocultarItemsCarrito = () => {
    div = document.querySelector('.container');
    div.style.display = 'none';
}

// fetch(urlGet)
//     .then(resp =>resp.json())
//     .then(data => mostrarData(data))
//     .catch(error => console.log('error!'))

//     const mostrarData = (data) => {
//         console.log(data)
//         let body = ''
//         for(let i = 0;i<data.length;i++){
//             body+= `
//                 <div class="card-producto">  
//                     <img src="${data[i].imageUrl}"/>
//                     <div id="contenedor-producto">
//                         <p class="nombre-producto">${data[i].productName}</p>
//                         <p class="estrellas-producto">${data[i].stars}</p>  
//                         <p class="precio-antiguo">${data[i].listPrice}</p>                 
//                         <p>por $${data[i].price}</p>
//                         <p>${data[i].installments.quantity}${data[i].installments.value}</p>
//                         <button class="buy-btn">COMPRAR</button>
//                     </div>
//                 </div>  
//             `
//         }
//         document.getElementById('dataApi').innerHTML = body;
//         carrusel();
//         agregaAlCarrito();
//     }

    
