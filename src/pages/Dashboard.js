import React from 'react';
import { useParams } from 'react-router-dom';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { Layout } from '../components';

export default function Dashboard() {
  const { slotCount } = useParams();

  return (
    <Layout>
      <HelmetProvider>
        <Helmet>
          <title>Parking Lot App - Dashboard - {slotCount} slots</title>
        </Helmet>
        <h1>Dashboard</h1>
      </HelmetProvider>
    </Layout>
  );
}
