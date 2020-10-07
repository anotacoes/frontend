import React from "react";

import { Alert } from "@chakra-ui/core";

import { ErrorMessage } from "@hookform/error-message";

export const BaseFormError = props => (
  <ErrorMessage
    name="base"
    render={({ message }) => (
      <Alert status="error" borderRadius="4px" variant="left-accent" {...props}>
        {message}
      </Alert>
    )}
  />
);
