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

import {
  identity,
  prop,
  propOr,
} from "ramda";

import {
  BaseFormError,
  Card,
  Form,
  PrimaryButton,
  TextField,
} from "../../components";

import { useCurrentUser } from "../../model/auth";

import { setFormErrorsFromResponse } from "../../utils";

const loginFormSchema = yup.object().shape({
  login: yup.string()
    .max(20, "Usuário deve conter até 20 caracteres")
    .required("Informe o usuário"),
  senha: yup.string()
    .max(20, "Senha deve conter até 20 caracteres")
    .required("Informe a senha"),
});

const useLoginForm = ({ onSuccess = identity, onError = identity }) => {
  const form = useForm({
    resolver: yupResolver(loginFormSchema),
    defaultValues: {
      login: "",
      senha: "",
    },
  });

  const [{ loading: submitting }, login] = useAxios(
    { url: "/contas/login", method: "POST" },
    { manual: true },
  );

  const onSubmit = useCallback(async (data) => {
    try {
      const response = await login({ data });
      onSuccess(response);
    } catch (err) {
      const response = propOr({}, "response", err);

      if (prop("status", response) === 404) {
        form.setError("login", { message: "Usuário incorreto" });
      } else {
        setFormErrorsFromResponse({ response, form });
      }

      onError(response);
    }
  }, [login, onSuccess, onError, form]);

  return {
    ...form,
    onSubmit,
    submitting,
  };
};

const LoginForm = () => {
  const history = useHistory();
  const { setCurrentUser } = useCurrentUser();

  const onLoginSuccess = useCallback(({ data }) => {
    setCurrentUser(data);
    history.replace("/home");
  }, [setCurrentUser, history]);

  const form = useLoginForm({ onSuccess: onLoginSuccess });

  return (
    <Form {...form}>
      <Heading pb="5">Login</Heading>

      <Box pb="3">
        <TextField name="login" label="Usuário" />
      </Box>

      <Box pb="4">
        <TextField type="password" name="senha" label="Senha" />
      </Box>

      <BaseFormError pb="4" />

      <Box pt="4">
        <PrimaryButton type="submit" isFullWidth h="50px" mb="3" isLoading={form.submitting}>Entrar</PrimaryButton>
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
