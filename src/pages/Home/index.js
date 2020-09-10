import React from "react";

import { useForm } from "react-hook-form";

import { yupResolver } from "@hookform/resolvers";

import * as yup from "yup";

import {
  Divider,
  Button,
  Box,
  Flex,
  ListIcon,
  Link as ChakraLink,
  Heading,
  PseudoBox,
  Text,
  theme,
} from "@chakra-ui/core";

import Grid from "@bit/mui-org.material-ui.grid";

import {
  FaChevronDown,
  FaChevronUp,
  FaPencilAlt,
  FaRegComment,
  FaSearch,
} from "react-icons/fa";

import {
  Form,
  TextField,
} from "../../components";

const searchFormSchema = yup.object().shape({
  search: yup.string().required("Test"),
});

export const HomePage = () => {
  const searchForm = useForm({
    resolver: yupResolver(searchFormSchema),
    defaultValues: {
      search: ""
    },
  });

  return (
    <Box bg="dark.900" minH="100vh" py="5" px="200px">
      <Grid container spacing={3}>
        <Grid item xs={3}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Box p="4" bg="dark.800" borderRadius="4px">
                <Heading size="lg" pb="1">
                  Vinicius Meneses
                </Heading>
                <Text color="dark.200" textOverflow="ellipsis" overflow="hidden">vinicius.meneses04@gmail.com</Text>
              </Box>
            </Grid>

            <Grid item xs={12}>
              <Box bg="dark.800" borderRadius="4px" py="2">
                <PseudoBox _hover={{ bg: "dark.700", transition: "all 0.2s ease" }} px="4" py="2">
                  <ChakraLink _hover={{ textDecoration: "none" }}>
                    <Flex alignItems="center">
                      <ListIcon as={FaPencilAlt} size="20px" />
                      <Text as="span" fontWeight="500">Minhas Anotações</Text>
                    </Flex>
                  </ChakraLink>
                </PseudoBox>

                <PseudoBox _hover={{ bg: "dark.700", transition: "all 0.2s ease" }} px="4" py="2">
                  <ChakraLink _hover={{ textDecoration: "none" }}>
                    <Flex alignItems="center">
                      <ListIcon as={FaRegComment} size="20px" />
                      <Text as="span" fontWeight="500">Meus Comentários</Text>
                    </Flex>
                  </ChakraLink>
                </PseudoBox>
              </Box>
            </Grid>
          </Grid>
        </Grid>

        <Grid item xs={9}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Box p="4" bg="dark.800" borderRadius="4px">
                <Form {...searchForm}>
                  <TextField name="search" placeholder="Pesquisar..." leftElement={<Box as={FaSearch} color="dark.300" />} />
                </Form>
              </Box>
            </Grid>

            <Grid item xs={12}>
              <Box p="4" bg="dark.800" borderRadius="4px">
                <Flex justify="space-between">
                  <Flex>
                    <Text as="span" fontSize="sm" fontWeight="500">Conceitos do NodeJS</Text>
                    <Text as="span" fontSize="sm" color="dark.300" verticalAlign="middle" mx="1">•</Text>
                    <Text as="span" fontSize="sm" color="dark.300" fontWeight="500">Next-Level Week</Text>
                    <Text as="span" fontSize="sm" color="dark.300" verticalAlign="middle" mx="1">•</Text>
                    <Text as="span" fontSize="sm" color="dark.300" fontWeight="500">Escrito por Vinicius Meneses</Text>
                  </Flex>

                  <Flex>
                    <Text as="span" fontSize="sm" fontWeight="500">08/09/2020</Text>
                  </Flex>
                </Flex>
                <Divider />
                <Text>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque et euismod neque. Duis id urna at massa tempor malesuada. Nunc et bibendum ligula. Phasellus non iaculis nisi, congue cursus lacus. Curabitur facilisis porta sapien quis hendrerit. Interdum et malesuada fames ac ante ipsum primis in faucibus. Nam feugiat augue id lorem posuere, vel efficitur sapien volutpat. Suspendisse ultrices, est non pretium placerat, dolor dui ornare nisi, non eleifend quam eros ac lacus.
                  Fusce eget porta magna, at luctus ex. Vivamus nec nibh tempor, porta odio ac, finibus leo. Sed laoreet at velit eget pulvinar. In hac habitasse platea dictumst. Ut tempor leo ipsum, id convallis mi bibendum a. Sed ornare imperdiet tellus id porta. Sed fringilla ipsum nec aliquam euismod. Nullam vulputate lorem vel massa elementum efficitur. Donec vel dolor et massa euismod consectetur quis a massa. Donec feugiat elit at tortor fermentum ultrices. Vestibulum auctor dui eget porttitor ultricies. Praesent dapibus risus ac sem rhoncus placerat. Nunc vitae nibh neque. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Proin rhoncus feugiat nibh ac suscipit. Proin venenatis nunc ligula, a hendrerit odio congue quis.
                </Text>

                <Flex pt="3">
                  <Button size="xs" variant="outline" variantColor="purple" leftIcon={FaRegComment} mr="2">
                    5 Comentários
                  </Button>
                  <Button size="xs" variant="outline" variantColor="purple" leftIcon={FaChevronUp} mr="2">
                    28 Upvotes
                  </Button>
                  <Button size="xs" variant="outline" variantColor="purple" leftIcon={FaChevronDown}>
                    3 Downvotes
                  </Button>
                </Flex>
              </Box>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};
