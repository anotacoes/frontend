import React from "react";

import { Stack } from "@chakra-ui/core";

export const CardList = props => (
  <Stack
    spacing={4}
    marginTop="3"
    borderRadius="4px"
    overflowY="auto"
    maxH="calc(100vh - 1.5rem)"
    pr="1"
    {...props}
  />
);
