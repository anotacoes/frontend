import React from "react";

import {
  DarkMode,
  CSSReset,
  ThemeProvider,
  theme,
} from "@chakra-ui/core";

import { configure } from "axios-hooks";

import Axios from "axios";

import Routes from "./Routes";

const axios = Axios.create({ baseURL: "https://cors-anywhere.herokuapp.com/https://anotacoes-backend.herokuapp.com" });

configure({ axios });

const customTheme = {
  ...theme,
  colors: {
    ...theme.colors,
    dark: {
      50: "#d6d8de",
      100: "#bcbfc2",
      200: "#a2a5a9",
      300: "#888b90",
      400: "#6e7277",
      500: "#56595d",
      600: "#424549",
      700: "#36393e",
      800: "#282b30",
      900: "#1e2124",
    },
    purple: {
      50: "#e8eeff",
      100: "#c0ccf3",
      200: "#99aae5",
      300: "#7289da",
      400: "#4a67ce",
      500: "#314db5",
      600: "#253c8d",
      700: "#1a2b66",
      800: "#0d1a40",
      900: "#01091b",
    },
  },
};

const App = () => (
  <ThemeProvider theme={customTheme}>
    <DarkMode>
      <CSSReset />
      <Routes />
    </DarkMode>
  </ThemeProvider>
);

export default App;
