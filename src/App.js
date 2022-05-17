import{useEffect, useState} from 'react'
import {ThemeProvider } from "@mui/material/styles"
import {CssBaseline,} from "@mui/material";
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import Button from '@mui/material/Button';
import { lightTheme,darkTheme } from './theme/Theme';

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
//localstorage

function App() {

const [isDarkTheme,SetDarkTheme] = useState(false)

const changeTheme = () => {
  SetDarkTheme(!isDarkTheme);
  if(!isDarkTheme){
    localStorage.setItem("chosenTheme","dark")  
  }else{
    localStorage.setItem("chosenTheme","light")
  }
};

useEffect(()=>{
  const theme = localStorage.getItem("chosenTheme")
  if(theme){
    if(theme == 'dark'){
      SetDarkTheme(true)
    }else{
      SetDarkTheme(false)
    }
  }else{
    localStorage.setItem("chosenTheme","light")
  }
})

  return (
    <ThemeProvider theme={isDarkTheme ? lightTheme : darkTheme}>
    <CssBaseline />
   <h1>Change Color</h1>
   <Button  onClick={changeTheme}>
     {!isDarkTheme ? <DarkModeIcon /> : <LightModeIcon/>}
   </Button>

    <BrowserRouter>
    <Routes>
      <Route path="/" exact element = {<Home/>}></Route>
    </Routes>
    </BrowserRouter>

   </ThemeProvider>
  );
}

export default App;
