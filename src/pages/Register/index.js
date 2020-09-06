import React from "react";

import { Link } from "react-router-dom";

import { useForm } from "react-hook-form";

import { yupResolver } from "@hookform/resolvers";

import * as yup from "yup";

import {
  Box,
  Button,
  Flex,
  Heading,
  Link as ChakraLink,
  Text,
} from "@chakra-ui/core";

import {
  Form,
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

      <Flex align="center" direction="column">
        <Button type="submit" isFullWidth h="50px" variantColor="blue" mb="3">Cadastrar</Button>
        <Text fontSize="sm">
          Já possui uma conta? <ChakraLink href="#" fontWeight="500" as={Link} to="/">Faça o login</ChakraLink>
        </Text>
      </Flex>
    </Form>
  );
};


export const RegisterPage = () => (
  <Flex justify="center" align="center" bg="gray.400" minH="100vh" px="5">
    <Box p="8" bg="white" borderRadius="5px" width={{ sm: "400px", base: "100%" }}>
      <RegisterForm />
    </Box>
  </Flex>
);
