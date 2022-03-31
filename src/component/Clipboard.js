import React from 'react';
import PropTypes from 'prop-types';
import copy from 'copy-to-clipboard';

function Clipboard({ text, image, name }) {
  function copyToClipboard() {
    copy(text);
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
  text: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
};

export default Clipboard;
