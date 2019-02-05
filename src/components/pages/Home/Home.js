import React from 'react';
import './Home.scss';

class Home extends React.Component {
  changeView = (e) => {
    const view = e.currentTarget.id;
    this.props.history.push(`/${view}`);
  }

  render() {
    return (
      <div className='home mx-auto'>
        <div className="deck card-deck mt-5">
          <div className="card border-dark" id="clues" onClick={this.changeView}>
            <div className="card-body text-center">
              <h4 className="card-title"><i className="fas fa-glass-whiskey fa-7x"></i></h4>
              <h6 className="card-subtitle mb-2 text-muted">CLUES</h6>
              <p className="card-text">Find A Clue</p>
            </div>
          </div>
          <div className="card border-dark" id="collections" onClick={this.changeView}>
            <div className="card-body text-center">
              <h4 className="card-title"><i className="fas fa-trophy fa-7x"></i></h4>
              <h6 className="card-subtitle mb-2 text-muted">COLLECTION</h6>
              <p className="card-text">Browse Collection</p>
            </div>
          </div>
          <div className="card border-dark" id="locations" onClick={this.changeView}>
            <div className="card-body text-center">
              <h4 className="card-title"><i className="fas fa-globe-americas fa-7x"></i></h4>
              <h6 className="card-subtitle mb-2 text-muted">LOCATIONS</h6>
              <p className="card-text">Find A Location</p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Home;
