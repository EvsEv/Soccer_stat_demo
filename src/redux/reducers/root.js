import { combineReducers } from "redux";
import { league } from "./league";
import { team } from "./team";
import { match } from "./match";

export const rootReducer = combineReducers({
    league,
    team,
    match,
});
