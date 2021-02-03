import React from 'react';
import PropTypes from 'prop-types';
import './modal.scss';

export default function Modal({ title, className, children, onRequestClose }) {
  return (
    <div className="modal-overlay">
      <div className={`custom-modal ${className}`}>
        <div className="custom-modal-header">
          <div className="custom-modal-title">{title}</div>
          <button onClick={onRequestClose}>x</button>
        </div>
        <div className="modal-body">{children}</div>
      </div>
    </div>
  );
}

Modal.defaultProps = {
  className: '',
};

Modal.propTypes = {
  title: PropTypes.string,
  children: PropTypes.node,
  onRequestClose: PropTypes.func,
};
