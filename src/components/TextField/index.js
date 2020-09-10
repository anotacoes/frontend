import React from "react";

import {
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
} from "@chakra-ui/core";

import {
  useFormContext,
} from "react-hook-form";

export const TextField = ({
  name,
  label,
  leftElement,
  rightElement,
  helperText = "",
  containerProps = {},
  ...props
}) => {
  const { errors, register } = useFormContext();

  return (
    <FormControl isInvalid={errors[name]} {...containerProps}>
      {label && <FormLabel htmlFor={name}>{label}</FormLabel>}
      <InputGroup>
        {leftElement && <InputLeftElement children={leftElement} />}
        <Input type="text" name={name} ref={register} {...props} bg="dark.700" focusBorderColor="purple.300" />
        {rightElement && <InputRightElement children={rightElement} />}
      </InputGroup>
      {helperText && !errors[name] && <FormHelperText>{helperText}</FormHelperText>}
      <FormErrorMessage>
        {errors[name] && errors[name].message}
      </FormErrorMessage>
    </FormControl>
  );
};
