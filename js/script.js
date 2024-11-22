const getjokesButton = document.getElementById('fetchJoke');
const jokeArea = document.getElementById('jokeList');

// Función para obtener chistes de la API
async function obtenerChistes() {
    const resultados = await fetch('https://api.chucknorris.io/jokes/random');
    const devolver = await resultados.json();
    return devolver;
}

// Función para mostrar los chistes guardados en la página
function mostrarChistes() {
    jokeArea.innerHTML = "";  

    // Obtener la lista de chistes guardados en localStorage
    const chistesGuardados = localStorage.getItem('chistes');
    if (chistesGuardados) {
        const listaChistes = JSON.parse(chistesGuardados);
        listaChistes.forEach((chiste,index) => {
            const divChiste = document.createElement('li');
            divChiste.classList.add('css');
            divChiste.innerHTML = `
            <div><p>${chiste}</p>
             <button class="borrar"data-index="${index}">Eliminar</button></div>`;
            jokeArea.appendChild(divChiste);
        });
    } 
    if (!document.querySelector('.borrarTodo')) { borrartodo();}else {
        jokeArea.innerHTML = "<p>No hay chistes guardados.</p>";
    }
}

// Función para agregar un nuevo chiste a la lista y guardarlo en localStorage
function agregarChiste(chiste) {
    // Obtener la lista de chistes guardados en localStorage
    let listaChistes = localStorage.getItem('chistes');
    if (listaChistes) {
        listaChistes = JSON.parse(listaChistes);
    } else {
        listaChistes = [];
    }

    // Agregar el nuevo chiste a la lista
    listaChistes.push(chiste.value);
    // Guardar la lista actualizada en localStorage
    localStorage.setItem('chistes', JSON.stringify(listaChistes));

    mostrarChistes();
}

// Evento para obtener un chiste cuando se hace clic en el botón
getjokesButton.addEventListener('click', async () => {
    const chiste = await obtenerChistes();
    agregarChiste(chiste);
});

//evento para borrar un chiste presionando el boton borrar
jokeArea.addEventListener('click', (event) => 
    { if (event.target.classList.contains('borrar')) 
        { const index = event.target.getAttribute('data-index');
         let listaChistes = JSON.parse(localStorage.getItem('chistes'));
         listaChistes.splice(index, 1); localStorage.setItem('chistes', JSON.stringify(listaChistes)); mostrarChistes(); } });



//funcion para borrar todos los chistes 

function borrartodo(){ const divborrar=document.createElement("div"); divborrar.classList.add('bb');
    divborrar.innerHTML = `
    <button class="borrarTodo">Borrar Todo</button>`;
    jokeArea.appendChild(divborrar);
    document.querySelector('.borrarTodo').addEventListener('click', () => 
    { localStorage.removeItem('chistes'); mostrarChistes(); }); }


// Mostrar los chistes al cargar la página


document.addEventListener('DOMContentLoaded', mostrarChistes);





