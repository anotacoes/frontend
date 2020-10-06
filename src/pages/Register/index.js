import React, { useCallback } from "react";

import {
  Link,
  useHistory,
} from "react-router-dom";

import { prop } from "ramda";

import { useForm } from "react-hook-form";

import { yupResolver } from "@hookform/resolvers";

import useAxios from "axios-hooks";

import * as yup from "yup";

import {
  Box,
  Flex,
  Heading,
  Link as ChakraLink,
  Text,
} from "@chakra-ui/core";

import {
  Card,
  Form,
  PrimaryButton,
  TextField,
} from "../../components";

import { useCurrentUser } from "../../model";

const registerFormSchema = yup.object().shape({
  nome: yup.string()
    .max(60, "Nome deve conter até 60 caracteres")
    .required("Informe o nome completo"),
  email: yup.string()
    .email("E-mail inválido")
    .required("Informe o e-mail"),
  login: yup.string()
    .max(20, "Usuário deve conter até 20 caracteres")
    .required("Informe o usuário"),
  senha: yup.string()
    .max(20, "Senha deve conter até 20 caracteres")
    .required("Informe a senha"),
});

const RegisterForm = () => {
  const [_, setCurrentUser] = useCurrentUser();
  const history = useHistory();

  const form = useForm({
    resolver: yupResolver(registerFormSchema),
    defaultValues: {
      nome: "",
      email: "",
      login: "",
      senha: "",
    },
  });

  const { setError } = form;

  const [{ loading }, register] = useAxios(
    { url: "/contas", method: "POST" },
    { manual: true },
  );

  const onRegister = useCallback(data =>
    register({ data })
      .then(prop("data"))
      .then(setCurrentUser)
      .then(() => history.replace("/home"))
      .catch(({ response }) => {
        if (prop("status", response) === 404) {
          setError("login", { message: "Usuário incorreto" });
        } else {
          setError("senha", { message: "Senha incorreta" });
        }
      })
  , [register, setCurrentUser, history, setError]);


  return (
    <Form {...form} onSubmit={onRegister}>
      <Heading pb="5">Cadastro</Heading>

      <Box pb="3">
        <TextField name="nome" label="Nome" />
      </Box>

      <Box pb="3">
        <TextField type="email" name="email" label="E-mail" />
      </Box>

      <Box pb="3">
        <TextField name="login" label="Usuário" />
      </Box>

      <Box pb="8">
        <TextField type="password" name="senha" label="Senha" />
      </Box>

      <Box>
        <PrimaryButton type="submit" isFullWidth h="50px" mb="3" isLoading={loading}>Cadastrar</PrimaryButton>
        <Text fontSize="sm" textAlign="center">
          Já possui uma conta? <ChakraLink fontWeight="500" as={Link} to="/">Faça o login</ChakraLink>
        </Text>
      </Box>
    </Form>
  );
};


export const RegisterPage = () => (
  <Flex justify="center" align="center" bg="dark.900" minH="100vh" p="5">
    <Card p="8" width={{ sm: "400px", base: "100%" }}>
      <RegisterForm />
    </Card>
  </Flex>
);
