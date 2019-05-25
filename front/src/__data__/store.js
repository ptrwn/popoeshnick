import { createStore } from 'redux';
import rootReducer from './reducers/rootReducer';

export const store = createStore(rootReducer,
// eslint-disable-next-line no-undef
window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());