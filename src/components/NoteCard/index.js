import React, { useMemo } from "react";

import {
  Box,
  Button,
  Divider,
  Flex,
  Modal,
  ModalBody,
  ModalContent,
  ModalCloseButton,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Stack,
  Text,
  useDisclosure,
} from "@chakra-ui/core";

import {
  FaArrowRight,
  FaChevronDown,
  FaChevronUp,
  FaRegComment,
} from "react-icons/fa";

import Grid from "@bit/mui-org.material-ui.grid";

import { useForm } from "react-hook-form";

import { yupResolver } from "@hookform/resolvers";

import * as yup from "yup";

import {
  pathOr,
} from "ramda";

import {
  Card,
  Form,
  PrimaryIconButton,
  TextField,
} from "..";

const commentFormSchema = yup.object().shape({
  text: yup.string().required("Digite um comentário"),
});

export const CommentsModal = () => {
  const commentForm = useForm({
    resolver: yupResolver(commentFormSchema),
    defaultValues: { text: "" },
  });

  return (
    <>
      <ModalOverlay />
      <ModalContent bg="dark.900" borderRadius="4px" maxH="calc(100vh - 1.5rem)" my="3">
        <ModalHeader>Comentários</ModalHeader>
        <ModalCloseButton />
        <ModalBody overflowY="scroll">
          <Stack spacing={3}>
            <Flex align="center">
              <Text as="span" fontSize="sm" color="dark.300" fontWeight="500">Nenhum comentário encontrado =(</Text>
            </Flex>
          </Stack>
        </ModalBody>

        <ModalFooter>
          <Box w="100%">
            <Form {...commentForm} onSubmit={console.log}>
              <Grid container spacing={1}>
                <Grid item xs={10}>
                  <TextField name="text" placeholder="Comentar..." disabled />
                </Grid>

                <Grid item xs={2}>
                  <PrimaryIconButton type="submit" icon={FaArrowRight} w="100%" disabled />
                </Grid>
              </Grid>
            </Form>
          </Box>
        </ModalFooter>
      </ModalContent>
    </>
  );
};

const NoteHeader = ({ conta, palestra, evento }) => (
  <Flex>
    <Text as="span" fontSize="sm" fontWeight="500">{palestra.nome}</Text>
    <Text as="span" fontSize="sm" color="dark.300" verticalAlign="middle" mx="1">•</Text>
    <Text as="span" fontSize="sm" color="dark.300" fontWeight="500">{evento.nome}</Text>
    <Text as="span" fontSize="sm" color="dark.300" verticalAlign="middle" mx="1">•</Text>
    <Text as="span" fontSize="sm" color="dark.300" fontWeight="500">Escrito por {conta.nome}</Text>
  </Flex>
);

export const NoteCard = ({ texto, ...props }) => {
  const commentsModal = useDisclosure();

  const evento = useMemo(() => pathOr({}, ["palestra", "evento"], props), [props]);

  return (
    <Card>
      <NoteHeader {...props} evento={evento}  />
      <Divider />
      <Text>{texto}</Text>
      <Flex pt="3">
        <Button size="xs" variant="outline" variantColor="purple" leftIcon={FaChevronUp} mr="2" disabled>
          0 Upvotes
        </Button>

        <Button size="xs" variant="outline" variantColor="purple" leftIcon={FaChevronDown} mr="2" disabled>
          0 Downvotes
        </Button>

        <Button size="xs" variant="outline" variantColor="purple" leftIcon={FaRegComment} onClick={commentsModal.onOpen}>
          0 Comentários
        </Button>

        <Modal isCentered {...commentsModal} p="3" size="xl">
          <CommentsModal />
        </Modal>
      </Flex>
    </Card>
  );
};
