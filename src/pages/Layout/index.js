import React, { useCallback } from "react";

import {
  Link,
  Route,
  Switch,
  useHistory,
  useLocation,
  useRouteMatch,
} from "react-router-dom";

import {
  Box,
  Divider,
  Flex,
  Heading,
  Link as ChakraLink,
  PseudoBox,
  Text,
  Stack,
} from "@chakra-ui/core";

import Grid from "@bit/mui-org.material-ui.grid";

import {
  FaBook,
  FaHome,
  FaPencilAlt,
  FaRegCalendarAlt,
  // FaRegComment,
  FaSignOutAlt,
} from "react-icons/fa";

import {
  Card,
  Menu,
  MenuDivider,
  MenuItemLink,
} from "../../components";

import { useCurrentUser } from "../../model";

import {
  CommentsPage,
  HomePage,
  NewNotePage,
  NotesPage,
} from "..";

const newNotesHoverStyles = { textDecoration: "none", bg: "purple.400" };

const newNotesLinkPseudoStyles = { textDecoration: "none", boxShadow: "none" };

export const LayoutPage = () => {
  const history = useHistory();
  const { pathname } = useLocation();
  const { path, url } = useRouteMatch();

  const { currentUser, setCurrentUser } = useCurrentUser();

  const onLogout = useCallback(() => {
    setCurrentUser(null);
    history.replace("/");
  }, [setCurrentUser, history]);

  return (
    <Box bg="dark.900" minH="100vh" px={{ base: "3", lg: "175px"}}>
      <Grid container spacing={3}>
        <Grid item xs={3}>
          <Stack spacing={4} pt="3">
            <Box>
              {`${url}/anotacoes/cadastrar` !== pathname && (
                <>
                  <PseudoBox bg="#7289da" transition="all 0.25s" _hover={newNotesHoverStyles} borderRadius="4px" h="48px">
                    <ChakraLink as={Link} _hover={newNotesLinkPseudoStyles} _focus={newNotesLinkPseudoStyles} to={`${url}/anotacoes/cadastrar`} >
                      <Flex justify="center" alignItems="center" h="100%">
                        <Text as="p" fontSize="lg" fontWeight="600">
                          Nova Anotação
                        </Text>
                      </Flex>
                    </ChakraLink>
                  </PseudoBox>

                  <Divider my="3" />
                </>
              )}

              {currentUser && (
                <Card>
                  <Heading size="lg" pb="1">
                    {currentUser.nome}
                  </Heading>
                  <Text color="dark.200" textOverflow="ellipsis" overflow="hidden">{currentUser.email}</Text>
                </Card>
              )}
            </Box>

            <Card px="0" py="2">
              <Menu>
                <MenuItemLink active={url === pathname} icon={FaHome} as={Link} to={url}>Início</MenuItemLink>
                <MenuItemLink active={`${url}/anotacoes` === pathname} icon={FaPencilAlt} as={Link} to={`${url}/anotacoes`}>Minhas Anotações</MenuItemLink>
                {/* <MenuItemLink active={`${url}/comentarios` === pathname} icon={FaRegComment} as={Link} to={`${url}/comentarios`}>Meus Comentários</MenuItemLink> */}
                <MenuItemLink active={`${url}/eventos` === pathname} icon={FaRegCalendarAlt} as={Link} to={`${url}/eventos`}>Gerenciar Eventos</MenuItemLink>
                <MenuItemLink active={`${url}/palestras` === pathname} icon={FaBook} as={Link} to={`${url}/palestras`}>Gerenciar Palestras</MenuItemLink>
                <MenuDivider />
                <MenuItemLink icon={FaSignOutAlt} onClick={onLogout}>Sair</MenuItemLink>
              </Menu>
            </Card>
          </Stack>
        </Grid>

        <Grid item xs={9}>
          <Switch>
            <Route path={path} exact component={HomePage} />
            <Route path={`${path}/anotacoes`} exact component={NotesPage} />
            <Route path={`${path}/anotacoes/cadastrar`} component={NewNotePage} />
            <Route path={`${path}/comentarios`} component={CommentsPage} />
          </Switch>
        </Grid>
      </Grid>
    </Box>
  );
};
