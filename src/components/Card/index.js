import React from "react";

import { Box } from "@chakra-ui/core";

export const Card = props => (
  <Box
    p="4"
    bg="dark.800"
    borderRadius="4px"
    {...props}
  />
);
