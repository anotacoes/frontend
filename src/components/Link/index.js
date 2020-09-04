import React from "react";

import { Link as CkLink } from "@chakra-ui/core";

const Link = React.forwardRef((props, ref) => (
  <CkLink ref={ref}>{props.children}</CkLink>
))
export default Link;
