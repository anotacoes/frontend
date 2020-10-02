import React from "react";

import { Link } from "react-router-dom";

import {
  Divider,
  Box,
  Heading,
  Text,
  Stack,
} from "@chakra-ui/core";

import Grid from "@bit/mui-org.material-ui.grid";

import {
  FaBook,
  FaHome,
  FaPencilAlt,
  FaRegCalendarAlt,
  FaRegComment,
  FaSignOutAlt,
} from "react-icons/fa";

import {
  Card,
  CommentCard,
  Menu,
  MenuDivider,
  MenuItemLink,
  PrimaryButton,
} from "../../components";

export const CommentsPage = () => {
  return (
    <Box bg="dark.900" minH="100vh" px={{ base: "3", lg: "175px"}}>
      <Grid container spacing={3}>
        <Grid item xs={3}>
          <Stack spacing={4} pt="3">
            <Box>
              <PrimaryButton type="submit" isFullWidth size="lg">Nova Anotação</PrimaryButton>

              <Divider my="3" />

              <Card>
                <Heading size="lg" pb="1">
                  Vinicius Meneses
                </Heading>
                <Text color="dark.200" textOverflow="ellipsis" overflow="hidden">vinicius.meneses04@gmail.com</Text>
              </Card>
            </Box>

            <Card px="0" py="2">
              <Menu>
                <MenuItemLink icon={FaHome} as={Link} to="/home">Início</MenuItemLink>
                <MenuItemLink icon={FaPencilAlt} as={Link} to="/notes">Minhas Anotações</MenuItemLink>
                <MenuItemLink active icon={FaRegComment}>Meus Comentários</MenuItemLink>
                <MenuItemLink icon={FaRegCalendarAlt} as={Link} to="/events">Gerenciar Eventos</MenuItemLink>
                <MenuItemLink icon={FaBook} as={Link} to="/talks">Gerenciar Palestras</MenuItemLink>
                <MenuDivider />
                <MenuItemLink icon={FaSignOutAlt} as={Link} to="/">Sair</MenuItemLink>
              </Menu>
            </Card>
          </Stack>
        </Grid>

        <Grid item xs={9}>
          <Stack spacing={4} marginTop="3" borderRadius="4px" overflowY="auto" maxH="calc(100vh - 1.5rem)" pr="1">
            <Box>
              <CommentCard footer />
            </Box>

            <Box>
              <CommentCard footer />
            </Box>
          </Stack>
        </Grid>
      </Grid>
    </Box>
  );
};
