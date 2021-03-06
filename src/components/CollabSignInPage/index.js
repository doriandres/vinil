/**
 * CollabSignInPage component module
 * @module client/components/CollabSignInPage
 */

import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import { Button, Paper, Grid, Typography } from '@material-ui/core';
import useStyles from "../shared/styles/forms";
import { useForm } from 'react-hook-form';
import { post } from "axios";
import { API_URL } from '../../settings';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { useDispatch, useSelector } from 'react-redux';
import { selectAuth } from '../../redux/selectors';
import { COLLABORATOR } from '../../constants/roles';
import { signIn } from '../../redux/actions';
import { Redirect } from 'react-router-dom';
import { COLLAB_LANDING } from '../../locations';

/**
 * Collab sign in page component
 * @function CollabSignInPage
 * @returns {JSX.Element} CollabSignInPage component template
 */
export default function CollabSignInPage() {
  const dispatch = useDispatch();
  const auth = useSelector(selectAuth(COLLABORATOR));
  const classes = useStyles();
  const form = useForm();

  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  /**
   * Hides error modak
   * @function cleanError
   */
  const cleanError = () => {
    setError(null);
  };

  /**
   * Signs in a collaborator
   * @function onSuccess
   * @param {Object} colaborator
   */
  const onSuccess = (colaborator) => {
    dispatch(signIn(COLLABORATOR, colaborator));
  };

  /**
   * Displays error modal
   * @function onFail
   * @param {String} error Error message
   */
  const onFail = (error) => {
    setError(error);
    setLoading(false);
  };

  /**
   * Handles form submit event and sends collaborator credentials to be validated
   * @function onSubmit
   * @param {Object} credentials Collaborator credentials
   */
  const onSubmit = (credentials) => {
    setLoading(true);
    post(`${API_URL}api/v1/collaborators/sign-in`, credentials, { withCredentials: true })
      .then((response) => onSuccess(response.data.result))
      .catch(error => onFail(error.response?.data?.error || 'Hubo un error de conexión'));
  };


  if (!!auth) {
    return <Redirect to={COLLAB_LANDING()} />
  }

  return (
    <>
      <div className={classes.root}>
        <Grid container>
          <Grid item xs={12} md={4} />
          <Grid item xs={12} md={4}>
            <Paper className={classes.padding}>
              <Typography className={classes.noMarginTop} variant="h5">
                Colaboradores
              </Typography>
              <form className={classes.marginTop} onSubmit={form.handleSubmit(onSubmit)} autoComplete="off">
                <div>
                  <TextField
                    label="Correo Electrónico"
                    name="email"
                    inputRef={form.register({
                      required: "Debe insertar un correo electrónico",
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                        message: "Debe insertar un correo electrónico válido"
                      }
                    })}
                    variant="outlined"
                    error={!!form.errors.email}
                    helperText={form.errors.email?.message}
                    fullWidth
                  />
                </div>
                <div className={classes.marginTop}>
                  <TextField
                    label="Contraseña"
                    name="password"
                    type="password"
                    inputRef={form.register({ required: "Debe insertar una contraseña" })}
                    variant="outlined"
                    error={!!form.errors.password}
                    helperText={form.errors.password?.message}
                    fullWidth
                  />
                </div>
                <div className={classes.marginTop}>
                  <Button
                    type="submit"
                    disabled={loading}
                    variant="contained"
                    color="primary"
                    size="large"
                    fullWidth>
                    {loading ? "Verificando" : "Iniciar Sesión"}
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
    </>
  );
}
