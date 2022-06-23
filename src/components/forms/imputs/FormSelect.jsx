import { MenuItem, TextField } from "@mui/material";
import React from "react";
import { Controller } from "react-hook-form";
import { alpha, styled } from '@mui/material/styles';
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
  color
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
          <Select
            {...field}
            {...register(name)}
            variant={variant}
            label={labelText}
            select
            defaultValue=""
            sx={{
                width: 226,
                maxWidth: '100%',
              }}
            error={!!errors[name]}
            helperText={errors[name] && `${name} es un Campo Requerido`}
            autoComplete="off"
          >

            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            {opcion.map((o,index)=> <MenuItem key={index} value={o.id}>{o.nombre}</MenuItem>
            
            )}
           
          </Select>
        )}
      />
            }
    </>
  );
};


