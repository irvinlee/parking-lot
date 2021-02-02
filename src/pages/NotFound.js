import React, { Fragment } from 'react';
import { Helmet } from 'react-helmet';

export default function NotFound() {
  return (
    <Fragment>
      <Helmet>
        <title>Parking Lot App - 404</title>
      </Helmet>
      <h1>The requested resource cannot be found in this app...</h1>
    </Fragment>
  );
}
