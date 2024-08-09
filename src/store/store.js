import { applyMiddleware, legacy_createStore as createStore } from 'redux';
import logger from 'redux-logger';
import reducer from './reducers/index.js';

export const myStore = createStore(reducer, applyMiddleware(logger)); //kendi storeunuzu create ediniz
