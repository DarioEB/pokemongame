import { shallowMount } from "@vue/test-utils";
import PokemonOptions from "@/components/PokemonOptions";
import { pokemons } from "../mocks/pokemons.mock";
describe("PokemonOptions Component", () => {
    let wrapper;
    beforeEach(() => {
        wrapper = shallowMount(PokemonOptions, {
            props: {
                pokemons: pokemons,
            },
        });
    });
    test("debe de hacer match con el snapshot", () => {
        // toMatchInlineSnapshot
    //   expect(wrapper.html()).toMatchInlineSnapshot(`
    //   <div class="options-container">
    //     <ul>
    //       <li>bulbasaur</li>
    //       <li>ivysaur</li>
    //       <li>venusaur</li>
    //       <li>charmander</li>
    //     </ul>
    //   </div>
    // `);
        expect(wrapper.html()).toMatchSnapshot();
    });

    test('debe mostrar las 4 opctiones correctamente', () => {
        const lis = wrapper.findAll('li');
        expect(lis.length).toBe(4);
        expect(lis[0].text()).toBe('bulbasaur');
        expect(lis[1].text()).toBe('ivysaur');
        expect(lis[2].text()).toBe('venusaur');
        expect(lis[3].text()).toBe('charmander');
    });

    test('debe de emitir "selection" con sus respectivos parámtros al hacer click', () => {
        const liTags = wrapper.findAll('li');
        const [li1, li2, li3, li4] = liTags;

        li1.trigger('click');
        li2.trigger('click');
        li3.trigger('click');
        li4.trigger('click');

        console.log(wrapper.emitted('selection'));

        expect(wrapper.emitted('selection').length).toBe(4);
        expect(wrapper.emitted('selection')[0]).toEqual([1]);
        expect(wrapper.emitted('selection')[1]).toEqual([2]);
        expect(wrapper.emitted('selection')[2]).toEqual([3]);
        expect(wrapper.emitted('selection')[3]).toEqual([4]);
    });
});
