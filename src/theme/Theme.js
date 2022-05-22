import { createTheme } from "@mui/material/styles";


//Light theme settings
const lightTheme = createTheme({
  palette: {
    background: {
      default: "#e4f0e2",
      onDefault:"#d0d0d0",
      menu:"#64a9de",
      menuDarker:"#2f82c2"
    },
    border:{
      primary:"#ffffff"
    },
    text: {
      primary: "#000000",
    }
  }
});

const darkTheme = createTheme({
  palette: {
    background: {
      default: "#222222",
      onDefault:"#333030",
      menu:"#0d3f66",
      menuDarker:"#062740"
    },
    border:{
      primary:"#000000"
    },
    text: {
      primary: "#ffffff"
    }
  }
});

  export  {lightTheme,darkTheme}