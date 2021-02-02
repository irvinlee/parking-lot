import React from 'react';
import { Helmet, HelmetProvider } from 'react-helmet-async';

export default function Homepage() {
  return (
    <HelmetProvider>
      <Helmet>
        <title>Parking Lot App</title>
      </Helmet>
      Homepage
    </HelmetProvider>
  );
}
