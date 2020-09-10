import React from "react";

import {
  BrowserRouter,
  Route,
  Switch,
} from "react-router-dom";

import {
  HomePage,
  LoginPage,
  RegisterPage,
} from "./pages";

const Routes = () => (
  <BrowserRouter>
    <Switch>
      <Route path="/" exact component={LoginPage} />
      <Route path="/register" component={RegisterPage} />
      <Route path="/home" component={HomePage} />
    </Switch>
  </BrowserRouter>
);

export default Routes;
