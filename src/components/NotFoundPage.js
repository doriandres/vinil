/**
 * NotFoundPage component module
 * @module client/components/NotFoundPage
 */

import React from 'react';
import { makeStyles, Typography } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    height: "400px",
    alignContent: "center",
    justifyContent: "center",
    textAlign: "center"
  }
}));

/**
 * Not found page component 
 * @function NotFoundPage
 * @returns {JSX.Element} Not found page component template
 */
export default function NotFoundPage() {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <div>
        <Typography variant="h2">
          404
        </Typography>
        <br />
        <Typography variant="h5">
          Lo sentimos, no pudimos encontrar la página
        </Typography>
      </div>
    </div>
  );
}