import {
  GET_TEAM_LIST,
  SET_LOADING,
  CLEAR_LOADING,
  FILTER_TEAM_LIST,
  CLEAR_TEAMS,
} from "../types";

const initialState = {
  teams: [],
  filteredTeams: [],
  loading: false,
};

export const team = (state = initialState, action) => {
  switch (action.type) {
    case GET_TEAM_LIST:
      return {
        ...state,
        teams: action.payload.teams,
        filteredTeams: action.payload.teams,
      };
    case FILTER_TEAM_LIST:
      return { ...state, filteredTeams: action.payload };
    case CLEAR_TEAMS:
      return { ...state, teams: [], filteredTeams: [] };
    case SET_LOADING:
      return { ...state, loading: true };
    case CLEAR_LOADING:
      return { ...state, loading: false };
    default:
      return state;
  }
};
