import React, { Component } from 'react';
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
import theme from './theme';
import FullBasicVideo from './playground/BackToBasics';

class App extends Component {

  render() {
    return (
      <MuiThemeProvider theme={theme}>
        <div style={{display: 'relative'}}>
          <div>
            <FullBasicVideo />
          </div>
        </div>
      </MuiThemeProvider>
    );
  }
}

export default App;

