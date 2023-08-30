//Selectores
const inputName = document.querySelector('#input-name');
const inputNumber = document.querySelector('#input-number');
const formBtn = document.querySelector('#form-btn');
const form = document.querySelector('#form');
const list = document.querySelector('.list-container');
const btnBorrar = document.querySelector('#btn-li-borrar');
const btnEditar= document.querySelector('#btn-li-editar');


//const NAME_REGEX = ^[A-Z][a-z]*$

//Variables
let contactos = [];

//Eventos
document.addEventListener('DOMContentLoaded', () =>{
    contactos = JSON.parse(localStorage.getItem('contactos')) || [];
    imprimirHTML(contactos);
})
inputName.addEventListener('input', validar);
inputNumber.addEventListener('input', validar);
form.addEventListener('submit', enviarContacto);



//Funciones
function validar(e){
    const inputActual = e.target.name;
    const inputContenido = e.target.value;

    

    if(inputContenido.trim() === ''){
        mostrarAlert(`Ningun campo puede ir vacio`, 1);
        return;
    }
    if (!validarNombre(inputContenido) && inputActual ==='nombre') {
        mostrarAlert(`El nombre debe iniciar con mayuscula. Ej: Gerald`, 1);
        habilitarBoton();
        return;
        
    }
    if(!validarNumero(inputContenido) && inputActual === 'telefono'){
        mostrarAlert(`El numero debe ser venezolano (412,414,416,424,426)`, 1); 
        habilitarBoton();
        return;
    }

    habilitarBoton();
    

}

function enviarContacto(e){
    e.preventDefault();
    
    const objContacto = {
        nombre: inputName.value,
        telefono: inputNumber.value,
        id: Date.now()
    }

    contactos = [...contactos, objContacto];
    
    imprimirHTML(contactos);
    mostrarAlert('El contacto ha sido agregado exitosamente', 2)
    form.reset();
    formBtn.disabled = true;
}
function mostrarAlert(mensaje, tipo) {
    eliminarAlerta();

    const divAlerta = document.createElement('div');

    switch (tipo) {
        case 1:
            const error = document.createElement('p');
            error.textContent = mensaje;
            divAlerta.classList.add('error', 'alertaDiv')
            divAlerta.appendChild(error);
            document.querySelector('.div-container').insertBefore(divAlerta, form);
            break;
            
            case 2:
                const exito = document.createElement('p');
                exito.textContent = mensaje;
                divAlerta.classList.add('success', 'alertaDiv');
                divAlerta.appendChild(exito);
                document.querySelector('.div-container').insertBefore(divAlerta, form);
                setTimeout(() => {
                    divAlerta.remove();
                }, 2000);
            break;

        default:
            break;
    }
    



    

}

function eliminarAlerta() {
    const alerta = document.querySelector('.alertaDiv');
    if (alerta) {
        alerta.remove();
    }
}

function validarNumero(tValue) {
    const NUMBER_REGEX = /^((412)|(212)|(414)|(416)|(424)|(426))[0-9]{7}$/;

    const resultado = NUMBER_REGEX.test(tValue.trim());
    return resultado;
    
}

function validarNombre(tValue) {
    const NAME_REGEX = /^[A-Z][a-z]*$/;
    const resultado = NAME_REGEX.test(tValue.trim());
    return resultado;
}

function habilitarBoton() {
    if (validarNombre(inputName.value) && validarNumero(inputNumber.value)) {
        formBtn.disabled = false;
        return
    }
    formBtn.disabled = true;
}

