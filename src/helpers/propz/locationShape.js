import PropTypes from 'prop-types';

const locationShape = PropTypes.shape({
  name: PropTypes.string.isRequired,
  imageUrl: PropTypes.string.isRequired,
  address: PropTypes.string.isRequired,
  phoneNumber: PropTypes.string.isRequired,
  website: PropTypes.string.isRequired,
  uid: PropTypes.string.isRequired,
});

const locationOptionalShape = PropTypes.oneOfType([
  PropTypes.shape({
    nope: PropTypes.string.isRequired,
  }),
  locationShape,
]);

export default { locationShape, locationOptionalShape };
