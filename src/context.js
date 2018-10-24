import React, { Component, createContext } from 'react';

export const TContext = createContext();

export default class TProvider extends Component {
  // 2.
  // qui descrivi lo stato di partenza
  state = {
    isDrawerOpen: false
  };

  // 3.
  // crei le funzioni che modificheranno lo stato
  toggleDrower = () => {
    console.log(this.state.isDrawerOpen);
    this.setState({ isDrawerOpen: !this.state.isDrawerOpen });
  };

  // 4.
  // rendrizzi un provider passando come values le proprieta' dello stato
  // e le funzioni che serviranno alla sua modifica
  // ... i children che wrappa saranno quelli che possono usare questo context
  render() {
    return (
      <TContext.Provider
        value={{ store: this.state, toggleDrawer: this.toggleDrawer }}
      >
        {this.props.children}
      </TContext.Provider>
    );
  }
}
