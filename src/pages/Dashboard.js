import React, { Fragment } from 'react';
import { useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet';

export default function Dashboard() {
  const { slotCount } = useParams();

  return (
    <Fragment>
      <Helmet>
        <title>Parking Lot App - Dashboard - {slotCount} slots</title>
      </Helmet>
      <h1>Dashboard</h1>
    </Fragment>
  );
}
