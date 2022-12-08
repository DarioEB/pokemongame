import getPokemonOptions, {getPokemons, getPokemonNames} from '@/helpers/getPokemonOptions';

describe('getPokemonOptions helpers', () => {
    test('Debe de regresar un arreglo de números', () => {
        const pokemons = getPokemons();
        expect(pokemons.length).toBe(650);
        expect(pokemons[0]).toBe(1);
        expect(pokemons[500]).toBe(501);
        expect(pokemons[649]).toBe(650);
    });

    test('debe de retornar un arreglo de 4 elementos con nombres de pokemons', () => {
        return new Promise( (resolve, reject) => {
            getPokemonNames([1, 2, 3, 4])
                .then((response) => {
                    expect(response.length).toBe(4);
                    expect(response[0].name).toBe('bulbasaur');
                    expect(response[0].id).toBe(1);
                    expect(response).toStrictEqual(
                        [
                            { "name": "bulbasaur", "id": 1 },
                            { "name": "ivysaur", "id": 2 },
                            { "name": "venusaur", "id": 3 },
                            { "name": "charmander", "id": 4 }
                        ]
                    );
                    resolve(response);
                })
                .catch((err) => {
                    reject(err.message);
                })
        })
    });
    
    test('getPokemonsOptions debe de retornar un arreglo mezclado', () => {
        let pokemons; 
        getPokemonOptions()
            .then((response) => {
                pokemons = response;
                expect(pokemons).toEqual([
                    {
                        name: expect.any(String),
                        id: expect.any(Number)
                    },
                    {
                        name: expect.any(String),
                        id: expect.any(Number)
                    },
                    {
                        name: expect.any(String),
                        id: expect.any(Number)
                    },
                    {
                        name: expect.any(String),
                        id: expect.any(Number)
                    }
                ]);
            })
    });
});