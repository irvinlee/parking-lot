import React from 'react';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { Layout, SlotCountForm } from '../components';
import './homepage.scss';

export default function Homepage() {
  return (
    <Layout>
      <HelmetProvider>
        <Helmet>
          <title>Parking Lot App</title>
        </Helmet>

        <div className="homepage-wrapper">
          <h3>Welcome to the Parking Lot App!</h3>

          <div className="slot-count-form-wrapper">
            <h4>
              To get started, please enter the number of slots in your parking
              lot.
            </h4>
            <SlotCountForm />
          </div>
        </div>
      </HelmetProvider>
    </Layout>
  );
}
