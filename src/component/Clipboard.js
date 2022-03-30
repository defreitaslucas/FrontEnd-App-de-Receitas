import React from 'react';
import PropTypes from 'prop-types';
import copy from 'copy-to-clipboard';

function Clipboard({ textToCopy, image, name }) {
  function copyToClipboard() {
    copy(textToCopy);
    window.alert('Link copied!');
  }

  return (
    <input
      type="image"
      src={ image }
      alt={ name }
      onClick={ copyToClipboard }
    />
  );
}

Clipboard.propTypes = {
  textToCopy: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
};

export default Clipboard;
