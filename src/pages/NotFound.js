import React from 'react';
import { Helmet, HelmetProvider } from 'react-helmet-async';

import { Layout } from '../components';

export default function NotFound() {
  return (
    <Layout>
      <HelmetProvider>
        <Helmet>
          <title>Parking Lot App - 404</title>
        </Helmet>
        <h1>The requested resource cannot be found in this app...</h1>
      </HelmetProvider>
    </Layout>
  );
}
