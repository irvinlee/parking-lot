import React, { useState, useEffect } from 'react';
import { isValidSlotCount } from '../../utils/helpers';
import { useHistory } from 'react-router-dom';

import './slotCountForm.scss';

const getValidSlotCountValue = (countStr) => {
  const count = countStr.replace(/[^\d]*/g, '');

  if (!isValidSlotCount(count) && count !== '') {
    return parseInt(count);
  }

  return count;
};

export default function SlotCountForm() {
  const [slotCount, setSlotCount] = useState('');
  const [formErrors, setFormErrors] = useState({});
  const history = useHistory();

  const handleSubmit = () => {
    if (!slotCount) {
      setFormErrors(() => ({
        slotCount: 'Please enter the number of slots',
      }));
    } else {
      history.push(`/dashboard/${slotCount}`);
    }
  };

  const onChangeCount = (e) => {
    setSlotCount(() => getValidSlotCountValue(e.target.value));
  };

  useEffect(() => {
    if (slotCount) {
      setFormErrors({});
    }
  }, [slotCount]);

  return (
    <div className="slot-count-form">
      <div
        className={`form-group row ${formErrors.slotCount ? 'has-error' : ''}`}
      >
        <div className="col-xs-12 col-md-8">
          <input
            type="text"
            className="form-control"
            placeholder="Enter the no. of slots here"
            value={slotCount}
            onChange={onChangeCount}
          />
          <div className="feedback">{formErrors.slotCount}</div>
        </div>
        <div className="col-xs-12 col-md-4">
          <button
            type="button"
            className="btn btn-primary"
            onClick={handleSubmit}
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
}
