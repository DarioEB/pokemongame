<template>
    <h1 v-if="!pokemon">Espere por favor...</h1>
    <div v-else>
        <h1>¿Quién es este pokemon?</h1>
        <pokemon-picture 
            :pokemon-id="pokemon.id" 
            :show-pokemon="showPokemon" 
        />
        <pokemon-options 
            :pokemons="pokemonArr" 
            @selection="checkAnswer"
        />

        <template v-if="showAnswer">
            <h2>{{message}}</h2>
            <button @click="newGame">
                Nuevo juego
            </button>
        </template>
    </div>
</template>

<script>
import PokemonOptions from '@/components/PokemonOptions';
import PokemonPicture from '@/components/PokemonPicture';
import getPokemonOptions from '@/helpers/getPokemonOptions';
export default {
    components: { 
        PokemonOptions, 
        PokemonPicture
    },
    data() {
        return {
            pokemonArr: [],
            pokemon: null,
            showPokemon: false,
            showAnswer: false,
            message: ''
        }
    },
    methods: {
        mixPokemonArray() {
            getPokemonOptions()
                .then((resp) => {
                    this.pokemonArr = resp;
                    const rndInt = Math.floor(Math.random() * 4);
                    this.pokemon = this.pokemonArr[rndInt];
                })
                .catch((err) => {
                    console.log(err);
                    this.pokemonArr = []
                })
        },
        checkAnswer(pokemonId) {
            this.showPokemon = true;
            this.showAnswer = true;
            if (pokemonId === this.pokemon.id) {
                this.message = `Correcto, ${this.pokemon.name}`
            } else {
                this.message = `NOOo!!!, ERA ${this.pokemon.name}`
            }
        },
        newGame() {
            this.showPokemon = false;
            this.showAnswer = false;
            this.pokemonArr = [];
            this.pokemon = null;
            this.mixPokemonArray();
        }
    },
    mounted() {
        this.mixPokemonArray();
    }
}
</script>

<style>

</style>