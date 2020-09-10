import React from "react";

import { Button } from "@chakra-ui/core";

const pseudoStyles = { bg: "purple.400" };

export const PrimaryButton = props => (
  <Button
    bg="purple.300"
    _hover={pseudoStyles}
    _active={pseudoStyles}
    {...props}
  />
);
