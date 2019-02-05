import React from 'react';
import { Button } from 'reactstrap';
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
      <div className="collectionDetail mx-auto">
        <div className="col-9 mt-3 mx-auto">
          <h1 className="card-header">{singleCollection.name}</h1>
          <div className="card-body">
            <img className="card-img-top" src={singleCollection.imageUrl} alt={singleCollection.name} />
            <h3 className="card-text">{singleCollection.style}</h3>
            <h3 className="card-text">{singleCollection.age}</h3>
            <Button className="btn btn-light mt-5" id="backToCollections" onClick={this.backToCollectionsView}>BACK TO COLLECTION</Button>
          </div>
        </div>
      </div>
    );
  }
}

export default CollectionDetail;
