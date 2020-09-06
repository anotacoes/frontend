import React from "react";

import { Link } from "react-router-dom";

import { useForm } from "react-hook-form";

import { yupResolver } from "@hookform/resolvers";

import * as yup from "yup";

import {
  Box,
  Button,
  Flex,
  Link as ChakraLink,
  Heading,
  Text,
} from "@chakra-ui/core";

import {
  Form,
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

      <Flex align="center" direction="column">
        <Button type="submit" isFullWidth h="50px" variantColor="green" mb="3">Entrar</Button>
        <Text fontSize="sm">
          Ainda não possui uma conta? <ChakraLink href="#" fontWeight="500" as={Link} to="/register">Cadastre-se</ChakraLink>
        </Text>
      </Flex>
    </Form>
  );
};

export const LoginPage = () => (
  <Flex justify="center" align="center" bg="gray.400" minH="100vh" px="5">
    <Box p="8" bg="white" borderRadius="5px" width={{ sm: "400px", base: "100%" }}>
      <LoginForm />
    </Box>
  </Flex>
);
