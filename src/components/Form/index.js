import React from "react";

import {
  FormProvider,
} from "react-hook-form";

export const Form = ({ children, onSubmit, ...props }) => (
  <FormProvider {...props}>
    <form onSubmit={props.handleSubmit(onSubmit)}>
      {children}
    </form>
  </FormProvider>
);
