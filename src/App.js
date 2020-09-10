import React from "react";

import {
  DarkMode,
  CSSReset,
  ThemeProvider,
} from "@chakra-ui/core";

import Routes from "./Routes";

import theme from "./theme";

const App = () => (
  <ThemeProvider theme={theme}>
    <DarkMode>
      <CSSReset />
      <Routes />
    </DarkMode>
  </ThemeProvider>
);

export default App;
