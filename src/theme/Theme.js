import { createTheme } from "@mui/material/styles";


//Light theme settings
const lightTheme = createTheme({
  palette: {
    background: {
      default: "#e4f0e2",
      menu:"#64a9de",
      menuDarker:"#2f82c2"
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
      menu:"#0d3f66",
      menuDarker:"#062740"
    },
    text: {
      primary: "#ffffff"
    }
  }
});

  export  {lightTheme,darkTheme}