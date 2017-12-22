import React, { Component } from 'react';
import './../include/bootstrap';
import './../App.css';
import _ from 'lodash';
const $ = window.jQuery;

class Add extends Component {
  constructor(props) {
    super(props);

    this.state = {
      bird: '',
      count: '',
      time: '',
      description: '',
      species: ''
    };
  }

  componentWillMount() {
    $.ajax({
      url: 'https://morning-sands-39347.herokuapp.com/species',
      dataType: 'json',
      method: 'GET'
    }).then(response => {
      this.setState({ species: response });
    });
  }

  validateForm() {
    var result = true;
    var validBird = false;
    _.map(this.state.species, species => {
      if (species.name === this.state.bird) {
        validBird = true;
      }
    });
    if (validBird === false) {
      result = false;
    }
    if (this.state.count < 1) {
      result = false;
    }
    if (this.state.time === '') {
      result = false;
    }
    return result;
  }

  render() {
    return (
      <div id="add" className="add-form form">
        <form
          onSubmit={e => {
            e.preventDefault();
            this.props.BtnDisabledHandler();
            var send = this.validateForm();
            if (send) {
              var sighting = {
                species: this.state.bird,
                count: this.state.count,
                dateTime: this.state.time,
                description: this.state.description
              };
              $.ajax({
                url: 'https://morning-sands-39347.herokuapp.com/sightings',
                data: JSON.stringify(sighting),
                method: 'POST',
                contentType: 'application/json'
              }).then(response => {
                this.setState({
                  bird: '',
                  count: '',
                  time: '',
                  description: ''
                });
                this.props.addHandler();
                this.props.sightingAddedHandler();
                this.props.BtnEnabledHandler();
              });
            } else {
              this.props.birdNotFoundHandler();
              this.props.BtnEnabledHandler();
              return false;
            }
          }}
        >
          <div className="form-group  mt-5">
            <label>
              Bird <span className="small">(required)</span>
            </label>
            <input
              name="bird"
              onChange={e => {
                var str = e.target.value;
                var res = str.toLowerCase();
                this.setState({ bird: res });
                this.props.removeBirdNotFound();
                this.props.removeSightingAdded();
              }}
              type="text"
              className="form-control"
              placeholder="e.g. &quot;mallard&quot;"
              value={this.state.bird}
              required
            />
            <p className="text-danger">{this.props.birdNotFound}</p>
          </div>
          <div className="form-group">
            <label>
              Count <span className="small">(required)</span>
            </label>
            <input
              name="count"
              onChange={e => {
                if (e.target.value >= 1) {
                  this.setState({ count: e.target.value });
                }
                this.props.removeSightingAdded();
              }}
              type="number"
              className="form-control"
              min="1"
              max="1000000"
              step="1"
              value={this.state.count}
              required
            />
          </div>
          <div className="form-group">
            <label>
              Time <span className="small">(required)</span>
            </label>
            <input
              name="time"
              onChange={e => {
                this.setState({ time: e.target.value });
                this.props.removeSightingAdded();
              }}
              type="datetime-local"
              className="form-control"
              value={this.state.time}
              step="1"
              max="2018-06-30T16:00:00"
              required
            />
          </div>
          <div className="form-group">
            <label>Description</label>
            <textarea
              name="description"
              onChange={e => {
                this.setState({ description: e.target.value });
                this.props.removeSightingAdded();
              }}
              className="form-control"
              value={this.state.description}
              maxLength="200"
            />
          </div>
          <div className="text-center">
            <button
              type="submit"
              className="btn btn-primary"
              disabled={this.props.btnDisabled}
            >
              Send
            </button>
            <p className="text-success mt-3 large">
              {this.props.sightingAdded}
            </p>
          </div>
        </form>
      </div>
    );
  }
}

export default Add;
