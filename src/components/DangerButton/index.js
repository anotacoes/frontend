import React from "react";

import { Button } from "@chakra-ui/core";

const pseudoStyles = { bg: "red.400" };

export const DangerButton = props => (
  <Button
    bg="red.300"
    _hover={pseudoStyles}
    _active={pseudoStyles}
    {...props}
  />
);
