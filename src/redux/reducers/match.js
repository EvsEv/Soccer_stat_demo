import {
  CLEAR_MATCHES,
  FILTER_LEAGUE_MATCHES,
  GET_LEAGUE_MATCH,
} from "../types";

const initialState = {
  matches: [],
  filteredMatches: [],
  loading: false,
};

export const match = (state = initialState, action) => {
  switch (action.type) {
    case GET_LEAGUE_MATCH:
      return {
        ...state,
        matches: action.payload,
        filteredMatches: action.payload,
      };
    case FILTER_LEAGUE_MATCHES:
      return { ...state, filteredMatches: action.payload };
    case CLEAR_MATCHES:
      return { ...state, matches: [], filteredMatches: [] };
    default:
      return state;
  }
};
