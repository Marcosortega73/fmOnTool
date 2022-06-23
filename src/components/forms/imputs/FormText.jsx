
import React from "react";
import { Controller } from "react-hook-form";
import {styled } from "@mui/material/styles";
import TextField from '@mui/material/TextField';

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
  bgcolor
}) => {
  
  return (
    <>
      <Controller
        name={name}
        control={control}
        rules={{ required: rulesBol }}
        render={({ field }) => (
          <TextField  
            {...field}
            {...register(name)}
            color={bgcolor}
            type={type}
            className="formText"
            variant={variant} 
            error={!!errors[name]}
            helperText={errors[name] && `${name} es un Campo Requerido`}
            autoComplete="off"
          />
        )}
      />
    </>
  );
};
