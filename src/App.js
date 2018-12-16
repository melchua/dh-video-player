import React, { Component } from 'react';
// import AspectVideo from './playground/AspectRatio';
import FullBasicVideo from './playground/BackToBasics';

class App extends Component {

  render() {
    return (
      <div>
        {/* <div style={{overflow:'hidden', maxHeight:'100vh'}}> */}
        {/* <div style={{width:'50vh', height:'50vh'}}> */}
        <div style={{position:'relative',top:'40px',background:'green',border: '5px solid yellow'}}>
          <FullBasicVideo />
        </div>

      </div>
    );
  }
}

export default App;

