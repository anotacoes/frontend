import React from "react";

import { Link } from "react-router-dom";

import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Heading,
  Link as ChakraLink,
  Text,
} from "@chakra-ui/core";

const RegisterPage = () => (
  <Flex justify="center" align="center" bg="gray.400" minH="100vh" px="5">
    <Box p="8" bg="white" borderRadius="5px" width={{ sm: "400px", base: "100%" }}>
      <Heading pb="5">Cadastro</Heading>

      <FormControl pb="3">
        <FormLabel htmlFor="name">Nome</FormLabel>
        <Input type="text" id="name" />
      </FormControl>

      <FormControl pb="3">
        <FormLabel htmlFor="user">Usuário</FormLabel>
        <Input type="text" id="user" />
      </FormControl>

      <FormControl pb="3">
        <FormLabel htmlFor="email">E-mail</FormLabel>
        <Input type="email" id="email" />
      </FormControl>

      <FormControl pb="8">
        <FormLabel htmlFor="password">Senha</FormLabel>
        <Input type="password" id="password" />
      </FormControl>

      <Flex align="center" direction="column">
        <Button isFullWidth h="50px" variantColor="blue" mb="3">Cadastrar</Button>
        <Text fontSize="sm">
          Já possui uma conta? <ChakraLink href="#" fontWeight="500" as={Link} to="/">Faça o login</ChakraLink>
        </Text>
      </Flex>
    </Box>
  </Flex>
);

export default RegisterPage;
