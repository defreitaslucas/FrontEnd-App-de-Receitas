import React from 'react';
import { createMemoryHistory } from 'history';
import { render } from '@testing-library/react';
import { Router } from 'react-router-dom';

function renderWithRouter(ComponentToRender) {
  const History = createMemoryHistory();
  const returnFromRender = render(
    <Router history={ History }>
      {ComponentToRender}
    </Router>,
  );
  return { history: History, ...returnFromRender };
}

export default renderWithRouter;
