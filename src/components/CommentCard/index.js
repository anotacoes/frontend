import React from "react";

import {
  Box,
  Button,
  Flex,
  Text,
} from "@chakra-ui/core";

import {
  FaEdit,
  FaPencilAlt,
  FaTrash,
} from "react-icons/fa";

import {
  Card,
} from "..";

export const CommentCard = ({ footer = false }) => (
  <Card pt="2" pb="3">
    <Box>
      <Text as="span" fontSize="sm" fontWeight="500" color="dark.300">Vinicius Meneses</Text>
    </Box>
    <Text>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque et euismod neque. Duis id urna at massa tempor malesuada. Nunc et bibendum ligula. Phasellus non iaculis nisi, congue cursus lacus. Curabitur facilisis porta sapien quis hendrerit. Interdum et malesuada fames ac ante ipsum primis in faucibus. Nam feugiat augue id lorem posuere, vel efficitur sapien volutpat.
    </Text>
    {footer && (
      <Flex pt="3">
        <Button size="xs" variant="outline" variantColor="purple" leftIcon={FaPencilAlt} mr="2">
          Visualizar Anotação
        </Button>

        <Button size="xs" variant="outline" variantColor="purple" leftIcon={FaEdit} mr="2">
          Editar
        </Button>

        <Button size="xs" variant="outline" variantColor="purple" leftIcon={FaTrash}>
          Excluir
        </Button>
      </Flex>
    )}
  </Card>
);
