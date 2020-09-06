import React from "react";

import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
} from "@chakra-ui/core";

import {
  useFormContext,
} from "react-hook-form";

export const TextField = ({
  name,
  label,
  containerProps = {},
  ...props
}) => {
  const { errors, register } = useFormContext();

  return (
    <FormControl isInvalid={errors[name]} {...containerProps}>
      <FormLabel htmlFor={name}>{label}</FormLabel>
      <Input type="text" name={name} ref={register} {...props} />
      <FormErrorMessage>
        {errors[name] && errors[name].message}
      </FormErrorMessage>
    </FormControl>
  );
};
