import {
  GET_LEAGUE_LIST,
  SET_LOADING,
  CLEAR_LOADING,
  GET_TEAM_LIST,
  GET_LEAGUE_MATCH,
  FILTER_LEAGUE_LIST,
  FILTER_TEAM_LIST,
  FILTER_LEAGUE_MATCHES,
  CLEAR_MATCHES,
  CLEAR_TEAMS,
} from "./types";
import { fetchData } from "../api";
import { createFilter } from "react-search-input";

export function getLeagueList() {
  return async (dispatch) => {
    const countries = ["ENG", "FRA", "DEU", "ITA", "NLD", "PRT", "ESP"];
    try {
      dispatch({ type: SET_LOADING });
      const leagues = await fetchData("competitions?plan=TIER_ONE");
      leagues.competitions = leagues.competitions.filter((item) =>
        countries.find((country) => country === item.area.countryCode)
      );
      leagues.count = leagues.competitions.length;

      dispatch({ type: GET_LEAGUE_LIST, payload: leagues });
      dispatch({ type: CLEAR_LOADING });
    } catch (e) {
      console.log(e);
    }
  };
}

export function filterLeagueList(filter) {
  return (dispatch, getState) => {
    const KEYS_TO_FILTER = ["name", "area.name"];

    const filteredList = getState().league.leagues.filter(
      createFilter(filter, KEYS_TO_FILTER)
    );
    dispatch({ type: FILTER_LEAGUE_LIST, payload: filteredList });
  };
}

export function getTeamList(id, season) {
  return async (dispatch, getState) => {
    try {
      dispatch({ type: SET_LOADING });

      const teamList = await fetchData(
        `competitions/${id}/teams?season=${season}`
      );

      dispatch({ type: GET_TEAM_LIST, payload: teamList });
      dispatch({ type: CLEAR_LOADING });
    } catch (e) {
      console.log(e);
    }
  };
}

export function filterTeamList(filter) {
  return (dispatch, getState) => {
    const KEYS_TO_FILTER = ["name", "shortName", "tla", "area.name"];

    const filteredList = getState().team.teams.filter(
      createFilter(filter, KEYS_TO_FILTER)
    );
    dispatch({ type: FILTER_TEAM_LIST, payload: filteredList });
  };
}

export function getLeagueMatches(id, season, from, to) {
  return async (dispatch) => {
    try {
      dispatch({ type: SET_LOADING });

      const league = await fetchData(
        `competitions/${id}/matches?season=${season}&dateFrom=${from}&dateTo=${to}`
      );

      dispatch({ type: GET_LEAGUE_MATCH, payload: league.matches });
      dispatch({ type: CLEAR_LOADING });
    } catch (e) {
      console.log(e);
    }
  };
}

export function filterLeagueMatches(filter) {
  return (dispatch, getState) => {
    const KEYS_TO_FILTER = ["homeTeam.name", "awayTeam.name", "matchday"];

    const filteredList = getState().match.matches.filter(
      createFilter(filter, KEYS_TO_FILTER)
    );
    dispatch({ type: FILTER_LEAGUE_MATCHES, payload: filteredList });
  };
}

export function clearTeams() {
  return {
    type: CLEAR_TEAMS,
  };
}

export function clearMatches() {
  return {
    type: CLEAR_MATCHES,
  };
}
