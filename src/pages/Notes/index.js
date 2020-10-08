import React from "react";

import {
  Box,
  Stack,
} from "@chakra-ui/core";

import {
  NoteCard,
} from "../../components";

export const NotesPage = () => {
  return (
    <Stack spacing={4} marginTop="3" borderRadius="4px" overflowY="auto" maxH="calc(100vh - 1.5rem)" pr="1">
      <Box>
        <NoteCard  />
      </Box>
    </Stack>
  );
};
