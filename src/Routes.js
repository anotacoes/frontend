import React from "react";

import {
  BrowserRouter,
  Redirect,
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

import {
  AuthProvider,
  useCurrentUser,
} from "./model";

const AuthenticatedRoute = ({ component: Component, ...props }) => {
  const { currentUser } = useCurrentUser();

  return (
    <Route
      {...props}
      render={({ location }) => currentUser ? <Component {...props} /> : <Redirect to={{ pathname: "/", state: { from: location } }} />}
    />
  );
};

const PublicRoute = ({ component: Component, ...props }) => {
  const { currentUser } = useCurrentUser();

  return (
    <Route
      {...props}
      render={({ location }) => currentUser ? <Redirect to={{ pathname: "/home", state: { from: location } }} /> : <Component {...props} />}
    />
  );
};

const Routes = () => (
  <BrowserRouter>
    <Switch>
      <AuthProvider>
        <PublicRoute path="/" exact component={LoginPage} />
        <PublicRoute path="/register" component={RegisterPage} />

        <AuthenticatedRoute path="/home" component={HomePage} />
        <AuthenticatedRoute path="/notes" exact component={NotesPage} />
        <AuthenticatedRoute path="/notes/new" component={NewNotePage} />
        <AuthenticatedRoute path="/comments" component={CommentsPage} />
      </AuthProvider>
    </Switch>
  </BrowserRouter>
);

export default Routes;
