import React from "react";

import { Link } from "react-router-dom";

import {
  Button,
  Box,
  Divider,
  Heading,
  Text,
  Stack,
} from "@chakra-ui/core";

import Grid from "@bit/mui-org.material-ui.grid";

import {
  FaBook,
  FaHome,
  FaPencilAlt,
  FaRegCalendarAlt,
  FaRegComment,
  FaSignOutAlt,
} from "react-icons/fa";

import { useForm } from "react-hook-form";

import { yupResolver } from "@hookform/resolvers";

import * as yup from "yup";

import {
  Card,
  CreatableSelectField,
  DateField,
  Form,
  Menu,
  MenuDivider,
  MenuItemLink,
  PrimaryButton,
  TextareaField,
  TextField,
} from "../../components";;

const pseudoButtonStyles = { bg: "dark.700" };

export const CancelButton = props => (
  <Button
    bg="dark.600"
    _hover={pseudoButtonStyles}
    _active={pseudoButtonStyles}
    {...props}
  />
);

const registerFormSchema = yup.object().shape({
  name: yup.string()
    .max(60, "Nome deve conter até 60 caracteres")
    .required("Informe o nome completo"),
  date: yup.date(),
});

export const NewNotePage = () => {
  const form = useForm({
    resolver: yupResolver(registerFormSchema),
    defaultValues: {
      name: "",
      date: new Date(),
    },
  });

  return (
    <Box bg="dark.900" minH="100vh" px={{ base: "3", lg: "175px"}}>
      <Grid container spacing={3}>
        <Grid item xs={3}>
          <Stack spacing={4} pt="3">
            <Box>
              <Card>
                <Heading size="lg" pb="1">
                  Vinicius Meneses
                </Heading>
                <Text color="dark.200" textOverflow="ellipsis" overflow="hidden">vinicius.meneses04@gmail.com</Text>
              </Card>
            </Box>

            <Card px="0" py="2">
              <Menu>
                <MenuItemLink icon={FaHome} as={Link} to="/home">Início</MenuItemLink>
                <MenuItemLink icon={FaPencilAlt} as={Link} to="/notes">Minhas Anotações</MenuItemLink>
                <MenuItemLink icon={FaRegComment} as={Link} to="/comments">Meus Comentários</MenuItemLink>
                <MenuItemLink icon={FaRegCalendarAlt} as={Link} to="/events">Gerenciar Eventos</MenuItemLink>
                <MenuItemLink icon={FaBook} as={Link} to="/talks">Gerenciar Palestras</MenuItemLink>
                <MenuDivider />
                <MenuItemLink icon={FaSignOutAlt} as={Link} to="/">Sair</MenuItemLink>
              </Menu>
            </Card>
          </Stack>
        </Grid>

        <Grid item xs={9}>
          <Stack spacing={4} marginTop="3" borderRadius="4px" overflowY="auto" maxH="calc(100vh - 1.5rem)" pr="1">
            <Card pb="5">
              <Form {...form} onSubmit={console.log}>
                <Heading as="h2" size="md" fontWeight="600">
                  Nova Anotação
                </Heading>

                <Divider py="1" />

                <Stack pt="2" pb="2" spacing={3}>
                  <Box>
                    <TextareaField name="name" label="Digite um texto" />
                  </Box>

                  <Box pt="1">
                    <Grid container>
                      <Grid item xs={12} md={6}>
                        <Stack spacing={3} pr="4" borderRight="0.0625rem solid rgba(255, 255, 255, 0.12)">
                          <Box>
                            <CreatableSelectField name="name" label="Evento" />
                          </Box>

                          <Box>
                            <DateField name="date" label="Data inicial" />
                          </Box>

                          <Box>
                            <DateField name="name" label="Data final" />
                          </Box>
                        </Stack>
                      </Grid>

                      <Grid item xs={12} md={6}>
                        <Stack spacing={3} pl="4">
                          <Box>
                            <CreatableSelectField name="name" label="Palestra" />
                          </Box>

                          <Box>
                            <TextField name="name" label="Data" />
                          </Box>

                          <Box>
                            <TextField name="name" label="Palestrante" />
                          </Box>
                        </Stack>
                      </Grid>
                    </Grid>
                  </Box>
                </Stack>

                <Divider py="1" />

                <Box display="flex" justifyContent="flex-end" pt="4">
                  <CancelButton type="submit" h="50px" px="25px">Voltar</CancelButton>
                  <PrimaryButton type="submit" h="50px" ml="4" px="50px">Cadastrar</PrimaryButton>
                </Box>
              </Form>
            </Card>
          </Stack>
        </Grid>
      </Grid>
    </Box>
  );
};
