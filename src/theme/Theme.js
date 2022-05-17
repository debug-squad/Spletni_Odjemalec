import { createTheme } from "@mui/material/styles";


//Light theme settings
const lightTheme = createTheme({
  palette: {
    background: {
      default: "#e4f0e2"
    }
  }
});

const darkTheme = createTheme({
  palette: {
    background: {
      default: "#222222"
    },
    text: {
      primary: "#ffffff"
    }
  }
});

  export  {lightTheme,darkTheme}