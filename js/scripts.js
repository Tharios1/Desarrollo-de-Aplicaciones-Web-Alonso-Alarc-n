const regionSelect = document.getElementById("region");
const comunaSelect = document.getElementById("comuna");

if(regionSelect && comunaSelect){
    region_comuna.regiones.forEach(r => {
        const opt = document.createElement("option");
        opt.value = r.numero;
        opt.textContent = r.nombre;
        regionSelect.appendChild(opt);

    });

    regionSelect.addEventListener("change", ()=>{
        comunaSelect.innerHTML= "<option value=''>Seleccione</option>";
        const regionElegida = region_comuna.regiones.find(r => r.numero == regionSelect.value);
        if(regionElegida){
            regionElegida.comunas.forEach(c => {
                const opt = document.createElement("option");
                opt.value = c.id;
                opt.textContent = c.nombre;
                comunaSelect.appendChild(opt);

            });
        }
    });
}

function mostrarInputContacto(){
    const contacto = document.getElementById("contactarPor");
    const input = document.getElementById("contactoId");
    if(contacto.value){
        input.style.display = "block";
    }else{
        input.style.display = "none";
    }
}

let fotos = 1;
function agregarFoto(){
    if(fotos < 5){
        fotos++
        const div = document.getElementById("masFotos");
        const input = document.createElement("input");
        input.type = "file";
        input.accept = "image/*";
        div.appendChild(document.createElement("br"));
        div.appendChild(input);
    }else{
        alert("Maximo 5 fotos");
    }
}





let contactos = 1;
function agregarOtroContacto(){
    if (contactos < 5){
        contactos++;
        const div = document.getElementById("masContactos");
        const nuevoSelect = document.createElement("select");
        nuevoSelect.innerHTML = 
        `<option value="">Seleccione</option>
          <option value="whatsapp">WhatsApp</option>
          <option value="telegram">Telegram</option>
          <option value="X">X</option>
          <option value="instagram">Instagram</option>
          <option value="tiktok">TikTok</option>
          <option value="otro">Otro</option>`;
          const nuevoInput =  document.createElement("input");
          nuevoInput.type = "text";
          nuevoInput.placeholder = "ID o URL (4-50 caracteres)";
          div.appendChild(document.createElement("br"));
          div.appendChild(nuevoSelect);
          div.appendChild(nuevoInput);    
    } else{
        alert("Maximo 5 contactos permitidos");
    }
}

const btnCerrar = document.getElementById("btnCerrar");
if (btnCerrar) btnCerrar.style.display = "none";

const imgGrande = document.getElementById("imgGrande");
if (imgGrande) imgGrande.style.display = "none";
function ampliarFoto(img){
    let modal = document.getElementById("modalFoto");
    let modalImg = document.getElementById("imgGrande");
    let btnCerrar = document.getElementById("btnCerrar");
    modal.style.display = "block";
    modalImg.style.display = "block";
    modalImg.src = img.src;
    btnCerrar.style.display = "block";
}

function cerrarFoto(){
  document.getElementById("modalFoto").style.display = "none";
   let btnCerrar = document.getElementById("btnCerrar");
   modal.style.display = "none";
   btnCerrar.style.display = "none";
  
}

const validateRegion = (region) => region && region.trim() !== "";
const validateComuna = (comuna) => comuna && comuna.trim() !== "";

const validateName = (name) => {
  if(!name) return false;
  let lengthValid =  name.trim().length >= 3 && name.trim().length <= 200;
  
  return lengthValid;
}



const validateEmail = (email) => {
  if (!email) return false;
  let lengthValid = email.length > 15;

  // validamos el formato
  let re = /^[\w.]+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
  let formatValid = re.test(email);

  // devolvemos la lógica AND de las validaciones.
  return lengthValid && formatValid;
};


const validatePhoneNumber = (phoneNumber) => {
  if (!phoneNumber) return false;
  // validación de longitud
  let lengthValid = phoneNumber.length >= 8;

  // validación de formato
  let re = /^\+\d{3}\.\d{8,9}$/;
  let formatValid = re.test(phoneNumber);

  // devolvemos la lógica AND de las validaciones.
  return lengthValid && formatValid;
};


const validateTipo = (tipo) => tipo && tipo.trim() != "";

const validateCantidad = (cantidad) => cantidad && cantidad >= 1;

const validateEdad = (edad) => edad && edad >= 1;

const validateFechaEntrega = (fecha) => {
    if(!fecha) return false;

    let fechaSeleccionada = new Date(fecha);
    let fehcaMinima= new Date();
    return fechaSeleccionada >= fehcaMinima
};

const validateContactoId = (contacto, contactoId) => {
    if (!contacto) return true;
    if (!contactoId) return false;
    return contactoId.length >= 4 && contactoId.length <= 50;
};


