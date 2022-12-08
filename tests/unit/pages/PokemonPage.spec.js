import {shallowMount, mount} from '@vue/test-utils';
import PokemonPage from '@/pages/PokemonPage';
import PokemonPicture from '@/components/PokemonPicture';
import {pokemons} from '../mocks/pokemons.mock';
describe('PokemonPage component', () => {
    let wrapper;

    beforeEach(() => {
        wrapper = shallowMount(PokemonPage);
    });

    test('debe de hacer match con el snapshot', () => {
        expect(wrapper.html()).toMatchSnapshot();
    });

    test('debe de llamar mixPokemonArray al montar', () => {
        const mixPokemonArraySpy = jest.spyOn(PokemonPage.methods, 'mixPokemonArray');
        const wrapper = shallowMount(PokemonPage);
        expect(mixPokemonArraySpy).toHaveBeenCalled();
    });

    test('debe de hacer match con el snapshot cuando cargan los pokemons', () => {
        const wrapper = shallowMount(PokemonPage, {
            data() {
                return {
                    pokemonArr: pokemons,
                    pokemon: pokemons[0],
                    showPokemon: false,
                    showAnswer: false,
                    message: ''
                }
            }
        });
        expect(wrapper.html()).toMatchSnapshot();
    });

    test('debe de mostrar los componentes de PokemonPicture y PokemonOptions', () => {
        const wrapper = shallowMount(PokemonPage, {
            data() {
                return {
                    pokemonArr: pokemons,
                    pokemon: pokemons[3],
                    showPokemon: false,
                    showAnswer: false,
                    message: ''
                }
            }
        });

        const pokemonPictureComponent = wrapper.findComponent({name: 'PokemonPicture'});
        const pokemonOptionsComponent = wrapper.findComponent({name: 'PokemonOptions'})
        
        expect(pokemonPictureComponent.exists()).toBeTruthy();
        // expect(wrapper.find('pokemon-picture-stub).exists()).toBeTruthy();
        expect(pokemonOptionsComponent.exists()).toBeTruthy();
        // expect(wrapper.find('pokemon-options-stub).exists()).toBeTruthy();

        // console.log(pokemonPictureComponent.componentVM.pokemonId).toBe(4);
        expect(pokemonPictureComponent.componentVM.pokemonId).toBe(4);
        expect(pokemonOptionsComponent.componentVM.pokemons).toBeTruthy();
    });

    test('pruebas con checkAnswer', async () => {
        const wrapper = shallowMount(PokemonPage, {
            data() {
                return {
                    pokemonArr: pokemons,
                    pokemon: pokemons[3],
                    showPokemon: false,
                    showAnswer: false,
                    message: ''
                }
            }
        });

        await wrapper.vm.checkAnswer(4);
        expect(wrapper.find('h2').exists()).toBeTruthy();
        expect(wrapper.vm.showPokemon).toBeTruthy();
        expect(wrapper.find('h2').text()).toBe(`Correcto, ${pokemons[3].name}`);

        await wrapper.vm.checkAnswer(3);
        expect(wrapper.find('h2').text()).toBe(`NOOo!!!, ERA ${pokemons[3].name}`)
    });
});