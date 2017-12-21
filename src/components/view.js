import React from 'react';
import './../include/bootstrap';
import './../App.css';
import _ from 'lodash';

const View = props => {
  var table = _.map(props.sightings, sighting => {
    return (
      <tr key={sighting.id}>
        <td>{sighting.id}</td>
        <td>{sighting.dateTime}</td>
        <td>{sighting.species}</td>
        <td>{sighting.count}</td>
        <td>{sighting.description}</td>
      </tr>
    );
  });
  return (
    <div className="text-center view">
      <div className="btn-group" role="group" aria-label="Basic example">
        <button
          onClick={() => {
            props.listingHandler();
            props.listReverseHandler();
          }}
          type="button"
          className="btn btn-secondary"
        >
          Reverse order
        </button>
      </div>
      <div id="table-div">
        <table className="table table-striped table-responsive table-sm mt-4 text-left">
          <thead>
            <tr>
              <th scope="col">Id</th>
              <th scope="col">Time</th>
              <th scope="col">Bird</th>
              <th scope="col">Count</th>
              <th scope="col">Description</th>
            </tr>
          </thead>
          <tbody>{table}</tbody>
        </table>
      </div>
    </div>
  );
};

export default View;
