import React, { FC, PropsWithChildren } from 'react';
import { render } from '@testing-library/react';
import type { RenderOptions } from '@testing-library/react';
import { Provider } from 'react-redux';

import { setupStore, type AppStore } from '../store';
import { initialState, type State } from '../store/slice';

interface ExtendedRenderOptions extends Omit<RenderOptions, 'queries'> {
  preloadedState?: Partial<State>;
  store?: AppStore;
};

export function renderWithProviders(
  ui: React.ReactElement,
  extendedRenderOptions: ExtendedRenderOptions = {},
) {
  const {
    preloadedState = {},
    store = setupStore({ Calendar: { ...initialState, ...preloadedState } }),
    ...renderOptions
  } = extendedRenderOptions;

  const Wrapper: FC<PropsWithChildren> = ({ children }) => <Provider store={store}>{children}</Provider>;

  return {
    store,
    ...render(ui, { wrapper: Wrapper, ...renderOptions }),
  };
};
