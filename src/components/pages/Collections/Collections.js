import React from 'react';
import SearchField from 'react-search-field';
import collectionsData from '../../../helpers/data/collectionsData';
import authRequests from '../../../helpers/data/authRequests';
import PrintCollectionCard from '../../PrintCollectionCard/PrintCollectionCard';

import './Collections.scss';

class Collections extends React.Component {
  state = {
    collections: [],
    filteredCollections: [],
  }

  getCollections = () => {
    const uid = authRequests.getCurrentUid();
    collectionsData.getAllCollections(uid)
      .then((collections) => {
        this.setState({ collections });
        this.setState({ filteredCollections: collections });
      })
      .catch((err) => {
        console.error('error with collections GET', err);
      });
  };

  componentDidMount() {
    this.getCollections();
  }

  deleteSingleCollection = (collectionId) => {
    collectionsData.deleteCollection(collectionId)
      .then(() => {
        this.getCollections();
      });
  }


  newCollectionView = () => {
    this.props.history.push('/collections/new');
  }

  onSelect = (collectionId) => {
    this.props.history.push(`/collections/${collectionId}`);
  }

  passCollectionToEdit = (collectionId) => {
    this.setState({ editId: collectionId });
    this.props.history.push(`/collections/${collectionId}/edit`);
  }

  onChange = (value, event) => {
    const { collections } = this.state;
    const filteredCollections = [];
    event.preventDefault();
    if (!value) {
      this.setState({ filteredCollections: collections });
    } else {
      collections.forEach((collection) => {
        if (collection.name.toLowerCase().includes(value.toLowerCase())
          || collection.style.toLowerCase().includes(value.toLowerCase())
        ) {
          filteredCollections.push(collection);
        }
        this.setState({ filteredCollections });
      });
    }
  }

  render() {
    const {
      filteredCollections,
    } = this.state;

    const printCollection = filteredCollections.map(collection => (
      <PrintCollectionCard
        key={collection.id}
        collection={collection}
        deleteSingleCollection={this.deleteSingleCollection}
        passCollectionToEdit={this.passCollectionToEdit}
        onSelect={this.onSelect}
      />
    ));

    return (
      <div className='collections mx-auto animated bounceInLeft w-100'>
        <h2>SEARCH YOUR COLLECTION</h2>
        <div className='collectionWrap'>
          <SearchField
            placeholder="Search Collection By Name or Style"
            onChange={this.onChange}
            searchText=""
            classNames="collectionSearch"
          />
          <button className="addCollectionBtn" id="addCollection" onClick={this.newCollectionView}><i class="far fa-plus-square"></i>ADD ITEM</button>
        </div>
        <div className="row justify-content-center">{printCollection}</div>
      </div>
    );
  }
}

export default Collections;
