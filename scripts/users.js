let formulario = document.getElementById('formulario')
let btnCorreo = document.getElementById('btnCorreo')
let btnEditar = document.getElementById('btnEditar')
let btnEliminar = document.getElementById('btnEliminar')

let url = 'http://localhost:4002/usuarios/'

document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('id').style.display = 'none'
    document.getElementById('label-edit').style.display = 'none'
})

formulario.addEventListener('submit', async e => {
    e.preventDefault()

    let name = document.getElementById('name').value
    let lastName = document.getElementById('lastName').value
    let email = document.getElementById('email').value

    await fetch(url, {
        method: 'POST',
        body: JSON.stringify({
            nombre: name,
            apellido: lastName,
            correo: email
        }),
        headers: {
            "Content-Type": "application/json; charset=UTF-8"
        }
    })
    // let data = response.json()
    // console.log(data);
})

btnCorreo.addEventListener('click', async () => {

    document.getElementById('id').style.display = 'block'
    document.getElementById('label-edit').style.display = 'block'

    let email = document.getElementById('email').value

    let response = await fetch(url)
    let data = await response.json()

    let modificar = data.find(user => user.correo.toLowerCase().includes(email.toLowerCase()))

    const {nombre, apellido, correo, id} = modificar

    document.getElementById('name').value = nombre
    document.getElementById('lastName').value = apellido
    document.getElementById('email').value = correo
    document.getElementById('id').value = id

    console.log(modificar)
})

btnEditar.addEventListener('click', async () => {
    let idModificar = document.getElementById('id').value
    let nameModificar = document.getElementById('name').value
    let lastNameModificar = document.getElementById('lastName').value
    let emailModificar = document.getElementById('email').value

    await fetch(url + idModificar, {
        method: 'PUT',
        body: JSON.stringify({
            id: idModificar,
            nombre: nameModificar,
            apellido: lastNameModificar,
            correo: emailModificar
        }),
        headers: {
            'Content-Type': 'application/json; chartset=UTF-8'
        }
    })
})

btnEliminar.addEventListener('click', async () =>{
    let idEliminar = document.getElementById('id').value
    await fetch(url + idEliminar, {
        method: 'DELETE'
    })
})