import React, { Component } from 'react';
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
import theme from './theme';
import FullBasicVideo from './playground/BackToBasics';


class App extends Component {

  render() {
    return (
      <MuiThemeProvider theme={theme}>
        <div>
          {/* <div style={{width:'50vh', height:'50vh'}}> */}
          <div style={{position:'relative',background:'green'}}>
            <FullBasicVideo />
          </div>
          <p>Hello World asfddsafasfasfs</p>

        </div>
      </MuiThemeProvider>
    );
  }
}

export default App;

