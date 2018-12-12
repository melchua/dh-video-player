import React, { Component } from 'react';
import AspectVideo from './playground/aspectRatio';

class App extends Component {

  render() {
    return (
      <div style={{maxHeight: '100vh', overflow:'hidden'}}>
        <AspectVideo />
        Filler text
      </div>
    );
  }
}

export default App;

