import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import './vehicle-form.scss';

export default function VehicleForm({ onUpdateField, onSubmit, onCancel }) {
  const [plateNo, setPlateNo] = useState('');
  const [color, setColor] = useState('');
  const [formErrors, setFormErrors] = useState({});

  const onClickSubmit = () => {
    if (plateNo && color) {
      onSubmit({ plateNo, color });
    } else {
      setFormErrors(() => {
        const ret = {};
        if (!plateNo) {
          ret.plateNo = 'Please enter the plate number';
        }

        if (!color) {
          ret.color = 'Please enter the color';
        }

        return ret;
      });
    }
  };

  useEffect(() => {
    if (plateNo) {
      setFormErrors({ ...formErrors, plateNo: undefined });
    }
  }, [plateNo]);

  useEffect(() => {
    if (color) {
      setFormErrors({ ...formErrors, color: undefined });
    }
  }, [color]);

  return (
    <div className="vehicle-form">
      <div className={`form-group ${formErrors.plateNo ? 'has-error' : ''}`}>
        <label className="control-label" htmlFor="plate-no-input">
          Plate No.
        </label>
        <input
          type="text"
          id="plaate-no-input"
          placeholder="Enter Plate Number"
          className="form-control"
          value={plateNo}
          onChange={(e) => setPlateNo(e.target.value)}
        />
        <div className="feedback">{formErrors.plateNo}</div>
      </div>
      <div className={`form-group ${formErrors.color ? 'has-error' : ''}`}>
        <label className="control-label" htmlFor="color-input">
          Color
        </label>
        <input
          type="text"
          id="color-input"
          placeholder="Enter Vehicle Color"
          className="form-control"
          value={color}
          onChange={(e) => setColor(e.target.value)}
        />
        <div className="feedback">{formErrors.color}</div>
      </div>
      <div className="form-group button-row">
        <button className="btn btn-primary" onClick={onClickSubmit}>
          Submit
        </button>
        <button className="btn btn-default" onClick={onCancel}>
          Cancel
        </button>
      </div>
    </div>
  );
}

VehicleForm.propTypes = {
  onUpdateField: PropTypes.func,
  onSubmit: PropTypes.func,
  onCancel: PropTypes.func,
};
