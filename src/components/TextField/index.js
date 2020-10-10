import React, { useMemo } from "react";

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

import { pathFromString } from "../../utils";

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

  const fieldError = useMemo(() => pathFromString(name, errors), [name, errors]);

  return (
    <FormControl isInvalid={fieldError} {...containerProps}>
      {label && <FormLabel htmlFor={name}>{label}</FormLabel>}
      <InputGroup>
        {leftElement && <InputLeftElement children={leftElement} />}
        <Input type="text" name={name} ref={register} {...props} bg="dark.700" focusBorderColor="purple.300" />
        {rightElement && <InputRightElement children={rightElement} />}
      </InputGroup>
      {helperText && !fieldError && <FormHelperText>{helperText}</FormHelperText>}
      <FormErrorMessage>
        {fieldError && fieldError.message}
      </FormErrorMessage>
    </FormControl>
  );
};
