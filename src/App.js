import React, { Component } from 'react';
import './include/bootstrap';
import './App.css';
import Header from './components/header';
import Add from './components/add';
import View from './components/view';
import BodyMobile from './components/body-mobile';

const $ = window.jQuery;

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      sightings: [],
      birdNotFound: '',
      listReversed: true,
      sightingAdded: '',
      btnDisabled: false
    };

    this.updateSightings();

    this.listingHandler = this.listingHandler.bind(this);

    this.addHandler = this.addHandler.bind(this);

    this.birdNotFoundHandler = this.birdNotFoundHandler.bind(this);

    this.removeBirdNotFound = this.removeBirdNotFound.bind(this);

    this.listReverseHandler = this.listReverseHandler.bind(this);

    this.sightingAddedHandler = this.sightingAddedHandler.bind(this);

    this.removeSightingAdded = this.removeSightingAdded.bind(this);

    this.BtnDisabledHandler = this.BtnDisabledHandler.bind(this);

    this.BtnEnabledHandler = this.BtnEnabledHandler.bind(this);
  }

  listingHandler() {
    this.setState({
      sightings: this.state.sightings.reverse()
    });
  }

  addHandler() {
    this.updateSightings();
  }

  sightingAddedHandler() {
    this.setState({ sightingAdded: 'Sighting Added' });
  }

  removeSightingAdded() {
    this.setState({ sightingAdded: '' });
  }

  birdNotFoundHandler() {
    this.setState({
      birdNotFound: "Can't add a sighting with this bird value"
    });
  }

  removeBirdNotFound() {
    this.setState({
      birdNotFound: ''
    });
  }

  listReverseHandler() {
    if (this.state.listReversed === true) {
      this.setState({ listReversed: false });
    } else if (this.state.listReversed === false) {
      this.setState({ listReversed: true });
    }
  }
  BtnDisabledHandler() {
    this.setState({ btnDisabled: true });
  }

  BtnEnabledHandler() {
    this.setState({ btnDisabled: false });
  }

  updateSightings() {
    $.ajax({
      url: 'https://morning-sands-39347.herokuapp.com/sightings',
      dataType: 'json',
      method: 'GET'
    }).then(response => {
      var sorted = this.mergeSort(response);
      if (this.state.listReversed === true) {
        this.setState({ sightings: sorted.reverse() });
      } else {
        this.setState({ sightings: sorted });
      }
    });
  }

  mergeSort(arr) {
    var len = arr.length;
    if (len < 2) return arr;
    var mid = Math.floor(len / 2),
      left = arr.slice(0, mid),
      right = arr.slice(mid);
    //send left and right to the mergeSort to broke it down into pieces
    //then merge those
    return this.merge(this.mergeSort(left), this.mergeSort(right));
  }

  merge(left, right) {
    var result = [],
      lLen = left.length,
      rLen = right.length,
      l = 0,
      r = 0;
    while (l < lLen && r < rLen) {
      if (
        new Date(left[l].dateTime).getTime() <
        new Date(right[r].dateTime).getTime()
      ) {
        result.push(left[l++]);
      } else {
        result.push(right[r++]);
      }
    }
    //remaining part needs to be addred to the result
    return result.concat(left.slice(l)).concat(right.slice(r));
  }

  render() {
    return (
      <div className="container-fluid">
        <Header />
        <section className="text-center" />
        <div className="clearfix">
          <div className="desktop">
            <Add
              addHandler={this.addHandler}
              birdNotFoundHandler={this.birdNotFoundHandler}
              removeBirdNotFound={this.removeBirdNotFound}
              birdNotFound={this.state.birdNotFound}
              sightingAdded={this.state.sightingAdded}
              sightingAddedHandler={this.sightingAddedHandler}
              removeSightingAdded={this.removeSightingAdded}
              BtnDisabledHandler={this.BtnDisabledHandler}
              BtnEnabledHandler={this.BtnEnabledHandler}
              btnDisabled={this.state.btnDisabled}
            />
            <View
              sightings={this.state.sightings}
              listingHandler={this.listingHandler}
              listReverseHandler={this.listReverseHandler}
              removeSightingAdded={this.removeSightingAdded}
            />
          </div>
        </div>
        <BodyMobile
          sightings={this.state.sightings}
          listingHandler={this.listingHandler}
          listReverseHandler={this.listReverseHandler}
          addHandler={this.addHandler}
          birdNotFoundHandler={this.birdNotFoundHandler}
          removeBirdNotFound={this.removeBirdNotFound}
          birdNotFound={this.state.birdNotFound}
          sightingAdded={this.state.sightingAdded}
          sightingAddedHandler={this.sightingAddedHandler}
          removeSightingAdded={this.removeSightingAdded}
          BtnDisabledHandler={this.BtnDisabledHandler}
          BtnEnabledHandler={this.BtnEnabledHandler}
          btnDisabled={this.state.btnDisabled}
        />
      </div>
    );
  }
}

export default App;
