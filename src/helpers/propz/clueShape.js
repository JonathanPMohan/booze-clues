import PropTypes from 'prop-types';

const clueShape = PropTypes.shape({
  name: PropTypes.string.isRequired,
  imageUrl: PropTypes.string.isRequired,
  location: PropTypes.string.isRequired,
  style: PropTypes.string.isRequired,
  notes: PropTypes.string.isRequired,
  uid: PropTypes.string.isRequired,
});

const clueOptionalShape = PropTypes.oneOfType([
  PropTypes.shape({
    nope: PropTypes.string.isRequired,
  }),
  clueShape,
]);

export default { clueShape, clueOptionalShape };
