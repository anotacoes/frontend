import React from "react";

import {
  BrowserRouter,
  Route,
  Switch,
} from "react-router-dom";

import {
  CommentsPage,
  HomePage,
  LoginPage,
  NewNotePage,
  NotesPage,
  RegisterPage,
} from "./pages";

const Routes = () => (
  <BrowserRouter>
    <Switch>
      <Route path="/" exact component={LoginPage} />
      <Route path="/register" exact component={RegisterPage} />

      <Route path="/home" component={HomePage} />
      <Route path="/notes" exact component={NotesPage} />
      <Route path="/notes/new" component={NewNotePage} />
      <Route path="/comments" component={CommentsPage} />
    </Switch>
  </BrowserRouter>
);

export default Routes;
