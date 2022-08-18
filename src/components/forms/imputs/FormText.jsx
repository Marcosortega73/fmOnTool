
import React from "react";
import { Controller } from "react-hook-form";

import TextField from '@mui/material/TextField';
import Chip from '@mui/material/Chip';

import "./formText.css";

export const FormText = ({
  type,
  control,
  register,
  errors,
  name,
  rulesBol,
  variant,
  labelText,
  bgcolor,
  text,
  setValue,
  vmodel,
  readOnly
}) => {
  
  return (
    <>
      <Controller
        name={name}
        control={control}
        rules={{ required: rulesBol }}
        autoComplete='ViewCrunch'
        render={({ field }) => (
          <>
          <div style={{display:"flex",flexDirection:"column"}}>
          <div style={{marginBottom:5}}>
          <Chip label={text} color="primary" />    
          </div> 
          <TextField  
            {...field }
            {...register(name)}
            type={type}
            className="formText"
            color="primary"
            InputProps={
              readOnly ? {
              readOnly: true,
            }:
            {}}
            error={!!errors[name]}
            helperText={errors[name] && `${text} es un Campo Requerido`}
            autoComplete='ViewCrunch'
          />
          </div>
          </>
        )}
      />
    </>
  );
};
