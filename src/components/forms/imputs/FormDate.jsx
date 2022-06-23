/* import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { TextField } from "@mui/material";
import React from "react";
import { Controller } from "react-hook-form";
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { es } from 'date-fns/locale'
import {alpha,styled } from "@mui/material/styles";


export const FormDate = ({
  control,
  errors,
  name,
  rulesBol,
  color,
}) => {


  const BootstrapInput = styled(TextField)(({ theme }) => ({
          
   

    '.css-14s5rfu-MuiFormLabel-root-MuiInputLabel-root':{

      color:"#ced4da"

    },
    '.css-1yq5fb3-MuiButtonBase-root-MuiIconButton-root':{

      backgroundColor:"#ced4da",
      color:color

    },
    '.css-1sumxir-MuiFormLabel-root-MuiInputLabel-root.Mui-focused':{

      display:"inline",
      color: color,
      borderRadius: "7px",
      backgroundColor: "#78909c",
      padding: "0px 5px",
    },
    '.css-1sumxir-MuiFormLabel-root-MuiInputLabel-root':{

      display:"none",
    },
    '.css-o9k5xi-MuiInputBase-root-MuiOutlinedInput-root':{
      width:'235.2px'
    },
    


'label + &': {
  marginTop: theme.spacing(8),

},

'& .MuiInputBase-input': {
  borderRadius: 4,
  position: 'relative',
  backgroundColor: theme.palette.mode === 'dark' ? {color} : '#2b2b2b',
  border: '2px solid #ced4da',
  fontSize: 16,
  width: '100%',
  color:'#ced4da',
  padding: '10px 12px',
  transition: theme.transitions.create([
    'border-color',
    'background-color',
    'box-shadow',
  ]),
  // Use the system font instead of the default Roboto font.
  fontFamily: [
    '-apple-system',
    'BlinkMacSystemFont',
    '"Segoe UI"',
    'Roboto',
    '"Helvetica Neue"',
    'Arial',
    'sans-serif',
    '"Apple Color Emoji"',
    '"Segoe UI Emoji"',
    '"Segoe UI Symbol"',
  ].join(','),
  '&:focus': {
    boxShadow: `${alpha(theme.palette.primary.main, 0.25)} 0 0 0 0.2rem`,
    borderColor: "#ced4da",
    color:"#607d8b"
  },
},

}));

  return (
    <>
      <Controller
        name={name}
        control={control}
        rules={{ required: rulesBol }}
        render={({ field }) => (
         <LocalizationProvider dateAdapter={AdapterDateFns} locale={es}>
          <DesktopDatePicker
            {...field}
            mask="__/__/____"
            label="Fecha de Nacimiento"
            minDate={new Date("2017-01-01")}
            renderInput={(params) => <BootstrapInput {...params}  />}
          />
          </LocalizationProvider>
        )}
      />
    </>
  );
}; */

import React from 'react'

const FormDate = () => {
  return (
    <div>FormDate</div>
  )
}

export default FormDate
