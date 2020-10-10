import React from "react";

import { Button } from "@chakra-ui/core";

const pseudoButtonStyles = { bg: "dark.700" };

export const CancelButton = props => (
  <Button
    bg="dark.600"
    _hover={pseudoButtonStyles}
    _active={pseudoButtonStyles}
    {...props}
  />
);
