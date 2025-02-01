import { combineReducers, createStore } from 'redux';
import {reducer} from './reducers/reducer';
import Immutable from 'immutable';

export const store = createStore(
  combineReducers({reducer}),
  //@ts-ignore
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__({
    serialize: { 
      immutable: Immutable
    }
  })
);