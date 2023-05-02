const form = document.getElementById('form') as HTMLFormElement;
const btnGuardar = document.getElementById('btn-guardar') as HTMLButtonElement;
let myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZGVudGlmaWNhY2lvbiI6MTAyMjM0ODc3NCwiY29ycmVvIjoiZXNhbmNoZXoxOTg4QGdtYWlsLmNvbSIsImlhdCI6MTY4MTYwODM4MCwiZXhwIjoxNjgyMjEzMTgwfQ.q5KH3EX0r_x9nBfPw_Sdlo5Qve9SKNqBq52XFxxsXnQ");

btnGuardar.addEventListener('click', (e) =>{
    //e.preventDefault();
    //console.log('Ingreso a la validacion del formulario');
    //validación del formulario

    //Obtener los valores de los Inputs
    const tipoDocumento = document.getElementById('tipoDocumento') as HTMLInputElement;
    const numeroDocumento = document.getElementById('numeroDocumento') as HTMLInputElement;
    const nombre = document.getElementById('nombre') as HTMLInputElement;
    const apellido = document.getElementById('apellido') as HTMLInputElement;
    const celular = document.getElementById('celular') as HTMLInputElement;
    const email = document.getElementById('email') as HTMLInputElement;
    const linkedin = document.getElementById('linkedin') as HTMLInputElement;
    const github = document.getElementById('github') as HTMLInputElement;

    

    let raw = JSON.stringify({
        "tipoIdentificacion": tipoDocumento.value,
        "numeroIdentificacion": numeroDocumento.value,
        "nombres": nombre.value,
        "apellidos": apellido.value,
        "celular": celular.value,
        "correo": email.value,
        "linkedin": linkedin.value,
        "github": github.value
    });

    let requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw
    };
});

let requestOptions = {
    method: 'GET',
    headers: myHeaders,
};

function consultaEstudiantes(){
    
    fetch("https://apiestudiantes.maosystems.dev/estudiantes", requestOptions)
    .then(response => {
        if (!response.ok) {
          throw new Error('No se pudo completar la petición');
        }
        return response.json();
    })
    .then(result =>{
        //console.log(result);        
        
        const resultado = document.getElementById("resultado") ?? null;
        const mostrarRespuesta = result.data;
        const table = document.createElement('table');
        const tableHeader = document.createElement('tr');
        const nameHeader = document.createElement('th');
        const lastHeader = document.createElement('th');
        const idHeader = document.createElement('th');

        resultado!.innerHTML = "";
        
        nameHeader.innerText = "Nombre";
        lastHeader.innerText = "Apellido";
        idHeader.innerText = "ID";
        tableHeader.appendChild(nameHeader);
        table.appendChild(lastHeader);
        tableHeader.appendChild(idHeader);
        table.appendChild(tableHeader);

        for(let i = 0; i < mostrarRespuesta.length; i++){
            const eRow = document.createElement('tr');
            const nameData = document.createElement('td');
            const lastData = document.createElement('td');
            const idDat = document.createElement('td');
            
            nameData.innerText = mostrarRespuesta[i].estudiante_nombres;
            lastData.innerText = mostrarRespuesta[i].estudiante_apellidos;
            idDat.innerText = mostrarRespuesta[i].estudiante_id;

            eRow.appendChild(nameData);
            eRow.appendChild(lastData);
            eRow.appendChild(idDat);
            table.appendChild(eRow);
        }
        resultado!.appendChild(table); 

    }).catch(error => console.log('error', error));
}
consultaEstudiantes();