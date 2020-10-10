import React, { useMemo } from "react";

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

import { pathFromString } from "../../utils";

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
  isDisabled = false,
  ...props
}) => {
  const { errors, control } = useFormContext();

  const fieldError = useMemo(() => pathFromString(name, errors), [name, errors]);

  return (
    <FormControl isInvalid={fieldError} {...containerProps}>
      {label && <FormLabel htmlFor={name}>{label}</FormLabel>}
      <InputGroup opacity={isDisabled ? "0.4" : "1"}>
        <Controller
          name={name}
          as={({ value, ...props }) => <DatePicker value={value} selected={value} {...props}/>}
          locale="pt-BR"
          dateFormat="dd/MM/yyyy"
          control={control}
          showPopperArrow={false}
          popperModifiers={popperSettings}
          disabled={isDisabled}
          {...props}
        />
      </InputGroup>
      {helperText && !fieldError && <FormHelperText>{helperText}</FormHelperText>}
      <FormErrorMessage>
        {fieldError && fieldError.message}
      </FormErrorMessage>
    </FormControl>
  );
};
