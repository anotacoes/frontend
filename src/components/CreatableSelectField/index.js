import React, { useMemo } from "react";

import {
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  InputGroup,
} from "@chakra-ui/core";


import CreatableSelect from "react-select/creatable";

import {
  Controller,
  useFormContext,
} from "react-hook-form";

import { pathFromString } from "../../utils";

const noOptionsMessage = () => "Nenhum resultado encontrado";

const loadingMessage = () => "Carregando...";

const createMessage = inputValue => `Criar ${inputValue}...`;

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
  container: defaultStyles => ({ ...defaultStyles, width: "100%" }),
  control: (defaultStyles, { isDisabled }) => ({ ...defaultStyles, height: "40px", transition: "all 0.2s ease", ...isDisabled ? { opacity: isDisabled ? 0.4 : 1, backgroundColor: "#36393e", borderColor: null } : {} }),
  indicatorSeparator: (defaultStyles, { isDisabled }) => isDisabled ? {...defaultStyles, backgroundColor: "rgba(255,255,255,0.04)" } : defaultStyles,
  singleValue: (defaultStyles, { isDisabled }) => isDisabled ? {...defaultStyles, color: "rgba(255,255,255,0.92)" } : defaultStyles,
  valueContainer: defaultStyles => ({ ...defaultStyles, padding: "0 0.95rem" }),
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

  const fieldError = useMemo(() => pathFromString(name, errors), [name, errors]);

  return (
    <FormControl isInvalid={fieldError} {...containerProps}>
      {label && <FormLabel htmlFor={name}>{label}</FormLabel>}
      <InputGroup>
        <Controller
          name={name}
          as={CreatableSelect}
          menuPosition="fixed"
          formatCreateLabel={createMessage}
          noOptionsMessage={noOptionsMessage}
          loadingMessage={loadingMessage}
          options={options}
          control={control}
          styles={styles}
          theme={configureTheme}
          placeholder=""
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
