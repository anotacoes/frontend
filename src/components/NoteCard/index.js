import React from "react";

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
  Card,
  CommentCard,
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
            <Box>
              <CommentCard />
            </Box>

            <Box>
              <CommentCard />
            </Box>

            <Box>
              <CommentCard />
            </Box>

            <Box>
              <CommentCard />
            </Box>
          </Stack>
        </ModalBody>

        <ModalFooter>
          <Box w="100%">
            <Form {...commentForm} onSubmit={console.log}>
              <Grid container spacing={1}>
                <Grid item xs={10}>
                  <TextField name="text" placeholder="Comentar..." />
                </Grid>

                <Grid item xs={2}>
                  <PrimaryIconButton type="submit" icon={FaArrowRight} w="100%" />
                </Grid>
              </Grid>
            </Form>
          </Box>
        </ModalFooter>
      </ModalContent>
    </>
  );
};

const NoteCardHeader = () => (
  <Flex justify="space-between">
    <Flex>
      <Text as="span" fontSize="sm" fontWeight="500">Conceitos do NodeJS</Text>
      <Text as="span" fontSize="sm" color="dark.300" verticalAlign="middle" mx="1">•</Text>
      <Text as="span" fontSize="sm" color="dark.300" fontWeight="500">Next-Level Week</Text>
      <Text as="span" fontSize="sm" color="dark.300" verticalAlign="middle" mx="1">•</Text>
      <Text as="span" fontSize="sm" color="dark.300" fontWeight="500">Escrito por Vinicius Meneses</Text>
    </Flex>

    <Flex>
      <Text as="span" fontSize="sm" fontWeight="500">08/09/2020</Text>
    </Flex>
  </Flex>
);

export const NoteCard = () => {
  const commentsModal = useDisclosure();

  return (
    <Card>
      <NoteCardHeader />
      <Divider />
      <Text>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque et euismod neque. Duis id urna at massa tempor malesuada. Nunc et bibendum ligula. Phasellus non iaculis nisi, congue cursus lacus. Curabitur facilisis porta sapien quis hendrerit. Interdum et malesuada fames ac ante ipsum primis in faucibus. Nam feugiat augue id lorem posuere, vel efficitur sapien volutpat. Suspendisse ultrices, est non pretium placerat, dolor dui ornare nisi, non eleifend quam eros ac lacus.
        Fusce eget porta magna, at luctus ex. Vivamus nec nibh tempor, porta odio ac, finibus leo. Sed laoreet at velit eget pulvinar. In hac habitasse platea dictumst. Ut tempor leo ipsum, id convallis mi bibendum a. Sed ornare imperdiet tellus id porta. Sed fringilla ipsum nec aliquam euismod. Nullam vulputate lorem vel massa elementum efficitur. Donec vel dolor et massa euismod consectetur quis a massa. Donec feugiat elit at tortor fermentum ultrices. Vestibulum auctor dui eget porttitor ultricies. Praesent dapibus risus ac sem rhoncus placerat. Nunc vitae nibh neque. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Proin rhoncus feugiat nibh ac suscipit. Proin venenatis nunc ligula, a hendrerit odio congue quis.
      </Text>
      <Flex pt="3">
        <Button size="xs" variant="outline" variantColor="purple" leftIcon={FaChevronUp} mr="2">
          28 Upvotes
        </Button>

        <Button size="xs" variant="outline" variantColor="purple" leftIcon={FaChevronDown} mr="2">
          3 Downvotes
        </Button>

        <Button size="xs" variant="outline" variantColor="purple" leftIcon={FaRegComment} onClick={commentsModal.onOpen}>
          5 Comentários
        </Button>

        <Modal isCentered {...commentsModal} p="3" size="xl">
          <CommentsModal />
        </Modal>
      </Flex>
    </Card>
  );
};
