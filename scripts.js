class Persona {
    constructor(id, nombre, apellido, fechaNacimiento) {
        if (id !== null && nombre !== null && apellido !== null) {
            this.id = id;
            this.nombre = nombre;
            this.apellido = apellido;
            this.fechaNacimiento = fechaNacimiento;
        }
    }

    toString() {
        return "Id: ${this.id}, Nombre: ${this.nombre}, Apellido: ${this.apellido}, Fecha de Nacimiento: ${this.fechaNacimiento}";
    }
}
class Ciudadano extends Persona {
    constructor(id, nombre, apellido, fechaNacimiento, dni) {
        super(id, nombre, apellido, fechaNacimiento);
        if (dni > 0) {
            this.dni = dni;
        }
    }

    toString() {
        return "Ciudadano: ${super.toString()}, dni: ${this.dni}";
    }
}
class Extranjero extends Persona {
    constructor(id, nombre, apellido, fechaNacimiento, paisOrigen) {
        super(id, nombre, apellido, fechaNacimiento);
        if (paisOrigen != null) {
            this.paisOrigen = paisOrigen;
        }
    }

    toString() {
        return "Extranjero: ${super.toString()}, Pais de Origen: ${this.paisOrigen}";
    }
}

let data;
let arrayPersonas = [];
function cargarPersonas() {
    data.forEach((persona) => {
        if (persona.dni) {
            let ciudadano = new Ciudadano(persona.id, persona.nombre, persona.apellido, persona.fechaNacimiento, persona.dni);
            arrayPersonas.push(ciudadano);
        } else if (persona.paisOrigen) {
            let extranjero = new Extranjero(persona.id, persona.nombre, persona.apellido, persona.fechaNacimiento, persona.paisOrigen);
            arrayPersonas.push(extranjero);
        }
    });
    cargarTabla(arrayPersonas);
}

function cargarTabla(array) {
    let tabla = document.getElementById("cuerpo_Tabla");
    tabla.innerHTML = "";
    array.forEach((persona) => {
        let fila = document.createElement("tr");
        const atributos = ["id", "nombre", "apellido", "fechaNacimiento", "dni", "paisOrigen"];
        atributos.forEach((atributo) => {
            let celda = document.createElement("td");
            celda.textContent = persona[atributo] || "N/A";
            fila.appendChild(celda);
        });
        tabla.appendChild(fila);
    });
}

function obtenerPersonasPorAPI() {
    let http = new XMLHttpRequest();
    mostrarSpinner();
    http.onreadystatechange = function () {
        if (http.readyState == 4 && http.status == 200) {
            data = JSON.parse(http.response);
            cargarPersonas();
            ocultarSpinner();
        }
        else {
            if (http.readyState == 4) {
                alert("Ocurrio un problema en la red");
                ocultarSpinner();
            }
        }
    }
    http.open("GET", "https://examenesutn.vercel.app/api/PersonaCiudadanoExtranjero");
    http.send();
}

function mostrarSpinner() {
    document.getElementById('pantallaCompletaSpinner').style.display = 'flex';
}

function ocultarSpinner() {
    document.getElementById('pantallaCompletaSpinner').style.display = 'none';
}

//Definir funcionalidad de botones
btn_Agregar.addEventListener("click", function () {
    selectForm.style.display = "block";
    selectTabla.style.display = "none";
    btn_Modificar.style.visibility = "hidden";
    btn_Eliminar.style.visibility = "hidden";
    abmCampoId.value = "";
    abmCampoModelo.value = "";
    abmCampoAnoFabricacion.value = "";
    abmCampoVelMax.value = "";
    if (selectorFormulario.value == "auto") {
        abmCampoCantidadPuertas.style.visibility = "visible";
        abmCampoAsientos.style.visibility = "visible";
    }
    else if (selectorFormulario.value == "camion") {
        abmCampoCarga.style.visibility = "visible";
        abmCampoAutonomia.style.visibility = "visible";
    }
    btn_Crear.style.visibility = "visible";
});

const selectForm = document.getElementById("form_Personas");
const selectTabla = document.getElementById("tabla_Personas");
const btn_Agregar = document.getElementById("btn_Agregar");
const btn_Modificar = document.getElementById("btn_Modificar");
const btn_Eliminar = document.getElementById("btn_Eliminar");