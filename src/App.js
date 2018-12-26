import React, { Component } from 'react';
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
import theme from './theme';
import DHVideoPlayer from './Components/DHVideoPlayer';

class App extends Component {

  render() {
    return (
      <MuiThemeProvider theme={theme}>
        <div style={{display: 'relative'}}>
            <DHVideoPlayer />

        </div>
      </MuiThemeProvider>
    );
  }
}

export default App;

