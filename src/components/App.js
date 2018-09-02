import React,{Component} from 'react';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import Layout from './Layout'

const theme = createMuiTheme();

class App extends Component {

  render() {
    return (
      <MuiThemeProvider theme={theme}>
        <Layout />
      </MuiThemeProvider>
    );
  }
}

export default App;
