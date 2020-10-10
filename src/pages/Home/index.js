import React, { useEffect } from "react";

// import { useForm } from "react-hook-form";

// import { yupResolver } from "@hookform/resolvers";

// import * as yup from "yup";

import useAxios from "axios-hooks";

import {
  Box,
  Flex,
  Spinner,
  Text,
} from "@chakra-ui/core";

// import { FaSearch } from "react-icons/fa";

import {
  // Card,
  CardList,
  // Form,
  NoteCard,
  // TextField,
} from "../../components";

// const searchFormSchema = yup.object().shape({
//   search: yup.string(),
// });

export const HomePage = () => {
  // const searchForm = useForm({
  //   resolver: yupResolver(searchFormSchema),
  //   defaultValues: { search: "" },
  // });

  const [{ data: notes = [], loading }, refetchNotes] = useAxios("/anotacoes");

  useEffect(() => {
    refetchNotes();
  }, [refetchNotes]);

  return (
    <CardList>
      {/* <Card>
        <Form {...searchForm} onSubmit={console.log}>
          <TextField name="search" placeholder="Pesquisar anotações..." leftElement={<Box as={FaSearch} color="dark.300" />} disabled />
        </Form>
      </Card> */}

      {loading ? (
        <Flex justify="center" alignItems="center" w="100%" height="100px">
          <Spinner size="xl" color="purple.300" />
        </Flex>
      ) : notes.length === 0 ? (
        <Flex justify="center" align="center" pt="3">
          <Text as="span" fontSize="lg" color="dark.300" fontWeight="500">Nenhuma anotação encontrada =(</Text>
        </Flex>
      ) : notes.map(note => (
        <Box key={note.id}>
          <NoteCard {...note} />
        </Box>
      ))}
    </CardList>
  );
};
