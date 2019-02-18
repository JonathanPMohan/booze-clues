import React from 'react';
import collectionsData from '../../helpers/data/collectionsData';
import './CollectionDetail.scss';

class CollectionDetail extends React.Component {
  state = {
    singleCollection: [],
  }

  backToCollectionsView = (e) => {
    this.props.history.push('/collections');
  }

  componentDidMount() {
    const firebaseId = this.props.match.params.id;
    collectionsData.getSingleCollection(firebaseId)
      .then((singleCollection) => {
        this.setState({ singleCollection });
      });
  }

  render() {
    const {
      singleCollection,
    } = this.state;

    return (
      <div className="collectionDetail mx-auto w-75">
        <div className="col-9 mt-3 mx-auto">
          <h1 className="card-header">{singleCollection.name}</h1>
          <div className="card-body">
            <img className="collectionImage" src={singleCollection.imageUrl} alt={singleCollection.name} />
            <h2 className="card-text">{singleCollection.style}</h2>
            <h2 className="card-text">{singleCollection.age}</h2>
            <div className="backToCollection svg-wrapper" onClick={this.backToCollectionsView}>
              <svg height="60" width="150" xmlns="http://www.w3.org/2000/svg">
                <rect id="shape" height="30" width="150" />
              </svg>
              <div id="text">
                <span className="spot">BACK TO LIST</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default CollectionDetail;
