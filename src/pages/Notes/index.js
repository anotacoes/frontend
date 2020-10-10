import React, { useEffect } from "react";

import useAxios from "axios-hooks";

import {
  Box,
  Flex,
  Spinner,
  Text,
} from "@chakra-ui/core";

import {
  CardList,
  NoteCard,
} from "../../components";

import { useCurrentUser } from "../../model";

export const NotesPage = () => {
  const { currentUser } = useCurrentUser();

  const [{ data: notes = [], loading }, refetchNotes] = useAxios(`/contas/${currentUser.id}/anotacoes`);

  useEffect(() => {
    refetchNotes();
  }, [refetchNotes]);

  if (loading) {
    return (
      <Flex justify="center" alignItems="center" w="100%" height="100px">
        <Spinner size="xl" color="purple.300" />
      </Flex>
    );
  }

  return (
    <CardList>
      {loading ? (
        <Flex justify="center" alignItems="center" w="100%" height="100px">
          <Spinner size="xl" color="purple.300" />
        </Flex>
      ) : notes.length === 0 ? (
        <Flex justify="center" align="center" pt="3">
          <Text as="span" fontSize="lg" color="dark.300" fontWeight="500">Nenhuma anotação encontrada  =(</Text>
        </Flex>
      ) : notes.map(note => (
        <Box key={note.id}>
          <NoteCard {...note} />
        </Box>
      ))}
    </CardList>
  );
};
