import React from "react";

import { IconButton } from "@chakra-ui/core";

const pseudoStyles = { bg: "purple.400" };

export const PrimaryIconButton = props => (
  <IconButton
    bg="purple.300"
    _hover={pseudoStyles}
    _active={pseudoStyles}
    {...props}
  />
);
