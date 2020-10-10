import React, { useMemo } from "react";

import {
  Box,
  Button,
  Divider,
  Editable,
  EditableInput,
  EditablePreview,
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
  FaCheck,
  FaChevronDown,
  FaChevronUp,
  FaEdit,
  FaRegComment,
  FaTrash,
  FaTimes,
} from "react-icons/fa";

import Grid from "@bit/mui-org.material-ui.grid";

import { useForm } from "react-hook-form";

import { yupResolver } from "@hookform/resolvers";

import * as yup from "yup";

import {
  pathOr,
  propOr,
} from "ramda";

import {
  CancelButton,
  Card,
  DangerButton,
  Form,
  PrimaryIconButton,
  TextField,
} from "..";

import { formatDate } from "../../utils";

import { useCurrentUser } from "../../model";

const commentFormSchema = yup.object().shape({
  text: yup.string().required("Digite um comentário"),
});

const NoteHeader = ({ conta, palestra, evento }) => (
  <Flex justify="space-between">
    <Flex>
      <Text as="span" fontSize="sm" fontWeight="500">{palestra.nome}</Text>
      <Text as="span" fontSize="sm" color="dark.300" verticalAlign="middle" mx="1">•</Text>
      <Text as="span" fontSize="sm" color="dark.300" fontWeight="500">{evento.nome}</Text>
      <Text as="span" fontSize="sm" color="dark.300" verticalAlign="middle" mx="1">•</Text>
      <Text as="span" fontSize="sm" color="dark.300" fontWeight="500">Escrito por {conta.nome}</Text>
    </Flex>

    <Flex>
      <Text as="span" fontSize="sm" fontWeight="500">{formatDate(palestra.data)}</Text>
    </Flex>
  </Flex>
);

const EditableTextControls = ({ isEditing, onSubmit, onCancel, onRequestEdit }) =>
  isEditing ? (
    <>
      <Button size="xs" variant="outline" variantColor="purple" leftIcon={FaTimes} mr="2" onClick={onCancel}>
        Cancelar
      </Button>

      <Button size="xs" variant="outline" variantColor="purple" leftIcon={FaCheck} mr="2" onClick={onSubmit} isDisabled>
        Salvar
      </Button>
    </>
  ) : (
    <Button size="xs" variant="outline" variantColor="purple" leftIcon={FaEdit} mr="2" onClick={onRequestEdit}>
      Editar
    </Button>
  );

export const NoteCard = ({ texto, ...props }) => {
  const { currentUser } = useCurrentUser();

  const commentsModal = useDisclosure();
  const deleteModal = useDisclosure();

  const commentForm = useForm({
    resolver: yupResolver(commentFormSchema),
    defaultValues: { text: "" },
  });

  const conta = useMemo(() => propOr({}, "conta", props), [props]);
  const evento = useMemo(() => pathOr({}, ["palestra", "evento"], props), [props]);

  return (
    <Card>
      <Editable
        defaultValue={texto}
        isPreviewFocusable={false}
        submitOnBlur={false}
        placeholder="Digite o texto da anotação..."
      >
        {editableProps => (
          <>
            <NoteHeader {...props} evento={evento}  />
            <Divider />

            <EditablePreview />
            <EditableInput />

            <Flex pt="3">
              <Button size="xs" variant="outline" variantColor="purple" leftIcon={FaChevronUp} mr="2" disabled>
                0 Upvotes
              </Button>

              <Button size="xs" variant="outline" variantColor="purple" leftIcon={FaChevronDown} mr="2" disabled>
                0 Downvotes
              </Button>

              <Button size="xs" variant="outline" variantColor="purple" leftIcon={FaRegComment} mr="2" onClick={commentsModal.onOpen}>
                0 Comentários
              </Button>

              {conta.id === currentUser.id && (
                <>
                  <EditableTextControls {...editableProps} />

                  <Button size="xs" variant="outline" variantColor="purple" leftIcon={FaTrash} onClick={deleteModal.onOpen}>
                    Excluir
                  </Button>

                  <Modal isCentered {...deleteModal} p="3" size="xl">
                    <ModalOverlay />
                    <ModalContent bg="dark.900" borderRadius="4px" maxH="calc(100vh - 1.5rem)" my="3">
                      <ModalHeader>Remover Anotação</ModalHeader>

                      <ModalBody>
                        Você tem certeza que deseja remover essa anotação?
                      </ModalBody>

                      <ModalFooter>
                        <CancelButton onClick={deleteModal.onClose}>
                          Cancelar
                        </CancelButton>

                        <DangerButton disabled ml="2">
                          Remover
                        </DangerButton>
                      </ModalFooter>
                    </ModalContent>
                  </Modal>
                </>
              )}

              <Modal isCentered {...commentsModal} p="3" size="xl">
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
              </Modal>
            </Flex>
          </>
        )}
      </Editable>
    </Card>
  );
};
