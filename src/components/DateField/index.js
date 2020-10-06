import * as React from "react";

import {
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  InputGroup,
} from "@chakra-ui/core";

import DatePicker, { registerLocale } from "react-datepicker";

import ptBR from "date-fns/locale/pt-BR";

import {
  Controller,
  useFormContext,
} from "react-hook-form";

import "react-datepicker/dist/react-datepicker.css";
import "./styles.css";

registerLocale("pt-BR", ptBR);

const popperSettings = {
  preventOverflow: {
    enabled: true,
  },
};

export const DateField = ({
  name,
  label,
  helperText = "",
  containerProps = {},
  ...props
}) => {
  const { errors, control } = useFormContext();

  return (
    <FormControl isInvalid={errors[name]} {...containerProps}>
      {label && <FormLabel htmlFor={name}>{label}</FormLabel>}
      <InputGroup>
        <Controller
          name={name}
          as={({ value, ...props }) => <DatePicker value={value} selected={value} {...props}/>}
          locale="pt-BR"
          dateFormat="dd/MM/yyyy"
          control={control}
          showPopperArrow={false}
          popperModifiers={popperSettings}
          {...props}
        />
      </InputGroup>
      {helperText && !errors[name] && <FormHelperText>{helperText}</FormHelperText>}
      <FormErrorMessage>
        {errors[name] && errors[name].message}
      </FormErrorMessage>
    </FormControl>
  );
};
