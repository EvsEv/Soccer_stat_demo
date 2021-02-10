import { LeagueList } from "../pages/LeagueList";
import { TeamList } from "../pages/TeamList";
import { CalendarLeague } from "../pages/CalendarLeague";
import { CalendarTeam } from "../pages/CalendarTeam";
import { Route } from "react-router-dom";

export const Routes = ({ seasons }) => {
  return (
    <>
      <Route path="/" exact render={() => <LeagueList seasons={seasons} />} />
      <Route
        path="/team_list"
        exact
        render={() => <TeamList seasons={seasons} />}
      />
      <Route
        path="/team_list/:id"
        exact
        render={() => <TeamList seasons={seasons} />}
      />
      <Route
        path="/calendar_league/"
        exact
        render={() => <CalendarLeague seasons={seasons} />}
      />
      <Route
        path="/calendar_league/:id"
        exact
        render={() => <CalendarLeague seasons={seasons} />}
      />
      <Route
        path="/calendar_team"
        exact
        render={() => <CalendarTeam seasons={seasons} />}
      />
      <Route
        path="/calendar_team/:leagueId/:teamId"
        exact
        render={() => <CalendarTeam seasons={seasons} />}
      />
    </>
  );
};
