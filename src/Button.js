// import React, { Component } from 'react';

// class Button extends Component {
//   nextPokemon() {
//     let { pokemons, setIndex, index } = this.props.values;
//     pokemons[index + 1] ? setIndex(index + 1) : setIndex((index = 0));
//   }

//   render() {
//     return <button className='btn btn-next' onClick={this.nextPokemon.bind(this)}>Próximo!</button>;
//   }
// }

// export default Button;

/* ================= */
import React from "react";
import "./button.css";

const Button = ({ className, children, disabled, onClick }) => (
  <button
    onClick={ onClick }
    className={`button-text ${className}`}
    disabled={ disabled }
  >
    { children }
  </button>
);

export default Button;