function imprimirHTML(arrConctact) { 
     
    if (arrConctact) { 
 
        limpiarHTML() 
         
        contactos.forEach( contacto => { 
            const {nombre, telefono} = contacto 
            const li = document.createElement('li'); 
            const btnDelete = document.createElement('button'); 
            const divInputs = document.createElement('div'); 
            const mostrarName = document.createElement('input'); 
            const mostrarNumero = document.createElement('input'); 
            const btnEdit = document.createElement('button'); 
 
            li.classList.add('list-item'); 
            li.setAttribute('id', 'contactSave'); 
            btnDelete.classList.add('btn-li-borrar'); 
            divInputs.classList.add('divInputsMostrar'); 
            mostrarName.setAttribute('type', 'text'); 
            mostrarName.setAttribute('value', nombre); 
            mostrarName.readOnly = true; 
            mostrarNumero.setAttribute('type', 'text'); 
            mostrarNumero.setAttribute('value', telefono); 
            mostrarNumero.readOnly = true; 
            btnEdit.classList.add('btn-li-editar'); 
 
            btnDelete.innerHTML = ` 
            <svg class="svg" width="512" height="512" viewBox="0 0 256 256" xmlns="http://www.w3.org/2000/svg"> 
                <g fill="#000000"> 
                    <path d="M200 56v152a8 8 0 0 1-8 8H64a8 8 0 0 1-8-8V56Z" opacity=".2"/> 
                    <path d="M216 48h-40v-8a24 24 0 0 0-24-24h-48a24 24 0 0 0-24 24v8H40a8 8 0 0 0 0 16h8v144a16 16 0 0 0 16 16h128a16 16 0 0 0 16-16V64h8a8 8 0 0 0 0-16ZM96 40a8 8 0 0 1 8-8h48a8 8 0 0 1 8 8v8H96Zm96 168H64V64h128Zm-80-104v64a8 8 0 0 1-16 0v-64a8 8 0 0 1 16 0Zm48 0v64a8 8 0 0 1-16 0v-64a8 8 0 0 1 16 0Z"/> 
                </g> 
            </svg> 
            `; 
            btnEdit.innerHTML = ` 
                <svg class="svg" width="512" height="512" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg"> 
                <path fill="#000000" d="M2 26h28v2H2zM25.4 9c.8-.8.8-2 0-2.8l-3.6-3.6c-.8-.8-2-.8-2.8 0l-15 15V24h6.4l15-15zm-5-5L24 7.6l-3 3L17.4 7l3-3zM6 22v-3.6l10-10l3.6 3.6l-10 10H6z"/> 
                </svg> 
            `; 
 
            li.appendChild(btnDelete); 
            divInputs.appendChild(mostrarName); 
            divInputs.appendChild(mostrarNumero); 
            li.appendChild(divInputs); 
            li.appendChild(btnEdit); 
 
            // eliminar 
            btnDelete.onclick = () => { 
                eliminarContacto(contacto.id); 
            } 
             
            btnEdit.onclick = () => { 
 
                if (mostrarName.hasAttribute('readOnly') && mostrarNumero.hasAttribute('readOnly')) { 
                    mostrarName.readOnly = false; 
                    mostrarNumero.readOnly = false; 
                    return; 
                }else{
                    
                    const nombreValido = validarNombre(mostrarName.value);
                    const numeroValido = validarNumero(mostrarNumero.value);

                    if (!nombreValido) {
                        mostrarAlert(`El campo nombre no cumple los requisitos`, 1);
                        return;
                    }

                    if (!numeroValido) {
                        mostrarAlert(`El campo número debe ser un número válido`, 1);
                        return;
                    }
                    mostrarName.readOnly = true; 
                    mostrarNumero.readOnly = true; 
 
                    const objEditado = { 
                        nombre: mostrarName.value, 
                        telefono: mostrarNumero.value, 
                        id: contacto.id 
                    } 
     
                    const index = contactos.findIndex(c => c.id === contacto.id); 
     
                    if (index !== -1) { 
                        contactos[index] = objEditado; 
                    } 
     
                    sincronizarStorage(); 
                    mostrarAlert(`Se ha actualizado el contacto exitosamente`, 2)
                } 
 
     
 
            } 
 
            list.appendChild(li); 
        }); 
    } 
    sincronizarStorage(); 
}


function limpiarHTML() {
    while (list.firstChild) {
        list.removeChild(list.firstChild);
    }
}

function sincronizarStorage() {
    localStorage.setItem("contactos", JSON.stringify(contactos));
}
function eliminarContacto(id) {
    contactos = contactos.filter( contacto => contacto.id != id);
    imprimirHTML(contactos);
}
































// let nameValidation = false;
// let numberValidation = false;

// const validate = (input, verification) => {

//     const message = input.parentElement.children[1];


//     if (nameValidation && numberValidation){
//         formBtn.disabled = false; 
//     } else {
//         formBtn.disabled = true;
//     }
//     if (!input.value) {
//         input.classList.remove('error');
//         input.classList.remove('sucess');
//         message.classList.remove('show');

//     } else if (verification) {
//         input.classList.remove('error');
//         input.classList.add('success');
//         message.classList.remove('show');
//     } else {
//         input.classList.add('error');
//         message.classList.add('show');
//         input.classList.remove('success');
//     }
// }

// inputName.addEventListener('input', e => {
//     nameValidation = inputName.value.length > 3;
//     validate(inputName, nameValidation);
//     console.log(nameValidation);
// })

// inputNumber.addEventListener('input', e => {
//     numberValidation = NUMBER_REGEX.test(inputNumber.value);
//     validate(inputNumber, numberValidation);
//     console.log(numberValidation);
// })