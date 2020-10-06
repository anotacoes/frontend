import React, { useCallback } from "react";

import {
  Link,
  useHistory,
} from "react-router-dom";

import useAxios from "axios-hooks";

import { useForm } from "react-hook-form";

import { yupResolver } from "@hookform/resolvers";

import * as yup from "yup";

import {
  Box,
  Flex,
  Link as ChakraLink,
  Heading,
  Text,
} from "@chakra-ui/core";

import { prop } from "ramda";

import {
  Card,
  Form,
  PrimaryButton,
  TextField,
} from "../../components";

import { useCurrentUser } from "../../model/auth";

const loginFormSchema = yup.object().shape({
  login: yup.string()
    .max(20, "Usuário deve conter até 20 caracteres")
    .required("Informe o usuário"),
  senha: yup.string()
    .max(20, "Senha deve conter até 20 caracteres")
    .required("Informe a senha"),
});

const LoginForm = () => {
  const history = useHistory();
  const [_, setCurrentUser] = useCurrentUser();

  const form = useForm({
    resolver: yupResolver(loginFormSchema),
    defaultValues: {
      login: "",
      senha: "",
    },
  });

  const { setError } = form;

  const [{ loading }, login] = useAxios(
    { url: "/contas/login", method: "POST" },
    { manual: true },
  );

  const onLogin = useCallback(data =>
    login({ data })
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
  , [login, setCurrentUser, history, setError]);

  return (
    <Form {...form} onSubmit={onLogin}>
      <Heading pb="5">Login</Heading>

      <Box pb="3">
        <TextField name="login" label="Usuário" />
      </Box>

      <Box pb="8">
        <TextField type="password" name="senha" label="Senha" />
      </Box>

      <Box>
        <PrimaryButton type="submit" isFullWidth h="50px" mb="3" isLoading={loading}>Entrar</PrimaryButton>
        <Text fontSize="sm" textAlign="center">
          Ainda não possui uma conta? <ChakraLink fontWeight="500" as={Link} to="/register">Cadastre-se</ChakraLink>
        </Text>
      </Box>
    </Form>
  );
};

export const LoginPage = () => (
  <Flex justify="center" bg="dark.900" align="center" minH="100vh" p="5">
    <Card p="8" width={{ sm: "400px", base: "100%" }}>
      <LoginForm />
    </Card>
  </Flex>
);
