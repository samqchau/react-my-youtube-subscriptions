import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import {
  fetchSubscriptionsReducer,
  latestVideosReducer,
} from './reducers/subscriptionsReducer';

const reducer = combineReducers({
  subscriptions: fetchSubscriptionsReducer,
  latestVideos: latestVideosReducer,
});

const subscriptionsFromLocalStorage = localStorage.getItem('userSubscriptions')
  ? JSON.parse(localStorage.getItem('userSubscriptions'))
  : {};

const initialState = {
  subscriptions: subscriptionsFromLocalStorage,
};

const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
