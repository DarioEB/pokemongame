import pokemonApi from "@/api/pokemonApi";
const getPokemons = () => {
    const pokemonsArr = Array.from(Array(650));
    return pokemonsArr.map((_, index) => index+1);
}

const getPokemonOptions = () => {
    // let pokemons = [];
    const mixedPokemons = getPokemons().sort(() => Math.random()-0.5);
    return new Promise( (resolve, reject) => {
        getPokemonNames(mixedPokemons.splice(0, 4))
            .then((resp) => {
                resolve(resp);
            })
            .catch((err) => {
                console.log(err);
                reject('Error al pedir los pokemons')
            })
    })
}

const getPokemonNames = ([a, b, c, d] = []) => {
    const promises = [
        pokemonApi.get(`/${a}`),
        pokemonApi.get(`/${b}`),
        pokemonApi.get(`/${c}`),
        pokemonApi.get(`/${d}`)
    ];
    return Promise.all(promises)
        .then((resp) => {
            return resp.map((pokemon) => ({
                name: pokemon.data.name,
                id: pokemon.data.id
            }))
        })
        .catch((err) => {
            console.log(err);
            return []
        });
}

export default getPokemonOptions;