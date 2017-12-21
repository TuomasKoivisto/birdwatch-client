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
      listReversed: true
    };

    this.updateSightings();

    this.listingHandler = this.listingHandler.bind(this);

    this.addHandler = this.addHandler.bind(this);

    this.birdNotFoundHandler = this.birdNotFoundHandler.bind(this);

    this.removeBirdNotFound = this.removeBirdNotFound.bind(this);

    this.listReverseHandler = this.listReverseHandler.bind(this);
  }

  listingHandler() {
    this.setState({
      sightings: this.state.sightings.reverse()
    });
  }

  addHandler() {
    this.updateSightings();
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

  updateSightings() {
    $.ajax({
      url: 'https://morning-sands-39347.herokuapp.com/sightings',
      dataType: 'json',
      method: 'GET'
    }).then(response => {
      if (this.state.listReversed === true) {
        this.setState({ sightings: response.reverse() });
      } else {
        this.setState({ sightings: response });
      }
    });
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
            />
            <View
              sightings={this.state.sightings}
              listingHandler={this.listingHandler}
              listReverseHandler={this.listReverseHandler}
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
        />
      </div>
    );
  }
}

export default App;
