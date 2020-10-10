import React, { useCallback, useMemo, useEffect, useState } from "react";

import {
  Box,
  Divider,
  Heading,
  Stack,
  useToast,
} from "@chakra-ui/core";

import Grid from "@bit/mui-org.material-ui.grid";

import { useForm } from "react-hook-form";

import { yupResolver } from "@hookform/resolvers";

import * as yup from "yup";

import { useHistory } from "react-router-dom";

import useAxios from "axios-hooks";

import { usePrevious } from "react-use";

import {
  formatISO,
  isBefore,
  isEqual,
  parseISO,
} from "date-fns";

import {
  identity,
  prop,
  propOr,
} from "ramda";

import {
  CancelButton,
  Card,
  CardList,
  CreatableSelectField,
  DateField,
  Form,
  PrimaryButton,
  TextareaField,
} from "../../components";

import { formatDate } from "../../utils";

import { useCurrentUser } from "../../model";

const toSelectOption = obj => ({ value: obj.id, label: obj.nome });

const useNewNoteForm = ({ onSuccess = identity, onError = identity }) => {
  const registerFormSchema = useMemo(() => yup.object().shape({
    texto: yup.string()
      .max(300, "Texto deve conter até 300 caracteres")
      .required("Digite um texto"),
    evento: yup.object().shape({
      idNome: yup.object()
        .shape({
          label: yup.string().required(),
          value: yup.string().required(),
        })
        .test("event-max-length", "Evento deve conter até 30 caracteres", event => event.value.length <= 30)
        .typeError("Informe o evento")
        .required("Informe o evento"),
      dataInicio: yup.date()
        .max(new Date(), `Data inicial deve ser menor ou igual a ${formatDate(new Date())}`)
        .typeError("Data inicial inválida")
        .test(
          "is-valid-range",
          "Data inicial deve ser menor que a data final",
          function(date) {
            return isBefore(date, this.parent.dataFim) || isEqual(date, this.parent.dataFim);
          },
        )
        .required("Informe a data inicial"),
      dataFim: yup.date()
        .max(new Date(), `Data final deve ser menor ou igual a ${formatDate(new Date())}`)
        .typeError("Data final inválida")
        .required("Informe a data final"),
    }).required("Informe os dados do evento"),
    palestra: yup.object().shape({
      idNome: yup.object()
        .shape({
          label: yup.string().required(),
          value: yup.string().required(),
        })
        .test("talk-max-length", "Palestra deve conter até 30 caracteres", talk => talk.value.length <= 30)
        .typeError("Informe a palestra")
        .required("Informe a palestra"),
      data: yup.date()
        .max(new Date(), `Data deve ser menor ou igual a ${formatDate(new Date())}`)
        .typeError("Data inválida")
        .required("Informe a data"),
    }).required("Informe os dados da palestra"),
    palestrante: yup.object().shape({
      idNome: yup.object()
        .shape({
          label: yup.string().required(),
          value: yup.string().required(),
        })
        .test("speaker-max-length", "Palestrante deve conter até 30 caracteres", speaker => speaker.value.length <= 30)
        .typeError("Informe o palestrante")
        .required("Informe o palestrante"),
    }).required("Informe os dados do palestrante"),
    // eslint-disable-next-line
  }), [new Date().getDate()]);

  const form = useForm({
    resolver: yupResolver(registerFormSchema),
    defaultValues: {
      texto: "",
      evento: {
        idNome: "",
        dataInicio: "",
        dataFim: "",
      },
      palestra: {
        idNome: "",
        data: "",
      },
      palestrante: {
        idNome: "",
      }
    },
  });

  const [submitting, setSubmitting] = useState(false);

  const { currentUser } = useCurrentUser();

  const [, createEvent] = useAxios(
    { url: "/eventos", method: "POST" },
    { manual: true },
  );

  const [, createTalk] = useAxios(
    { method: "POST" },
    { manual: true },
  );

  const [, createSpeaker] = useAxios(
    { url: "/palestrantes", method: "POST" },
    { manual: true },
  );

  const [, createNote] = useAxios(
    { url: "/anotacoes", method: "POST" },
    { manual: true },
  );

  const onSubmit = useCallback(async ({ evento, palestra, palestrante, texto }) => {
    setSubmitting(true);

    Promise
      .resolve()
      .then(async () => {
        try {
          const { value: id, label: nome, __isNew__ } = prop("idNome", evento);
          if (__isNew__) {
            const { data } = await createEvent({ data: { nome, conta: { id: currentUser.id }, dataInicio: formatISO(evento.dataInicio), dataFim: formatISO(evento.dataFim) }});
            return { eventId: prop("id", data) };
          } else {
            return { eventId: id };
          }
        } catch (err) {
          return Promise.reject(err);
        }
      })
      .then(async (payload) => {
        try {
          const { value: id, label: nome, __isNew__ } = prop("idNome", palestrante);
          if (__isNew__) {
            const { data } = await createSpeaker({ data: { nome }});
            return { speakerId: prop("id", data), ...payload };
          } else {
            return { speakerId: id, ...payload };
          }
        } catch (err) {
          return Promise.reject(err);
        }
      })
      .then(async ({ eventId, speakerId }) => {
        try {
          const { value: id, label: nome, __isNew__ } = prop("idNome", palestra);
          if (__isNew__) {
            const { data } = await createTalk({ url: `/eventos/${eventId}/palestras`, data: { nome, data: formatISO(palestra.data), conta: { id: currentUser.id }, evento: { id: eventId }, palestrante: { id: speakerId } }});
            return { talkId: prop("id", data) };
          } else {
            return { talkId: id };
          }
        } catch (err) {
          return Promise.reject(err);
        }
      })
      .then(async ({ talkId }) => {
        try {
          const response = await createNote({ data: { texto, conta: { id: currentUser.id }, palestra: { id: talkId } }});
          setSubmitting(false);
          onSuccess(response);
        } catch (err) {
          return Promise.reject(err);
        }
      })
      .catch(err => {
        const response = propOr({}, "response", err);
        setSubmitting(false);
        onError(response);
      });
  }, [onSuccess, onError, currentUser.id, createNote, createTalk, createSpeaker, createEvent]);

  return {
    ...form,
    onSubmit,
    submitting,
  };
};

