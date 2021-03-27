import {
  SUBSCRIPTIONS_FETCH_REQUEST,
  SUBSCRIPTIONS_FETCH_SUCCESS,
  SUBSCRIPTIONS_FETCH_FAIL,
  SUBSCRIPTIONS_FEED_REQUEST,
  SUBSCRIPTIONS_FEED_SUCCESS,
  SUBSCRIPTIONS_FEED_FAIL,
} from '../constants/subscriptionsConstants';

export const fetchSubscriptionsReducer = (
  state = { subscriptions: [], lastFetched: 0 },
  action
) => {
  switch (action.type) {
    case SUBSCRIPTIONS_FETCH_REQUEST:
      return { ...state, loading: true };
    case SUBSCRIPTIONS_FETCH_SUCCESS:
      return {
        ...state,
        subscriptions: action.payload.subscriptions,
        loading: false,
        lastFetched: action.payload.lastFetched,
      };
    case SUBSCRIPTIONS_FETCH_FAIL:
      return { ...state, error: action.payload };
    default:
      return state;
  }
};

export const latestVideosReducer = (state = { videos: [] }, action) => {
  switch (action.type) {
    case SUBSCRIPTIONS_FEED_REQUEST:
      return { ...state, loading: true };
    case SUBSCRIPTIONS_FEED_SUCCESS:
      return { ...state, loading: false, videos: action.payload };
    case SUBSCRIPTIONS_FEED_FAIL:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};
