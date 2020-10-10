import React from "react";

import {
  Flex,
  Text,
} from "@chakra-ui/core";

import {
  CardList,
} from "../../components";

export const CommentsPage = () => {
  return (
    <CardList>
      <Flex justify="center" align="center" pt="3">
        <Text as="span" fontSize="lg" color="dark.300" fontWeight="500">Nenhum comentário encontrado =(</Text>
      </Flex>
    </CardList>
  );
};
