import React, { Fragment } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { isValidSlotCount } from '../utils/helpers';

export default function Dashboard() {
  const { slotCount } = useParams();
  const history = useHistory();

  if (!isValidSlotCount(slotCount)) {
    history.push('/404');
  }

  return (
    <Fragment>
      <Helmet>
        <title>Parking Lot App - Dashboard - {slotCount} slots</title>
      </Helmet>
      <h1>Dashboard</h1>
    </Fragment>
  );
}
