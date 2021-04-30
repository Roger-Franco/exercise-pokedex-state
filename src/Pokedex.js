// import React from 'react';
// import './PokedexCSS.css';
// import Pokemon from './Pokemon';
// import Button from './Button';
// import ButtonType from './ButtonType';

// class Pokedex extends React.Component {
//   constructor() {
//     super();
//     this.state = {
//       index: 0,
//       pokemons: false,
//     };

//     this.setIndex = this.setIndex.bind(this);
//     this.setPokemons = this.setPokemons.bind(this);
//     this.filterPokemons = this.filterPokemons.bind(this);
//   }

//   setIndex(value) {
//     this.setState((ant, _props) => ({
//       index: value,
//     }));
//   }

//   setPokemons(value) {
//     this.setState((ant, _props) => ({
//       pokemons: value,
//     }));
//   }

//   filterPokemons() {
//     return this.props.pokemons.filter(
//       ({ type }) => type === this.state.pokemons || !this.state.pokemons,
//     );
//   }

//   render() {
//     const values = {
//       index: this.state.index,
//       statePokemon: this.state.pokemons,
//       pokemons: this.filterPokemons(),
//       setIndex: this.setIndex,
//       setPokemons: this.setPokemons,
//     };

//     const filterTypes = [...this.props.pokemons].map(({ type }) => type);
//     const listTypes = filterTypes.filter((elem, idx, arr) => arr.indexOf(elem) === idx);
//     const btnsType = listTypes.map((types, index) => <ButtonType key={index} values={values} type={types} />);

//     return (
//       <div className="pokedex">
//         <Pokemon pokemon={values.pokemons[values.index]} />

//         <div className="row-btn-types">
//           <ButtonType values={values} type={false} />
//           {btnsType}
//         </div>

//         <div className="row-btn-next">
//           <Button key='next'values={values} />
//         </div>
//       </div>
//     );
//   }
// }

// export default Pokedex;

/* ========================== */

import React from 'react';
import Pokemon from './Pokemon';
import Button from './Button';
import './pokedex.css';

class Pokedex extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pokemonIndex: 0,
      filteredType: 'all',
    };
  }

  filterPokemons(filteredType) {
    this.setState({ filteredType, pokemonIndex: 0 });
  }

  nextPokemon(numberOfPokemons) {
    this.setState(state => ({
      pokemonIndex: (state.pokemonIndex + 1) % numberOfPokemons,
    }));
  }

  fetchFilteredPokemons() {
    const { pokemons } = this.props;
    const { filteredType } = this.state;

    return pokemons.filter(pokemon => {
      if (filteredType === 'all') return true;
      return pokemon.type === filteredType;
    });
  }

  fetchPokemonTypes() {
    const { pokemons } = this.props;

    return [...new Set(pokemons.reduce((types, { type }) => [...types, type], []))];
  }

  render() {
    const filteredPokemons = this.fetchFilteredPokemons();
    const pokemonTypes = this.fetchPokemonTypes();
    const pokemon = filteredPokemons[this.state.pokemonIndex];

    return (
      <div className="pokedex">
        <Pokemon pokemon={ pokemon } />
        <div className="pokedex-buttons-panel">
          <Button
            onClick={() => this.filterPokemons('all')}
            className="filter-button"
          >
            All
          </Button>
          {pokemonTypes.map(type => (
            <Button
              key={ type }
              onClick={() => this.filterPokemons(type)}
              className="filter-button"
            >
              { type }
            </Button>
          ))}
        </div>
        <Button
          className="pokedex-button"
          onClick={() => this.nextPokemon(filteredPokemons.length)}
          disabled={ filteredPokemons.length <= 1 }
        >
          Próximo pokémon
        </Button>
      </div>
    );
  }
}

export default Pokedex;