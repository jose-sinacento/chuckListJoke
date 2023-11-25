

const button = document.getElementById("fetchJoke");
const jokeList = document.getElementById("jokeList");

document.addEventListener('DOMContentLoaded', () => {
    const storedJokes = localStorage.getItem("jokeList");
    if (storedJokes) {
        const parsedJokes = JSON.parse(storedJokes);
        jokeList.innerHTML += `<p>${parsedJokes}</p>`;
    }
});

button.addEventListener('click', () => {

    fetch("https://api.chucknorris.io/jokes/random")
    .then ((response) => {
        if (!response.ok) {
            throw new Error ('La solicitud no se puede procesar.');
        }
        return response.json();
    })
    .then ((chistes) => {
        let listaChistes = chistes.value;
    
        localStorage.setItem("jokeList", JSON.stringify(listaChistes));

        jokeList.innerHTML += `<p>${listaChistes}</p>`;
    
    })
})
