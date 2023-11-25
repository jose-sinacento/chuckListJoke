// boton y lista
const fetchJoke = document.getElementById('fetchJoke');
const jokeList = document.getElementById('jokeList');
const deleteAll = document.getElementById('deleteAll');

let arrChiste = [];
let parsedJokes = [];



document.addEventListener('DOMContentLoaded', () => {
    const storedJokes = localStorage.getItem("Chistes");
    if (storedJokes) {
        // los datos del localStorage lo pasamos a un array 'parsedJokes'
        parsedJokes = JSON.parse(storedJokes);
        console.log(parsedJokes);
        // recorremos el array y vamos pintando en html
        parsedJokes.forEach(chisteRecarga => {
            jokeList.innerHTML += `<li>${chisteRecarga}<button class='btnBorrar'>Borrar Chiste</button></li>`;

        })
    }
})



fetchJoke.addEventListener('click', () => {
    fetch('https://api.chucknorris.io/jokes/random')
        .then((response) => {
            if (!response.ok) {
                throw new Error('La solicitud ha fallado');
            }
            return response.json();
        })
        .then((data) => {
            // console.log(data);
            arrChiste.push(data.value);
            //console.log(arrChiste);
            // pasamos el array a string para almacenarlo en el localStorage
            localStorage.setItem("Chistes", JSON.stringify(arrChiste));
            const chistesAlmParse = JSON.parse(localStorage.getItem("Chistes"));
            console.log(chistesAlmParse);
            const [ultmimoChiste] = chistesAlmParse.slice(-1);
            let pintarHtml = `<li>${ultmimoChiste}<button class='btnBorrar'>Borrar Chiste</button></li>`;
            //let indiceChiste = ultmimoChiste.indexOf();
            //console.log(indiceChiste);
            jokeList.innerHTML += pintarHtml;
        })
})

jokeList.addEventListener('click', (event) => {
    //  nos da el li del boton selccionado
    const listItem = event.target.closest('li');
    listItem.innerHTML = '';
    //localStorage.setItem("Chistes",JSON.stringify(parsedJokes));
    console.log(listItem);

    //listItem.innerHTML = '';

})

deleteAll.addEventListener('click', () => {
    jokeList.innerHTML = '';
    localStorage.clear();
});