const validateFiles = (files) => {
  if (!files) return false;

  // validación del número de archivos
  let lengthValid = 1 <= files.length && files.length <= 5;

  // validación del tipo de archivo
  let typeValid = true;

  for (const file of files) {
    // el tipo de archivo debe ser "image/<foo>" o "application/pdf"
    let fileFamily = file.type.split("/")[0];
    typeValid &&= fileFamily == "image" || file.type == "application/pdf";
  }

  // devolvemos la lógica AND de las validaciones.
  return lengthValid && typeValid;
};





const validateForm = () => {
  // obtener elementos del DOM usando el nombre del formulario.
  let myForm = document.forms["myForm"];
  let region= myForm["region"].value;
  let comuna= myForm["comuna"].value;
  let name= myForm["nombre"].value;
  let email= myForm["email"].value;
  let phone= myForm["telefono"].value;
  let tipo= myForm["tipo"].value;
  let cantidad= myForm["cantidad"].value;
  let edad= myForm["edad"].value;
  let fecha= myForm["fechaEntrega"].value;
  let contacto= myForm["contactarPor"].value;
  let contactoId= myForm["contactoId"].value;
  let Foto= myForm["foto1"].value;
  

  // variables auxiliares de validación y función.
  let invalidInputs = [];
  let isValid = true;
  const setInvalidInput = (inputName, reason) => {
    invalidInputs.push(`${inputName}: ${reason}`);
    isValid &&= false;
  };

  // lógica de validación
  if (!validateRegion(region)) setInvalidInput("Region", "Debes elegir al menos una region");
  if (!validateComuna(comuna)) setInvalidInput("Comuna","Debes elegir al menos una comuna");
  if (!validateName(name)) setInvalidInput("Nombre","El nombre debe tener entre 3 y 20 caracteres");
  if (!validateEmail(email)) setInvalidInput("Email","Debe colocar un email valido");
  if (phone && !validatePhoneNumber(phone)) setInvalidInput("Telefono", "Teléfono inválido. Ejemplo: +569.12345678");
  if (!validateTipo(tipo)) setInvalidInput("Tipo","Debes elegir al menos un tipo");
  if (!validateCantidad(cantidad)) setInvalidInput("Cantidad", "Cantidad debe ser al menos 1");
  if (!validateEdad(edad)) setInvalidInput("Edad","Edad debe ser al menos 1");
  if (!validateFechaEntrega(fecha)) setInvalidInput("Fecha de Entrega", "Debe ser igual o posterior a hoy");
  if (!validateContactoId(contacto, contactoId)) setInvalidInput("El ID o URL", "El contacto debe tener entre 4 y 50 caracteres");
  if (!validateRegion(Foto)) setInvalidInput("Foto", "Debes agregar un minimo de 1 foto");

  

  // finalmente mostrar la validación
  let validationBox = document.getElementById("val-box");
  let validationMessageElem = document.getElementById("val-msg");
  let validationListElem = document.getElementById("val-list");
  let formContainer = document.querySelector(".main-container");

  if (!isValid) {
    validationListElem.textContent = "";
    // agregar elementos inválidos al elemento val-list.
    for (input of invalidInputs) {
      let listElement = document.createElement("li");
      listElement.innerText = input;
      validationListElem.append(listElement);
    }
    // establecer val-msg
    validationMessageElem.innerText = "Los siguientes campos son inválidos:";

    // aplicar estilos de error
    validationBox.style.backgroundColor = "#ffdddd";
    validationBox.style.borderLeftColor = "#f44336";

    // hacer visible el mensaje de validación
    validationBox.hidden = false;
  } else {
    // Ocultar el formulario
    myForm.style.display = "none";
    

    // establecer mensaje de éxito
    validationMessageElem.innerText = "“¿Está seguro que desea agregar este aviso de adopción?";
    validationListElem.textContent = "";

    // aplicar estilos de éxito
    validationBox.style.backgroundColor = "#ddffdd";
    validationBox.style.borderLeftColor = "#4CAF50";

    

    // Agregar botones para enviar el formulario o volver
    let yesBtn = document.createElement("button");
    yesBtn.innerText = "“Sí, estoy seguro";
    yesBtn.style.marginRight = "10px";
    yesBtn.addEventListener("click", () => {
      validationMessageElem.innerText = "Hemos recibido la información de adopción, muchas gracias y suerte!"
      validationListElem.innerHTML = "";
      let backHome = document.createElement("button");
      backHome.innerText = "Volver a la portada"
      backHome.addEventListener("click", () => {
        window.location.href = "index.html";
      });
      validationListElem.appendChild(backHome);
      
    });

    let noBtn = document.createElement("button");
    noBtn.innerText = "No, no estoy seguro, quiero volver al formulario";
    noBtn.addEventListener("click", () => {
      // Mostrar el formulario nuevamente
      myForm.style.display = "block";
      validationBox.hidden = true;
    });

    
    validationListElem.appendChild(yesBtn);
    validationListElem.appendChild(noBtn);
    

    // hacer visible el mensaje de validación
    validationBox.hidden = false;
  }
};

let submitBtn = document.getElementById("submit-btn");
submitBtn.addEventListener("click", validateForm);
