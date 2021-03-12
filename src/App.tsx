import React from 'react';
import { BrowserRouter } from 'react-router-dom';

import './styles/global.scss';

import Routes from './routes';

const App: React.FC = () => (
  <>
    <BrowserRouter>
      <Routes />
    </BrowserRouter>
  </>
)

export default App;
