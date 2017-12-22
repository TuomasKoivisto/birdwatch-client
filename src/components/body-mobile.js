import React from 'react';
import Add from './add';
import View from './view';
import './../include/bootstrap';
import './../App.css';

const BodyMobile = props => {
  return (
    <div id="accordion" role="tablist">
      <div className="card">
        <div className="card-header" role="tab" id="headingOne">
          <h5 className="mb-0 text-center">
            <a
              data-toggle="collapse"
              href="#collapseOne"
              aria-expanded="true"
              aria-controls="collapseOne"
            >
              <button type="button" className="btn btn-primary mobile-button">
                Add
              </button>
            </a>
          </h5>
        </div>

        <div
          id="collapseOne"
          className="collapse"
          role="tabpanel"
          aria-labelledby="headingOne"
          data-parent="#accordion"
        >
          <div className="card-body">
            <Add
              addHandler={props.addHandler}
              birdNotFoundHandler={props.birdNotFoundHandler}
              removeBirdNotFound={props.removeBirdNotFound}
              sightingAdded={props.sightingAdded}
              sightingAddedHandler={props.sightingAddedHandler}
              removeSightingAdded={props.removeSightingAdded}
              BtnDisabledHandler={props.BtnDisabledHandler}
              BtnEnabledHandler={props.BtnEnabledHandler}
              btnDisabled={props.btnDisabled}
              className="form mobile-form mobile-form-hide"
            />
          </div>
        </div>
      </div>
      <div className="card">
        <div className="card-header" role="tab" id="headingTwo">
          <h5 className="mb-0 text-center">
            <a
              className="collapsed"
              data-toggle="collapse"
              href="#collapseTwo"
              aria-expanded="false"
              aria-controls="collapseTwo"
            >
              <button type="button" className="btn btn-success mobile-button">
                View
              </button>
            </a>
          </h5>
        </div>
        <div
          id="collapseTwo"
          className="collapse"
          role="tabpanel"
          aria-labelledby="headingTwo"
          data-parent="#accordion"
        >
          <div className="card-body">
            <View
              className="mobile-form mobile-form-hide"
              sightings={props.sightings}
              listingHandler={props.listingHandler}
              listReverseHandler={props.listReverseHandler}
              removeSightingAdded={props.removeSightingAdded}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default BodyMobile;
