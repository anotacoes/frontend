import React from "react";

import {
  DarkMode,
  CSSReset,
  ThemeProvider,
} from "@chakra-ui/core";

import { configure } from "axios-hooks";

import Axios from "axios";

import Routes from "./Routes";

import theme from "./theme";

const axios = Axios.create({ baseURL: "https://cors-anywhere.herokuapp.com/https://anotacoes-backend.herokuapp.com" });

configure({ axios });

const App = () => (
  <ThemeProvider theme={theme}>
    <DarkMode>
      <CSSReset />
      <Routes />
    </DarkMode>
  </ThemeProvider>
);

export default App;
