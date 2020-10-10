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

const ConditionalLink = ({ condition, children, ...props }) => condition ? <Link {...props}>{children}</Link> : children;

export const MenuItemLink = ({ children, icon = "", active = false, isDisabled = false, containerProps = {}, ...props }) => (
  <PseudoBox bg={active ? "dark.700" : "dark.800"} opacity={isDisabled ? "0.4" : "1"} _hover={isDisabled ? null : containerHoverStyle} {...containerProps}>
    <ConditionalLink condition={!isDisabled} _hover={linkHoverStyle} _focus={linkFocusStyle} {...props}>
      <Flex alignItems="center" px="4" py="2">
        {icon && (typeof icon === "string" ? <ListIcon icon={icon} /> : <ListIcon as={icon} />)}
        <Text as="span" fontWeight="500">{children}</Text>
      </Flex>
    </ConditionalLink>
  </PseudoBox>
);

export const MenuDivider = props => <Divider my="2" {...props} />;

export const Menu = props => <Box bg="dark.800" {...props} />;
