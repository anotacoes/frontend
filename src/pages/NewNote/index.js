import React from "react";

import {
  Button,
  Box,
  Divider,
  Heading,
  Stack,
} from "@chakra-ui/core";

import Grid from "@bit/mui-org.material-ui.grid";

import { useForm } from "react-hook-form";

import { yupResolver } from "@hookform/resolvers";

import * as yup from "yup";

import {
  Card,
  CreatableSelectField,
  DateField,
  Form,
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
  );
};
