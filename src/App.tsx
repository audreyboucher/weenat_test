import React from 'react';

import { MonthView, DayOverview } from './components';

import './styles/global.scss';

const App = () => (
  <main role="main">
    <MonthView />
    <DayOverview />
  </main>
);

export default App;
