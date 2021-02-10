import {
  GET_LEAGUE_LIST,
  SET_LOADING,
  CLEAR_LOADING,
  FILTER_LEAGUE_LIST,
} from "../types";

const initialState = {
  leagues: [],
  filteredLeagues: [],
  loading: false,
};

export const league = (state = initialState, action) => {
  switch (action.type) {
    case GET_LEAGUE_LIST:
      return {
        ...state,
        leagues: action.payload.competitions,
        filteredLeagues: action.payload.competitions,
      };
    case FILTER_LEAGUE_LIST:
      return { ...state, filteredLeagues: action.payload };
    case SET_LOADING:
      return { ...state, loading: true };
    case CLEAR_LOADING:
      return { ...state, loading: false };
    default:
      return state;
  }
};
