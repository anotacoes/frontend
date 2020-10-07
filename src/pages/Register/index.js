import React, { useCallback } from "react";

import {
  Link,
  useHistory,
} from "react-router-dom";

import {
  identity,
  propOr,
} from "ramda";

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
  BaseFormError,
  Card,
  Form,
  PrimaryButton,
  TextField,
} from "../../components";

import { useCurrentUser } from "../../model";

import { setFormErrorsFromResponse } from "../../utils";

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

const useRegisterForm = ({ onSuccess = identity, onError = identity }) => {
  const form = useForm({
    resolver: yupResolver(registerFormSchema),
    defaultValues: {
      nome: "",
      email: "",
      login: "",
      senha: "",
    },
  });

  const [{ loading: submitting }, register] = useAxios(
    { url: "/contas", method: "POST" },
    { manual: true },
  );

  const onSubmit = useCallback(async (data) => {
    try {
      const response = await register({ data });
      onSuccess(response);
    } catch (err) {
      const response = propOr({}, "response", err);
      setFormErrorsFromResponse({ response, form });
      onError(response);
    }
  }, [register, onSuccess, onError, form]);

  return {
    ...form,
    onSubmit,
    submitting,
  };
};

const RegisterForm = () => {
  const { setCurrentUser } = useCurrentUser();
  const history = useHistory();

  const onRegisterSuccess = useCallback(({ data }) => {
    setCurrentUser(data);
    history.replace("/home");
  }, [history, setCurrentUser]);

  const form = useRegisterForm({ onSuccess: onRegisterSuccess });

  return (
    <Form {...form}>
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

      <Box pb="4">
        <TextField type="password" name="senha" label="Senha" />
      </Box>

      <BaseFormError pb="4" />

      <Box pt="4">
        <PrimaryButton type="submit" isFullWidth h="50px" mb="3" isLoading={form.submitting}>Cadastrar</PrimaryButton>
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
