import { createTheme } from "@mui/material/styles";

const theme = createTheme({
    palette: {
        primary: {
            main: "#1e2024",
            light: "#292c31",
            dark: "#121417",
            contrastText: "#fff"
        },
        secondary: {
            main: "#cca500",
            light: "#f5f5f5",
            dark: "#546e7a",
            contrastText: "#fff"
        },
        error: {
            main: "#f44336",
            light: "#e57373",
            dark: "#d32f2f",
            contrastText: "#fff"
        },
        currentColor: {
            main: "#cca500",
            light: "#f5f5f5",
            dark: "#f5f5f5",
            contrastText: "#fff"
        }
    
    
    },
})



export const customThemeBox = {

    marginTop:'50px',
    bgcolor: "#cca500", 
    height: "100%", 
    width: "50%",
    borderRadius:"15px",
    boxShadow:"1px 2px 5px 3px rgba(0,0,0,0.75)"
  
  }
 export default theme;