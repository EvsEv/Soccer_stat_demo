import { TextField } from "@material-ui/core";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { SelectList } from "../components/SelectList/SelectList";
import {
    clearMatches,
    clearTeams,
    filterLeagueMatches,
    getLeagueMatches,
    getTeamList,
} from "../redux/actions";
import styles from "./pages.module.scss";

export const CalendarTeam = ({ seasons }) => {
    const [leagueValue, setLeagueValue] = useState("");
    const [teamValue, setTeamValue] = useState("");
    const [seasonValue, setSeasonValue] = useState("");
    const [dateFrom, setDateFrom] = useState("");
    const [dateTo, setDateTo] = useState("");
    const [searchValue, setSearchValue] = useState("");
    const { leagueId, teamId } = useParams();
    const history = useHistory();
    const dispatch = useDispatch();
    const leagues = useSelector((state) => state.league.leagues);
    const teams = useSelector((state) => state.team.teams);
    const matches = useSelector((state) => state.match.filteredMatches);

    useEffect(() => {
        if (leagueId) {
            dispatch(getTeamList(leagueId, seasonValue));
        }
        dispatch(clearTeams());
        dispatch(clearMatches());
    }, []);

    useEffect(() => {
        if (leagueId) {
            setLeagueValue(leagueId);
        }

        if (teamId) {
            setTeamValue(teamId);
        }
    }, [leagueId, teamId]);

    useEffect(() => {
        let params = history.location.search.split("&");

        params.forEach((param) => {
            switch (true) {
                case param.includes("season"):
                    setSeasonValue(param.split("=")[1]);
                    break;
                case param.includes("dateFrom"):
                    setDateFrom(param.split("=")[1]);
                    break;
                case param.includes("dateTo"):
                    setDateTo(param.split("=")[1]);
                    break;
            }
        });
    }, [history]);

    useEffect(() => {
        if (leagueValue) {
            dispatch(getTeamList(leagueValue, seasonValue));
        }
    }, [leagueValue]);

    const formSubmitHandler = () => {
        const query = [];
        if (seasonValue) {
            query.push(`season=${seasonValue}`);
        }

        if (dateFrom && dateTo) {
            query.push(`dateFrom=${dateFrom}`);
            query.push(`dateTo=${dateTo}`);
        }

        let newUrl = "";

        query.forEach((item, idx) => {
            idx === 0 ? (newUrl += `?${item}`) : (newUrl += `&${item}`);
        });

        history.push(`/calendar_team/${leagueValue}/${teamValue}${newUrl}`);
        dispatch(getLeagueMatches(leagueValue, seasonValue, dateFrom, dateTo));
    };

    const handleSeasonChange = (event) => {
        setSeasonValue(event.target.value);
        setDateFrom("");
        setDateTo("");
    };

    const handleDateFromChange = (event) => {
        setDateFrom(event.target.value);
        setSeasonValue("");
    };

    const handleDateToChange = (event) => {
        setDateTo(event.target.value);
        setSeasonValue("");
    };

    const clearDateHandler = () => {
        setDateFrom("");
        setDateTo("");
    };

    const inputChangeHandler = (event) => {
        const { value } = event.target;
        setSearchValue(value);
        dispatch(filterLeagueMatches(value));
    };

    return (
        <div>
            <h2 className={styles.title}>Календарь команд</h2>
            <form className={styles.form} onSubmit={formSubmitHandler}>
                <SelectList
                    name="Лиги"
                    items={leagues}
                    value={leagueValue}
                    setValue={(event) => setLeagueValue(event.target.value)}
                />

                <SelectList
                    name="Команды"
                    items={teams}
                    value={teamValue}
                    setValue={(event) => setTeamValue(event.target.value)}
                />
                <SelectList
                    name="Сезоны"
                    items={seasons}
                    value={seasonValue}
                    setValue={handleSeasonChange}
                />
                <TextField
                    label="Начало периода"
                    type="date"
                    value={dateFrom}
                    onChange={handleDateFromChange}
                    InputLabelProps={{
                        shrink: true,
                    }}
                />
                <TextField
                    label="Конец периода"
                    type="date"
                    value={dateTo}
                    onChange={handleDateToChange}
                    InputLabelProps={{
                        shrink: true,
                    }}
                />
                <button
                    className={styles.button}
                    type="reset"
                    onClick={clearDateHandler}
                    disabled={!(dateFrom || dateTo)}
                >
                    Сбросить период
                </button>
                <button
                    className={styles.acept}
                    disabled={
                        !(
                            leagueValue &&
                            teamValue &&
                            (seasonValue || (dateFrom && dateTo))
                        )
                    }
                    type="submit"
                >
                    Показать подходящие матчи
                </button>
            </form>

            <TextField
                type="search"
                label="Поиск по названию команды или туру"
                value={searchValue}
                onChange={inputChangeHandler}
                fullWidth
            />

            <div>
                {matches.map(
                    (item) =>
                        (item.homeTeam.id === Number(teamValue) ||
                            item.awayTeam.id === Number(teamValue)) && (
                            <div key={item.id} className={styles.match}>
                                <p className={styles.tour}>
                                    {item.matchday} тур
                                </p>
                                <p className={styles.day}>
                                    {item.utcDate.split("T")[0]}
                                </p>
                                {item.status === "FINISHED" ? (
                                    <p className={styles.finished}>
                                        {item.homeTeam.name}{" "}
                                        {item.score.fullTime.homeTeam} :{" "}
                                        {item.score.fullTime.awayTeam}{" "}
                                        {item.awayTeam.name}
                                    </p>
                                ) : (
                                    <p className={styles.versus}>
                                        {item.homeTeam.name} :{" "}
                                        {item.awayTeam.name}
                                    </p>
                                )}
                            </div>
                        )
                )}
            </div>
        </div>
    );
};
