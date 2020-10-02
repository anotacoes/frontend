import React from "react";

import {
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Textarea,
} from "@chakra-ui/core";

import {
  useFormContext,
} from "react-hook-form";

export const TextareaField = ({
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
        <Textarea resize="none" h="auto" rows={10} name={name} ref={register} {...props} bg="dark.700" focusBorderColor="purple.300" />
        {rightElement && <InputRightElement children={rightElement} />}
      </InputGroup>
      {helperText && !errors[name] && <FormHelperText>{helperText}</FormHelperText>}
      <FormErrorMessage>
        {errors[name] && errors[name].message}
      </FormErrorMessage>
    </FormControl>
  );
};
