import {
  path,
  pathOr,
} from "ramda";

export const setFormErrorsFromResponse = ({ response, form }) => {
  const baseMessage = path(["data", "titulo"], response);
  const fields = pathOr([], ["data", "campos"], response);

  fields.forEach(({ nome: name, mensagem: message }) =>
    form.setError(name, { message: `${name.charAt(0).toUpperCase() + name.slice(1)} ${message}` })
  );

  if (fields.length === 0 && baseMessage) form.setError("base", { type: "manual", message: baseMessage });
};
