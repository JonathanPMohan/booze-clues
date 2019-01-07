import React, { Component } from 'react';
import { Button } from 'reactstrap';
import './App.scss';


class App extends Component {
  render() {
    return (
      <div className="App">
        <button className="btn btn-danger">HELP</button>
        <Button
          tag="a"
          color="info"
          size="large"
          href="http://google.com"
          target="_blank"
        >GOOGLE</Button>
      </div>
    );
  }
}

export default App;
