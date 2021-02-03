import React, { useReducer, useEffect, useState } from 'react';
import {
  Switch,
  Route,
  useRouteMatch,
  useHistory,
  useParams,
} from 'react-router-dom';

import { Helmet, HelmetProvider } from 'react-helmet-async';
import {
  Layout,
  Slot as SlotComponent,
  SlotDetailsModal,
  Modal,
  VehicleForm,
} from '../components';

import { Slot as SlotModel, Vehicle as VehicleModel } from '../models';
import './dashboard.scss';

import { useSelectors, useActions } from '../utils/hooks';

const INITIAL_STATE = {
  slots: [],
};

const ACTIONS = {
  INIT: 'initialize parking slots',
  CHECK_IN: 'check-in vehicle',
  CHECK_OUT: 'check-out vehicle',
};

const reducer = (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case ACTIONS.INIT:
      return {
        ...state,
        slots: Array(payload.slotCount)
          .fill(null)
          .map(
            (v, index) =>
              new SlotModel({ name: index + 1, occupant: new VehicleModel() })
          ),
      };
    case ACTIONS.CHECK_IN:
      return {
        ...state,
        slots: [
          ...state.slots.slice(0, payload.slotIndex),
          payload.slot,
          ...state.slots.slice(payload.slotIndex + 1),
        ],
      };
    case ACTIONS.CHECK_OUT:
      return {
        ...state,
        slots: [
          ...state.slots.slice(0, payload.slotIndex),
          new SlotModel({
            name: payload.slotIndex + 1,
            occupant: new VehicleModel(),
          }),
          ...state.slots.slice(payload.slotIndex + 1),
        ],
      };
    default:
      return state;
  }
};

export default function Dashboard() {
  const { slotCount } = useParams();
  const history = useHistory();
  const [state, dispatch] = useReducer(reducer, INITIAL_STATE);
  const { path, url } = useRouteMatch();
  const [filters, setFilters] = useState({});

  //SELECTORS
  const {
    selectAllSlots,
    selectNearestAvailableSlot,
    selectCarColors,
    selectFilteredSlots,
  } = useSelectors([state], (currentState) => ({
    selectAllSlots: () => currentState.slots,
    selectNearestAvailableSlot: () => {
      return currentState.slots.find((slot) => !slot.isOccupied);
    },
    selectCarColors: () =>
      Object.keys(
        currentState.slots.reduce((accumulator, current) => {
          if (
            current.occupant.color &&
            !accumulator[current.occupant.color.toLowerCase()]
          ) {
            accumulator[current.occupant.color.toLowerCase()] = true;
          }

          return accumulator;
        }, {})
      ),
    selectFilteredSlots: (color, plateNo) =>
      currentState.slots.filter((slot) => {
        if (!color && !plateNo) {
          return true;
        } else if (!slot.isOccupied) {
          return false;
        } else if (color && plateNo) {
          return (
            slot.occupant.color.toLowerCase() === color.toLowerCase() &&
            slot.occupant.plateNo.toLowerCase() === plateNo.toLowerCase()
          );
        } else if (color) {
          return slot.occupant.color.toLowerCase() === color.toLowerCase();
        } else {
          return slot.occupant.plateNo.toLowerCase() === plateNo.toLowerCase();
        }
      }),
  }));
  //ACTIONS
  const { init, checkIn, checkOut } = useActions(
    [state, dispatch],
    (dispatch) => ({
      init: (count) =>
        dispatch({
          type: ACTIONS.INIT,
          payload: { slotCount: parseInt(count) },
        }),
      checkIn: (payload) =>
        dispatch({
          type: ACTIONS.CHECK_IN,
          payload,
        }),
      checkOut: (payload) =>
        dispatch({
          type: ACTIONS.CHECK_OUT,
          payload,
        }),
    })
  );

  const handleSlotClick = (slot) => {
    if (slot.isOccupied) {
      history.push(`${url}/details/${slot.name - 1}`);
    }
  };

  const onCloseAddModal = () => {
    history.push(`/dashboard/${slotCount}`);
  };

  const onCheckoutVehicleSubmit = (slot) => {
    checkOut({ slotIndex: slot.name - 1 });
    onCloseAddModal();
  };

  const onCheckinVehicleSubmit = (vehicleInfo) => {
    const occupant = new VehicleModel(vehicleInfo);
    const nearestSlot = selectNearestAvailableSlot();

    const slot = new SlotModel({
      name: nearestSlot.name,
      isOccupied: true,
      occupant,
    });
    checkIn({ slotIndex: nearestSlot.name - 1, slot });
    onCloseAddModal();
  };

  const onClickCheckInVehicle = () => {
    const nearestSlot = selectNearestAvailableSlot();
    if (!nearestSlot) {
      alert('The parking lot is already full!');
    } else {
      history.push(`${url}/check-in`);
    }
  };

  useEffect(() => {
    if (slotCount) {
      init(slotCount);
    }
  }, [slotCount, init]);

  return (
    <Layout>
      <HelmetProvider>
        <Helmet>
          <title>Parking Lot App - Dashboard - {slotCount} slots</title>
        </Helmet>
        <div className="dashboard-content-wrapper">
          <div className="top-section">
            <h3>Dashboard</h3>
            <button className="btn btn-primary" onClick={onClickCheckInVehicle}>
              Check In New Vehicle
            </button>
          </div>
          <div className="filters-section">
            <h5>Filter By:</h5>
            <div className="filter-options">
              <div className="color-filter-wrapper form-group filter-group">
                <label className="control-label" htmlFor="color-dropdown">
                  Color
                </label>
                <select
                  className="filter-dropdown form-control"
                  id="color-dropdown"
                  value={filters.color}
                  onChange={(e) =>
                    setFilters({ ...filters, color: e.target.value })
                  }
                >
                  <option value="">- All Colors -</option>
                  {selectCarColors().map((color) => (
                    <option key={color} value={color}>
                      {color}
                    </option>
                  ))}
                </select>
              </div>
              <div className="filters-plate-no form-group filter-group">
                <label className="control-label" htmlFor="plate-no-input">
                  Plate No:
                </label>
                <input
                  type="text"
                  className="form-control"
                  value={filters.plateNo}
                  onChange={(e) => {
                    setFilters({ ...filters, plateNo: e.target.value });
                  }}
                />
              </div>
            </div>
          </div>
          <div className="slots-wrapper">
            {selectFilteredSlots(filters.color, filters.plateNo).map((slot) => (
              <SlotComponent
                key={slot.name}
                onClick={() => handleSlotClick(slot)}
                {...slot}
              />
            ))}
          </div>
        </div>
        <Switch>
          <Route path={`${path}/check-in`}>
            <Modal
              title="Check-in New Vehicle"
              onRequestClose={() => onCloseAddModal()}
            >
              <h5>Please enter the vehicle info</h5>
              <div className="vehicle-form-wrapper">
                <VehicleForm
                  onSubmit={onCheckinVehicleSubmit}
                  onCancel={onCloseAddModal}
                />
              </div>
            </Modal>
          </Route>
          <Route
            path={`${path}/details/:slotIndex`}
            children={
              <SlotDetailsModal
                slots={selectAllSlots()}
                onCheckoutVehicle={onCheckoutVehicleSubmit}
                onRequestClose={() => onCloseAddModal()}
              />
            }
          />
        </Switch>
      </HelmetProvider>
    </Layout>
  );
}
