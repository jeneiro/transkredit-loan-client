import './App.css';
import NavRoutes from './routes';
import { positions, Provider } from "react-alert";
import { MuiThemeProvider, createTheme } from '@material-ui/core/styles';
import AlertTemplate from "react-alert-template-basic";
import React, { createContext, useReducer } from "react";

export const AuthContext = createContext();
const options = {
  timeout: 3000,
  position: positions.TOP_RIGHT
};



const theme = createTheme({
  palette: {
    primary: {
      main: '#F16024',
    },
    secondary: {
      main: '#F16024',
    },
  },

});

function App() {
  //useInterceptor();
 
  return (
   
    <Provider template={AlertTemplate} {...options}>
    <MuiThemeProvider theme={theme}>
    <NavRoutes/>
    </MuiThemeProvider>
    </Provider>
    
   
  );
}

export default App;