import React, { useEffect } from "react";

import { useForm } from "react-hook-form";

import { yupResolver } from "@hookform/resolvers";

import * as yup from "yup";

import useAxios from "axios-hooks";

import {
  Box,
  Flex,
  Spinner,
  Stack,
} from "@chakra-ui/core";

import { FaSearch } from "react-icons/fa";

import {
  Card,
  Form,
  NoteCard,
  TextField,
} from "../../components";

const searchFormSchema = yup.object().shape({
  search: yup.string(),
});

export const HomePage = () => {
  const searchForm = useForm({
    resolver: yupResolver(searchFormSchema),
    defaultValues: { search: "" },
  });

  const [{ data: notes = [], loading }, refetchNotes] = useAxios("/anotacoes");

  useEffect(() => {
    refetchNotes();
  }, [refetchNotes]);

  return (
    <Stack spacing={4} marginTop="3" borderRadius="4px" overflowY="auto" maxH="calc(100vh - 1.5rem)" pr="1">
      <Card>
        <Form {...searchForm} onSubmit={console.log}>
          <TextField name="search" placeholder="Pesquisar anotações..." leftElement={<Box as={FaSearch} color="dark.300" />} disabled />
        </Form>
      </Card>

      {loading ? (
        <Flex justify="center" alignItems="center" w="100%" height="100px">
          <Spinner size="xl" color="purple.300" />
        </Flex>
      ) : notes.map(({ id, ...note }) => (
        <Box key={id}>
          <NoteCard {...note} />
        </Box>
      ))}
    </Stack>
  );
};
