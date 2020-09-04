import React from "react";

import {
  CSSReset,
  ThemeProvider,
} from "@chakra-ui/core";

import Routes from "./Routes";

const App = () => (
  <ThemeProvider>
    <CSSReset />
    <Routes />
  </ThemeProvider>
);

export default App;
