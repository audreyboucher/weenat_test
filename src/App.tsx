import React, { FC } from 'react';

import { MonthView, DayOverview, MonthSwitch } from './components';

import './styles/global.scss';

const App: FC = () => (
  <main role="main">
    <MonthSwitch />
    <MonthView />
    <DayOverview />
  </main>
);

export default App;
