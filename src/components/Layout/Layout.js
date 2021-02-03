import React from 'react';
import { Link } from 'react-router-dom';
import './layout.scss';

export default function Layout({ children }) {
  return (
    <div className="layout-container">
      <header>
        <div className="container">
          <Link to="/" className="brand">
            Parking Lot App
          </Link>
        </div>
      </header>
      <div className="children-container container">
        <div className="row">
          <div className="col-xs-12">{children}</div>
        </div>
      </div>
    </div>
  );
}
