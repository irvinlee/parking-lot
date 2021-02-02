import React from 'react';

export default function Layout({ children }) {
  return (
    <div className="container">
      <header>
        <h1>Parking Lot App</h1>
      </header>
      {children}
    </div>
  );
}
