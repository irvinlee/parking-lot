import React, { Fragment, memo } from 'react';
import PropTypes from 'prop-types';
import './slot.scss';
import { Vehicle as VehicleModel } from '../../models';

function Slot({ name, isOccupied, occupant, onClick }) {
  const { plateNo, color } = occupant;

  return (
    <div
      className={`parking-slot ${isOccupied && 'occupied'}`}
      onClick={onClick}
    >
      <h4 className="name-wrapper">{name}</h4>
      {!isOccupied ? (
        <div className="vacant-text">Vacant</div>
      ) : (
        <Fragment>
          <h2 className="plate-no-wrapper">{plateNo}</h2>
          <div className="color-wrapper">
            <label>Color:</label>
            <div>{color}</div>
          </div>
        </Fragment>
      )}
    </div>
  );
}

const equalityChecker = (prevProps, nextProps) => {
  return (
    prevProps.name === nextProps.name &&
    prevProps.isOccupied === nextProps.isOccupied
  );
};

export default memo(Slot, equalityChecker);

Slot.defaultProps = {
  occupant: {},
};

Slot.propTypes = {
  name: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  isOccupied: PropTypes.bool,
  occupant: PropTypes.instanceOf(VehicleModel),
  onClick: PropTypes.func,
};
