import React from "react";

import { Link } from "react-router-dom";

import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Link as ChakraLink,
  Heading,
  Text,
} from "@chakra-ui/core";

const LoginPage = () => (
  <Flex justify="center" align="center" bg="gray.400" minH="100vh" px="5">
    <Box p="8" bg="white" borderRadius="5px" width={{ sm: "400px", base: "100%" }}>
      <Heading pb="5">Login</Heading>

      <FormControl pb="3">
        <FormLabel htmlFor="user">Usuário</FormLabel>
        <Input type="text" id="user" />
      </FormControl>

      <FormControl pb="8">
        <FormLabel htmlFor="password">Senha</FormLabel>
        <Input type="password" id="password" />
      </FormControl>

      <Flex align="center" direction="column">
        <Button isFullWidth h="50px" variantColor="green" mb="3">Entrar</Button>
        <Text fontSize="sm">
          Ainda não possui uma conta? <ChakraLink href="#" fontWeight="500" as={Link} to="/register">Cadastre-se</ChakraLink>
        </Text>
      </Flex>
    </Box>
  </Flex>
);

export default LoginPage;
