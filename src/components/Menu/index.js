import React from "react";

import {
  Box,
  Divider,
  Flex,
  Link,
  ListIcon,
  PseudoBox,
  Text,
} from "@chakra-ui/core";

const containerHoverStyle = { bg: "dark.700", transition: "all 0.2s ease" };

const linkHoverStyle = { textDecoration: "none" };

const linkFocusStyle = { boxShadow: "none" };

export const MenuItemLink = ({ children, icon = "", active = false, containerProps = {}, ...props }) => (
  <PseudoBox bg={active ? "dark.700" : "dark.800"} _hover={containerHoverStyle} {...containerProps}>
    <Link _hover={linkHoverStyle} _focus={linkFocusStyle} {...props}>
      <Flex alignItems="center" px="4" py="2">
        {icon && (typeof icon === "string" ? <ListIcon icon={icon} /> : <ListIcon as={icon} />)}
        <Text as="span" fontWeight="500">{children}</Text>
      </Flex>
    </Link>
  </PseudoBox>
);

export const MenuDivider = props => <Divider my="2" {...props} />;

export const Menu = props => <Box bg="dark.800" {...props} />;
