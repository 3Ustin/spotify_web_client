import React from 'react'
import { render as rtlRender, RenderOptions } from '@testing-library/react'
import { Provider } from 'react-redux'
import store, { initialRootState, RootState } from './store'

interface StoreConfig extends RenderOptions {
  preloadedState: RootState,
  reduxStore: typeof store,
}

/**
 * Wraps the react-testing-library render function to automatically
 * wrap any component with a Provider so that they can access an actual
 * implementation of our Redux store from tests
 * 
 * This will make it much easier to write tests for components that depend
 * on redux because we will not have to worry about setting up a mock
 * provider for each component
 */
function render(
  ui: React.ReactElement,
  {
    preloadedState,
    reduxStore,
    ...renderOptions
  }: StoreConfig = {
    preloadedState: initialRootState,
    reduxStore: store
  }
): ReturnType<typeof rtlRender> {
  function Wrapper({ children }: { children: React.ReactElement<any, string | React.JSXElementConstructor<any>>}) {
    return <Provider store={store}>{children}</Provider>
  }
  return rtlRender(ui, { wrapper: Wrapper, ...renderOptions })
}

export * from '@testing-library/react'
export { render }