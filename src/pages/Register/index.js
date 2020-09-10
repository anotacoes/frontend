import React from "react";

import {
  Link,
  useHistory,
} from "react-router-dom";

import { useForm } from "react-hook-form";

import { yupResolver } from "@hookform/resolvers";

import * as yup from "yup";

import {
  Box,
  Flex,
  Heading,
  Link as ChakraLink,
  Text,
} from "@chakra-ui/core";

import {
  Form,
  PrimaryButton,
  TextField,
} from "../../components";

const registerFormSchema = yup.object().shape({
  name: yup.string()
    .max(60, "Nome deve conter até 60 caracteres")
    .required("Informe o nome completo"),
  email: yup.string()
    .email("E-mail inválido")
    .required("Informe o e-mail"),
  username: yup.string()
    .max(20, "Usuário deve conter até 20 caracteres")
    .required("Informe o usuário"),
  password: yup.string()
    .max(20, "Senha deve conter até 20 caracteres")
    .required("Informe a senha"),
});

const RegisterForm = () => {
  const history = useHistory();

  const form = useForm({
    resolver: yupResolver(registerFormSchema),
    defaultValues: {
      name: "",
      email: "",
      username: "",
      password: "",
    },
  });

  return (
    <Form {...form} onSubmit={console.log}>
      <Heading pb="5">Cadastro</Heading>

      <TextField name="name" label="Nome" containerProps={{ pb: "3" }} />

      <TextField type="email" name="email" label="E-mail" containerProps={{ pb: "3" }} />

      <TextField name="username" label="Usuário" containerProps={{ pb: "3" }} />

      <TextField type="password" name="password" label="Senha" containerProps={{ pb: "8" }} />

      <Box>
        <PrimaryButton type="submit" isFullWidth h="50px" mb="3" onClick={() => history.push("/home")}>Cadastrar</PrimaryButton>
        <Text fontSize="sm" textAlign="center">
          Já possui uma conta? <ChakraLink href="#" fontWeight="500" as={Link} to="/">Faça o login</ChakraLink>
        </Text>
      </Box>
    </Form>
  );
};


export const RegisterPage = () => (
  <Flex justify="center" align="center" bg="dark.900" minH="100vh" p="5">
    <Box p="8" bg="dark.800" borderRadius="4px" width={{ sm: "400px", base: "100%" }}>
      <RegisterForm />
    </Box>
  </Flex>
);
