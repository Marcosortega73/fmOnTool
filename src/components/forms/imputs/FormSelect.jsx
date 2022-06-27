import { MenuItem, TextField } from "@mui/material";
import React from "react";
import { Controller } from "react-hook-form";
import { alpha, styled } from '@mui/material/styles';
import Chip from '@mui/material/Chip';

import Select from '@mui/material/Select';
export const FormSelect = ({
  control,
  register,
  errors,
  name,
  rulesBol,
  variant,
  labelText,
  opcion,
  color,
  text
}) => {
 /*TODO: 
            # Pasar atributos de estilos por props
    */
  return (
    <>
    {
    opcion&& opcion.length > 0 &&
      <Controller
        name={name}
        control={control}
        rules={{ required: rulesBol }}
        render={({ field }) => (
          <div style={{display:"flex",flexDirection:"column"}}>
          <div style={{marginBottom:5}}>
          <Chip label={text} color="primary" />    
          </div> 
          <Select
            {...field}
            {...register(name)}
            variant={variant}
            label={labelText}
            sx={{
                maxWidth: '100%',
              }}
            error={!!errors[name]}
           
            autoComplete="off"
          >

            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            {opcion.map((o,index)=> <MenuItem key={index} value={o.id}>{o.nombre}</MenuItem>
            
            )}
           
          </Select>
          </div>
        )}
      />
            }
    </>
  );
};


