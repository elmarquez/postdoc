import configureStoreDev from './store.dev';
import configureStoreProd from './store.prod';

// const store = null;
const selectedConfigureStore =
  process.env.NODE_ENV === 'production'
    ? configureStoreProd
    : configureStoreDev;

export const { configureStore } = selectedConfigureStore;
export const { history } = selectedConfigureStore;

function createStore() {}

export { createStore };
