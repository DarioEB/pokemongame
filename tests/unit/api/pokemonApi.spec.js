import pokemonApi from '@/api/pokemonApi';

describe('PokemonAPI', () => {
    test('axios debe de estart configurado con el api de pokemon', () => {
        expect(pokemonApi.defaults.baseURL)
            .toBe('https://pokeapi.co/api/v2/pokemon');
    });
});