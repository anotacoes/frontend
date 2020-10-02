import React from "react";

import {
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  InputGroup,
  InputLeftElement,
  InputRightElement,
} from "@chakra-ui/core";


import CreatableSelect from "react-select/creatable";

import {
  Controller,
  useFormContext,
} from "react-hook-form";

const noOptionsMessage = () => "Nenhum resultado encontrado";

const createMessage = inputValue => `Cadastrar ${inputValue}...`;

const configureTheme = theme => ({
  ...theme,
  borderRadius: "0.25rem",
  colors: {
    ...theme.colors,
    primary: "#7289da",
    primary25: "#8094dd",
    primary50: "#8094dd",
    neutral0: "#36393e",
    neutral10: "#7289da",
    neutral20: "rgba(255,255,255,0.04)",
    neutral30: "rgba(255,255,255,0.08)",
    neutral40: "#7289da",
    neutral60: "#7289da",
    neutral70: "#7289da",
    neutral80: "rgba(255, 255, 255, 0.92)",
    neutral90: "#7289da",
  },
});

const styles = {
  container: defaultStyles => ({ ...defaultStyles, width: "100%"}),
  control: defaultStyles => ({ ...defaultStyles, height: "40px", transition: "all 0.2s ease"}),
  valueContainer: defaultStyles => ({ ...defaultStyles, padding: "0 0.95rem"}),
};

export const CreatableSelectField = ({
  name,
  label,
  options,
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
          as={CreatableSelect}
          menuPosition="fixed"
          formatCreateLabel={createMessage}
          noOptionsMessage={noOptionsMessage}
          options={options}
          control={control}
          styles={styles}
          theme={configureTheme}
          placeholder=""
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
