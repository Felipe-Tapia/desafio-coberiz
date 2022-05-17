const urlPost = 'https://corebiz-test.herokuapp.com/api/v1/newsletter'
$(window).on("load", function (e) {
    newsletterFooter();
});

const newsletterFooter = () => {
    const submitButton = document.querySelector('.boton-newsletter');
    submitButton.addEventListener('click', e => {
        e.preventDefault();
        saveDataFormCheckout();
    })
}

function saveDataFormCheckout(){
    let datos = {};
    datos.name_user = document.querySelector('#nombre-user').value;
    datos.email_user = document.querySelector('#email-user').value;
    console.log(datos.email_user, datos.name_user, 'datos formulario');


fetch('https://corebiz-test.herokuapp.com/api/v1/newsletter', {
    method: 'POST',
    body: JSON.stringify({
        'email': datos.email_user,
        'name': datos.name_user
    }),
    headers:{
        'Content-type': 'application/json'
    }
}).then(response => response.json(),
swal.fire({
    title: "Usuario creado correctamente",
    icon: "success",
})
)

.then(data => console.log(data))
.catch(err => console.log(err))
};





