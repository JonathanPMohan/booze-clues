import PropTypes from 'prop-types';

const collectionShape = PropTypes.shape({
  name: PropTypes.string.isRequired,
  imageUrl: PropTypes.string.isRequired,
  style: PropTypes.string.isRequired,
  age: PropTypes.string.isRequired,
  uid: PropTypes.string.isRequired,
});

const collectionOptionalShape = PropTypes.oneOfType([
  PropTypes.shape({
    nope: PropTypes.string.isRequired,
  }),
  collectionShape,
]);

export default { collectionShape, collectionOptionalShape };
