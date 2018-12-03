import React, { Component } from 'react';
import ReactPlayer from 'react-player';
import screenfull from 'screenfull';
import { findDOMNode } from 'react-dom';
import Switch from '@material-ui/core/Switch';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Button from '@material-ui/core/Button';
import Dplayer from './DPlayer';
import AspectVideo from './playground/aspectRatio';

class App extends Component {

  render() {
    return (
      <div>
        <AspectVideo />
      </div>
    );
  }
}

export default App;

