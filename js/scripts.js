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
    const input = documen.getElementById("contactoId");
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

function validarFormulario(){
    let region = document.getElementById("region").value;
    if(!region){
        alert("Debes elegir al menos una region");
        return false;
    }

    let comuna = document.getElementById("comuna").value;
    if(!comuna){
        alert("Debes elegir al menos una comuna");
        return false;
    }

    let nombre = document.getElementById("nombre").value;
    if(nombre.length < 3 || nombre.length > 200){
        alert("El nombre debe tener entre 3 y 20 caracteres");
        return false;
    }

    let email = document.getElementById("email").value;
    if(!email){
        alert("Debe colocar un email");
        return false;
    }
    if(email && !email.includes("@")){
        alert("Email inválido");
        return false;
    }

    let telefono = document.getElementById("telefono").value;
    if(telefono && !/^\+\d{3}\.\d{8,9}$/.test(telefono)){
        alert("Teléfono inválido. Ejemplo: +569.12345678");
        return false;
    }

    let tipo = document.getElementById("tipo").value;
    if(!tipo){
        alert("Debes elegir al menos una tipo");
        return false;
    }

    let cantidad = document.getElementById("cantidad").value;
    if(cantidad < 1){
        alert("Cantidad debe ser al menos 1");
        return false;
    }

    let edad = document.getElementById("edad").value;
    if(edad < 1){
        alert("Edad debe ser al menos 1");
        return false;
    }

    let fecha = document.getElementById("fechaEntrega").value;
    let fechaSeleccionada = new Date(fecha);
    let fehcaMinima= new Date();
    if(!fecha){
        alert("Debe seleccionar fecha de entrega");
        return false;
    
    }

    if(fechaSeleccionada < fehcaMinima){
        alert("La fecha debe ser en el presente");
        return false;
    
    }

    

    let contacto = document.getElementById("contactarPor").value;
    let contactoId = document.getElementById("contactoId").value;

    if (contacto && contactoId){
        if (contactoId.length < 4 || contactoId.length > 50){
            alert("El ID o URL de contacto debe tener entre 4 y 50 caracteres");
            return false;
        }
    }

    if(confirm("Esta seguro que desea agregar este aviso de adopcion?")){
        alert("Hemos recibido la información de adopción, muchas gracias!")
        document.location = "index.html";
    }

    return true;
    
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

document.getElementById("btnCerrar").style.display = "none";
document.getElementById("imgGrande").style.display = "none";
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
