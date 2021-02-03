import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useParams, useHistory } from 'react-router-dom';
import { Modal } from '../../components';
import { Slot as SlotModel } from '../../models';
import { get } from 'lodash';
import './slot-details.scss';

export default function SlotDetailsModal({
  slots,
  onRequestClose,
  onCheckoutVehicle,
}) {
  const { slotCount, slotIndex } = useParams();
  const history = useHistory();

  useEffect(() => {
    if (!slots.length) {
      history.push(`/dashboard/${slotCount}`);
    }
  }, []);

  const slot = slots[slotIndex];

  const onClickVacate = () => {
    if (
      window.confirm(
        'Are you sure you want to vacate this slot? This operation cannot be undone.'
      )
    ) {
      onCheckoutVehicle(slot);
    }
  };

  return (
    <Modal
      title="Parking Slot Details"
      onRequestClose={() => onRequestClose()}
      className="slot-details-modal"
    >
      <div className="slot-details-wrapper">
        <div className="slot-info">
          <div>
            <div className="info-label">Slot Number:</div>
            <div className="info-value">{get(slot, 'name')}</div>
          </div>
          <div>
            <div className="info-label">Plate Number:</div>
            <div className="info-value">{get(slot, 'occupant.plateNo')}</div>
          </div>

          <div>
            <div className="info-label">Color: </div>
            <div className="info-value">{get(slot, 'occupant.color')}</div>
          </div>
        </div>
      </div>
      <div className="button-row">
        <button className="btn btn-danger" onClick={onClickVacate}>
          Vacate
        </button>
        <button className="btn btn-default" onClick={onRequestClose}>
          Back
        </button>
      </div>
    </Modal>
  );
}

SlotDetailsModal.propTypes = {
  slots: PropTypes.arrayOf(PropTypes.instanceOf(SlotModel)),
  onRequestClose: PropTypes.func,
  onCheckoutVehicle: PropTypes.func,
};
