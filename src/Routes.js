import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import LoginPage from "./pages/Login";
import RegisterPage from "./pages/Register";

const Routes = () => (
  <BrowserRouter>
    <Switch>
      <Route path="/" exact component={LoginPage} />
      <Route path="/register" exact component={RegisterPage} />
    </Switch>
  </BrowserRouter>
);

export default Routes;
