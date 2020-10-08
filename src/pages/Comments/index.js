import React from "react";

import {
  Box,
  Stack,
} from "@chakra-ui/core";

import {
  CommentCard,
} from "../../components";

export const CommentsPage = () => {
  return (
    <Stack spacing={4} marginTop="3" borderRadius="4px" overflowY="auto" maxH="calc(100vh - 1.5rem)" pr="1">
      <Box>
        <CommentCard footer />
      </Box>

      <Box>
        <CommentCard footer />
      </Box>
    </Stack>
  );
};