export const NewNotePage = () => {
  const toast = useToast();
  const history = useHistory();

  const [talks, setTalks] = useState([]);

  const onCreateNoteSuccess = useCallback(() => {
    history.push("/app");
    toast({
      description: "Anotação cadastrada com sucesso!",
      position: "bottom-left",
      status: "success",
    });
  }, [history, toast]);

  const form = useNewNoteForm({ onSuccess: onCreateNoteSuccess });
  const { watch, setValue } = form;

  const watchSelectedEvent = watch("evento.idNome");
  const watchSelectedTalk = watch("palestra.idNome");

  const [{ data: events = [], loading: loadingEvents }, refetchEvents] = useAxios("/eventos");
  const [{ loading: loadingTalks }, loadTalks] = useAxios(null, { manual: true });
  const [{ data: speakers = [], loading: loadingSpeakers }, refetchSpeakers] = useAxios("/palestrantes");

  const [, loadResource] = useAxios(null, { manual: true });

  const eventOptions = useMemo(() => events.map(toSelectOption), [events]);
  const talkOptions = useMemo(() => talks.map(toSelectOption), [talks]);
  const speakerOptions = useMemo(() => speakers.map(toSelectOption), [speakers]);

  const isNewEvent = useMemo(() => prop("__isNew__", watchSelectedEvent), [watchSelectedEvent]);
  const isNewTalk = useMemo(() => prop("__isNew__", watchSelectedTalk), [watchSelectedTalk]);

  const onBack = useCallback(() => history.goBack(), [history]);

  useEffect(() => {
    refetchEvents();
    refetchSpeakers();
  }, [refetchEvents, refetchSpeakers]);

  useEffect(() => {
    if (watchSelectedEvent && !watchSelectedEvent.__isNew__) {
      loadTalks(`/eventos/${watchSelectedEvent.value}/palestras`)
        .then(({ data }) => setTalks(data));
    } else {
      setTalks([]);
    }
  }, [loadTalks, setTalks, watchSelectedEvent]);

  useEffect(() => {
    if (watchSelectedTalk && !watchSelectedTalk.__isNew__ && !talkOptions.find(({ value }) => value === watchSelectedTalk.value)) {
      setValue("palestra.idNome", null);
    }
  }, [setValue, watchSelectedTalk, talkOptions]);

  const previousSelectedEvent = usePrevious(watchSelectedEvent);

  useEffect(() => {
    if (previousSelectedEvent !== watchSelectedEvent) {
      if (watchSelectedEvent && !watchSelectedEvent.__isNew__) {
        loadResource(`/eventos/${watchSelectedEvent.value}`)
          .then(({ data: event }) => {
            setValue("evento.dataInicio", parseISO(event.dataInicio));
            setValue("evento.dataFim", parseISO(event.dataFim));
          });
      } else {
        setValue("evento.dataInicio", "");
        setValue("evento.dataFim", "");
      }
    }
  }, [previousSelectedEvent, watchSelectedEvent, setValue, loadResource]);

  const previousSelectedTalk = usePrevious(watchSelectedTalk);

  useEffect(() => {
    if (previousSelectedTalk !== watchSelectedTalk) {
      if (watchSelectedTalk && !watchSelectedTalk.__isNew__) {
        loadResource(`/eventos/${watchSelectedEvent.value}/palestras/${watchSelectedTalk.value}`)
          .then(({ data: talk }) => {
            setValue("palestra.data", parseISO(talk.data));
            setValue("palestrante.idNome", { value: talk.palestrante.id, label: talk.palestrante.nome });
          });
      } else {
        setValue("palestra.data", "");
        setValue("palestrante.idNome", null);
      }
    }
  }, [watchSelectedEvent, previousSelectedTalk, watchSelectedTalk, setValue, loadResource]);

  return (
    <CardList>
      <Card pb="5">
        <Form {...form}>
          <Heading as="h2" size="md" fontWeight="600">
            Nova Anotação
          </Heading>

          <Divider py="1" />

          <Stack pt="2" pb="2" spacing={3}>
            <Box>
              <TextareaField name="texto" label="Texto" />
            </Box>

            <Box pt="1">
              <Grid container>
                <Grid item xs={12} md={6}>
                  <Stack spacing={3} pr="4" borderRight="0.0625rem solid rgba(255, 255, 255, 0.12)">
                    <Box>
                      <CreatableSelectField name="evento.idNome" label="Evento" isLoading={loadingEvents} options={eventOptions} />
                    </Box>

                    <Box>
                      <DateField name="evento.dataInicio" label="Data inicial" isDisabled={!isNewEvent} />
                    </Box>

                    <Box>
                      <DateField name="evento.dataFim" label="Data final" isDisabled={!isNewEvent} />
                    </Box>
                  </Stack>
                </Grid>

                <Grid item xs={12} md={6}>
                  <Stack spacing={3} pl="4">
                    <Box>
                      <CreatableSelectField name="palestra.idNome" label="Palestra" isDisabled={!watchSelectedEvent} isLoading={loadingTalks} options={talkOptions} />
                    </Box>

                    <Box>
                      <DateField name="palestra.data" label="Data" isDisabled={!isNewTalk} />
                    </Box>

                    <Box>
                      <CreatableSelectField name="palestrante.idNome" label="Palestrante" isDisabled={!isNewTalk} isLoading={loadingSpeakers} options={speakerOptions} />
                    </Box>
                  </Stack>
                </Grid>
              </Grid>
            </Box>
          </Stack>

          <Divider py="1" />

          <Box display="flex" justifyContent="flex-end" pt="3">
            <CancelButton px="25px" onClick={onBack} disabled={form.submitting}>Voltar</CancelButton>
            <PrimaryButton type="submit" ml="2" px="45px" isLoading={form.submitting}>Salvar</PrimaryButton>
          </Box>
        </Form>
      </Card>
    </CardList>
  );
};
