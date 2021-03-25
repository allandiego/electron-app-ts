import React, { useState, useRef, useCallback } from 'react';
import { remote } from 'electron';
import store from 'electron-settings';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
// import { useNavigate } from 'react-router-dom';
import {
  Box,
  makeStyles,
  Container,
  Grid,
  Card,
  CardHeader,
  CardContent,
  IconButton,
  InputAdornment,
  Divider,
  CircularProgress,
  Button,
} from '@material-ui/core';
import { FiFolder as FolderIcon } from 'react-icons/fi';
// import { Input as InputIcon } from '@material-ui/icons';

import MoveFilesService from '../../services/MoveFiles';
import Yup from '../../utils/validators/Yup';
import { getValidationErrors } from '../../utils/getErrors';
import { Page, ButtonInput, TextInput } from '../../components';
import { useToast } from '../../hooks/toast';

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.background.default,
    minHeight: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3),
  },
}));

interface FormData {
  companiesConfigPath: string;
  departamentsConfigPath: string;
  originConfigPath: string;
  destinationConfigPath: string;
}

const Dashboard: React.FC = () => {
  const { addToast } = useToast();
  // const navigate = useNavigate();
  const classes = useStyles();
  const [loading, setLoading] = useState(false);

  const formRef = useRef<FormHandles>(null);

  // ipcRenderer.on('user-data-path', (e, data) => {
  //   console.log('user data', data);
  // });

  const handleSubmit = useCallback(
    async (data: FormData) => {
      try {
        setLoading(true);
        formRef.current?.setErrors({});

        const schemaForm = Yup.object().shape({
          companiesConfigPath: Yup.string().required('Campo obrigatório'),
          departamentsConfigPath: Yup.string().required('Campo obrigatório'),
          originConfigPath: Yup.string().required('Campo obrigatório'),
          destinationConfigPath: Yup.string().required('Campo obrigatório'),
        });

        await schemaForm.validate(data, { abortEarly: false });

        const {
          companiesConfigPath,
          departamentsConfigPath,
          originConfigPath,
          destinationConfigPath,
        } = data;

        const moveFilesService = new MoveFilesService();

        await moveFilesService.execute({
          companiesConfigPath,
          departamentsConfigPath,
          originConfigPath,
          destinationConfigPath,
        });

        addToast({
          type: 'success',
          title: 'Sucesso!',
          description: 'Arquivos movidos com sucesso!',
        });
      } catch (error) {
        // console.log(error);
        formRef.current.setFieldValue(
          'logs',
          `${formRef.current.getFieldValue('logs')}\n${error}`,
        );

        if (error instanceof Yup.ValidationError) {
          const errors = getValidationErrors(error);
          // console.log('Yup.ValidationError => ', error);

          formRef.current?.setErrors(errors);

          addToast({
            type: 'error',
            title: 'Erro',
            delay: 10000,
            description: 'Verifique os erros no formulário',
          });
          return;
        }

        addToast({
          type: 'error',
          title: 'Erro',
          delay: 10000,
          description: `Erro ao mover os arquivos: ${error}`,
        });
      } finally {
        setLoading(false);
      }
    },
    [addToast],
  );

  async function showOpenDialogDirectory(defaultPath: string) {
    const dialogResponse = await remote.dialog.showOpenDialog(
      // remote.getCurrentWindow(),
      {
        title: 'Selecione a pasta',
        buttonLabel: 'Selecionar',
        defaultPath: defaultPath ?? undefined,
        properties: ['openDirectory'],
      },
    );

    if (dialogResponse.filePaths.length >= 1 && !dialogResponse.canceled) {
      return dialogResponse.filePaths[0];
    }
    return null;
  }

  async function showOpenDialogFile(defaultPath: string) {
    const dialogResponse = await remote.dialog.showOpenDialog(
      // remote.getCurrentWindow(),
      {
        title: 'Selecione a pasta',
        buttonLabel: 'Selecionar',
        defaultPath: defaultPath ?? undefined,
        properties: ['openFile'],
      },
    );

    if (dialogResponse.filePaths.length >= 1 && !dialogResponse.canceled) {
      return dialogResponse.filePaths[0];
    }
    return null;
  }

  async function updateConfigData(
    type: 'file' | 'directory',
    inputRef: HTMLInputElement,
  ) {
    const dialogResponse =
      type === 'file'
        ? await showOpenDialogFile(inputRef.value)
        : await showOpenDialogDirectory(inputRef.value);

    if (dialogResponse) {
      formRef.current.setFieldValue(inputRef.name, dialogResponse);
      // inputRef.value = dialogResponse;
      // inputRef.setAttribute('value', dialogResponse);

      // await ipcRenderer.invoke('setStoreValue', storeKey, dialogPath);
      store.setSync(inputRef.name, dialogResponse);
    }
  }

  return (
    <Page className={classes.root}>
      <Container maxWidth="lg">
        <Grid container spacing={1}>
          <Grid item lg={12} md={12} xs={12}>
            <Form
              ref={formRef}
              initialData={{
                companiesConfigPath: store.hasSync('companiesConfigPath')
                  ? String(store.getSync('companiesConfigPath'))
                  : '',
                departamentsConfigPath: store.hasSync('departamentsConfigPath')
                  ? String(store.getSync('departamentsConfigPath'))
                  : '',
                originConfigPath: store.hasSync('originConfigPath')
                  ? String(store.getSync('originConfigPath'))
                  : '',
                destinationConfigPath: store.hasSync('destinationConfigPath')
                  ? String(store.getSync('destinationConfigPath'))
                  : '',
              }}
              onSubmit={handleSubmit}
              autoComplete="off"
              noValidate
              className={classes.root}
            >
              <Card>
                <CardHeader subheader="Mover" title="Arquivos" />

                <Divider />

                <CardContent>
                  <Grid container spacing={1}>
                    <Grid item md={12} xs={12}>
                      <ButtonInput
                        name="companiesConfigPath"
                        label="Arquivo de Configuração das Empresas"
                        // placeholder="Arquivo de Configuração das Empresas"
                        variant="outlined"
                        fullWidth
                        adornment={
                          <InputAdornment position="start">
                            <IconButton
                              onClick={async () => {
                                updateConfigData(
                                  'file',
                                  formRef.current.getFieldRef(
                                    'companiesConfigPath',
                                  ),
                                );
                              }}
                              color="inherit"
                            >
                              <FolderIcon />
                            </IconButton>
                          </InputAdornment>
                        }
                      />
                    </Grid>

                    <Grid item md={12} xs={12}>
                      <ButtonInput
                        name="departamentsConfigPath"
                        label="Arquivo de Configuração dos Departamentos"
                        // placeholder="Arquivo de Configuração dos Departamentos"
                        variant="outlined"
                        fullWidth
                        adornment={
                          <InputAdornment position="start">
                            <IconButton
                              onClick={async () => {
                                updateConfigData(
                                  'file',
                                  formRef.current.getFieldRef(
                                    'departamentsConfigPath',
                                  ),
                                );
                              }}
                              color="inherit"
                            >
                              <FolderIcon />
                            </IconButton>
                          </InputAdornment>
                        }
                      />
                    </Grid>

                    <Grid item md={12} xs={12}>
                      <ButtonInput
                        name="originConfigPath"
                        label="Caminho Base de Origem dos Arquivos"
                        // placeholder="Caminho Base de Origem dos Arquivos"
                        variant="outlined"
                        fullWidth
                        adornment={
                          <InputAdornment position="start">
                            <IconButton
                              onClick={async () => {
                                updateConfigData(
                                  'file',
                                  formRef.current.getFieldRef(
                                    'originConfigPath',
                                  ),
                                );
                              }}
                              color="inherit"
                            >
                              <FolderIcon />
                            </IconButton>
                          </InputAdornment>
                        }
                      />
                    </Grid>

                    <Grid item md={12} xs={12}>
                      <ButtonInput
                        name="destinationConfigPath"
                        label="Caminho Base de Destido dos Arquivos"
                        // placeholder="Caminho Base de Destido dos Arquivos"
                        variant="outlined"
                        fullWidth
                        adornment={
                          <InputAdornment position="start">
                            <IconButton
                              onClick={async () => {
                                updateConfigData(
                                  'file',
                                  formRef.current.getFieldRef(
                                    'destinationConfigPath',
                                  ),
                                );
                              }}
                              color="inherit"
                            >
                              <FolderIcon />
                            </IconButton>
                          </InputAdornment>
                        }
                      />
                    </Grid>
                  </Grid>
                </CardContent>

                <Divider />

                <Box display="flex" justifyContent="flex-end" p={2}>
                  {!loading ? (
                    <Button type="submit" color="primary" variant="contained">
                      Mover Arquivos
                    </Button>
                  ) : (
                    <CircularProgress />
                  )}
                </Box>
              </Card>

              <Divider />

              <Card>
                <CardHeader title="Logs de Erros" />
                <Divider />
                <CardContent>
                  <Grid item md={12} xs={12}>
                    <TextInput
                      name="logs"
                      label="Logs"
                      variant="outlined"
                      fullWidth
                      multiline
                      rows={10}
                    />
                  </Grid>
                </CardContent>
              </Card>
            </Form>
          </Grid>
        </Grid>
      </Container>
    </Page>
  );
};

export default Dashboard;
