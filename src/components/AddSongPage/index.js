import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import { Button, Paper, Grid, Typography } from '@material-ui/core';
import useStyles from "../shared/styles/forms";
import "./styles.css";
import MultiSelect from '../shared/components/MultiSelect';
import { useForm, Controller } from 'react-hook-form';
import FileZone from '../shared/components/FileZone';
import { post } from 'axios';
import { API_URL } from '../../settings';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { useHistory } from 'react-router-dom';
import { ADMIN_LANDING } from '../../locations';

export default function AddSongPage() {
  const classes = useStyles();
  const history = useHistory();
  const form = useForm();

  const [success, setSuccess] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const exit = () => {
    setSuccess(false);
    history.push(ADMIN_LANDING());
  };

  const cleanError = () => {
    setError(null);
  };

  const onSuccess = () => {
    setSuccess(true);
  };

  const onFail = (error) => {
    setError(error);
    setLoading(false);
  };

  const onSubmit = (data) => {
    var formData = new FormData();
    Object.entries(data).forEach(([key, value]) => {
      if (['song', 'thumbnail'].includes(key)) {
        formData.append(key, value[0])
      } else {
        formData.append(key, value)
      }
    });
    post(`${API_URL}api/v1/songs/insert`, formData, {
      withCredentials: true,
      headers: { 'Content-Type': 'multipart/form-data' }
    })
      .then((response) => onSuccess(response.data.result))
      .catch(error => onFail(error.response?.data?.error || 'Hubo un error de conexión'));
  };

  return (
    <>
      <div className={classes.root}>
        <Grid container>
          <Grid item xs={12} md={3} />
          <Grid item xs={12} md={6}>
            <Paper className={classes.padding}>
              <Typography className={classes.noMarginTop} variant="h5">
                Agregar Canción
            </Typography>
              <form className={classes.marginTop} onSubmit={form.handleSubmit(onSubmit)} autoComplete="off">
                <div>
                  <TextField
                    label="Título"
                    name="title"
                    inputRef={form.register({ required: "Debe insertar una título" })}
                    error={!!form.errors.title}
                    helperText={form.errors.title?.message}
                    variant="outlined"
                    fullWidth
                  />
                </div>
                <div className={classes.marginTop}>
                  <TextField
                    label="Año"
                    name="year"
                    type="number"
                    inputRef={form.register({
                      required: "Debe insertar un año",
                      validate(val) {
                        const number = parseFloat(val);
                        if (Number.isNaN(number)) {
                          return "Debe insertar un número";
                        }
                        if (number > new Date().getFullYear()) {
                          return "Debe insertar un año válido";
                        }
                      }
                    })}
                    error={!!form.errors.year}
                    helperText={form.errors.year?.message}
                    variant="outlined"
                    fullWidth
                  />
                </div>
                <div className={classes.marginTop}>
                  <Controller
                    name="song"
                    control={form.control}
                    rules={{
                      validate(value) {
                        if (!value || !value.length) {
                          return "Debe agregar una canción";
                        }
                      }
                    }}
                    as={
                      <FileZone
                        label="Canción"
                        error={!!form.errors.song}
                        legend="Arrastre un archivo .mp3 o haga click aquí para buscarlo"
                        acceptedFiles={['audio/mpeg', 'audio/mp3']}
                        helperText={form.errors.song?.message}
                      />
                    }
                  />
                </div>
                <div className={classes.marginTop}>
                  <Controller
                    name="thumbnail"
                    control={form.control}
                    rules={{
                      validate(value) {
                        if (!value || !value.length) {
                          return "Debe agregar una portada";
                        }
                      }
                    }}
                    as={
                      <FileZone
                        label="Portada"
                        error={!!form.errors.thumbnail}
                        legend="Arrastre un archivo de imagen (.jpg, .png) o haga click aquí para buscarlo"
                        acceptedFiles={['image/jpeg', 'image/png']}
                        helperText={form.errors.thumbnail?.message}
                      />
                    }
                  />
                </div>
                <div className={classes.marginTop}>
                  <Controller
                    name="genres"
                    control={form.control}
                    rules={{
                      validate(value) {
                        if (!value || !value.length) {
                          return "Debe elegir al menos 1 género";
                        }
                      }
                    }}
                    as={
                      <MultiSelect
                        label="Géneros"
                        error={!!form.errors.genres}
                        helperText={form.errors.genres?.message}
                        options={[
                          "Salsa",
                          "Rock",
                          "Jazz",
                          "HipHop",
                          "Arjona",
                          "El Buki",
                          "Gospel",
                          "Trap",
                          "Sinfonola"
                        ]}
                      />
                    }
                  />
                </div>
                <div className={classes.marginTop}>
                  <Button
                    disabled={loading}
                    type="submit"
                    variant="contained"
                    color="primary"
                    size="large">
                    {loading ? "Guardando" : "Guardar"}
                  </Button>
                </div>
              </form>
            </Paper>
          </Grid>
        </Grid>
      </div>
      <Dialog open={!!error} onClose={cleanError} maxWidth="xs" fullWidth>
        <DialogTitle>Lo sentimos</DialogTitle>
        <DialogContent>
          <DialogContentText>
            {error}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={cleanError} color="primary">
            Aceptar
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog open={!!success} onClose={exit} maxWidth="xs" fullWidth>
        <DialogTitle>Información</DialogTitle>
        <DialogContent>
          <DialogContentText>
            La canción ha sido agregada exitósamente
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={exit} color="primary">
            Aceptar
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
