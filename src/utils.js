import {
  curry,
  path,
  pathOr,
} from "ramda";

import {
  format,
  parseISO,
} from "date-fns/fp";

export const setFormErrorsFromResponse = ({ response, form }) => {
  const baseMessage = path(["data", "titulo"], response);
  const fields = pathOr([], ["data", "campos"], response);

  fields.forEach(({ nome: name, mensagem: message }) =>
    form.setError(name, { message: `${name.charAt(0).toUpperCase() + name.slice(1)} ${message}` })
  );

  if (fields.length === 0 && baseMessage) form.setError("base", { type: "manual", message: baseMessage });
};

export const formatDate = date => format("dd/MM/yyyy", date instanceof Date ? date : parseISO(date));

export const pathFromString = curry((str, obj) => path(str.split(/[[\].]/).filter(Boolean), obj));
