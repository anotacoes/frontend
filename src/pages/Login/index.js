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
  Link as ChakraLink,
  Heading,
  Text,
} from "@chakra-ui/core";

import {
  Form,
  PrimaryButton,
  TextField,
} from "../../components";

const loginFormSchema = yup.object().shape({
  username: yup.string()
    .max(20, "Usuário deve conter até 20 caracteres")
    .required("Informe o usuário"),
  password: yup.string()
    .max(20, "Senha deve conter até 20 caracteres")
    .required("Informe a senha"),
});

const LoginForm = () => {
  const history = useHistory();

  const form = useForm({
    resolver: yupResolver(loginFormSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  return (
    <Form {...form} onSubmit={console.log}>
      <Heading pb="5">Login</Heading>

      <TextField name="username" label="Usuário" containerProps={{ pb: "3" }} />

      <TextField type="password" name="password" label="Senha" containerProps={{ pb: "8" }} />

      <Box>
        <PrimaryButton type="submit" isFullWidth h="50px" mb="3" onClick={() => history.push("/home")}>Entrar</PrimaryButton>
        <Text fontSize="sm" textAlign="center">
          Ainda não possui uma conta? <ChakraLink href="#" fontWeight="500" as={Link} to="/register">Cadastre-se</ChakraLink>
        </Text>
      </Box>
    </Form>
  );
};

export const LoginPage = () => (
  <Flex justify="center" bg="dark.900" align="center" minH="100vh" p="5">
    <Box p="8" bg="dark.800" borderRadius="4px" width={{ sm: "400px", base: "100%" }}>
      <LoginForm />
    </Box>
  </Flex>
);
