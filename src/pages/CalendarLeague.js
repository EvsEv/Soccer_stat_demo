import { Button, TextField } from "@material-ui/core";
import React, { useState, useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { SelectList } from "../components/SelectList/SelectList";
import {
    clearMatches,
    filterLeagueMatches,
    getLeagueMatches,
} from "../redux/actions";
import styles from "./pages.module.scss";

export const CalendarLeague = ({ seasons }) => {
    const [leagueValue, setLeagueValue] = useState("");
    const [seasonValue, setSeasonValue] = useState("");
    const [dateFrom, setDateFrom] = useState("");
    const [dateTo, setDateTo] = useState("");
    const [searchValue, setSearchValue] = useState("");
    const { id } = useParams();
    const history = useHistory();
    const dispatch = useDispatch();
    const leagues = useSelector((state) => state.league.leagues);
    const matches = useSelector((state) => state.match.filteredMatches);

    useEffect(() => {
        dispatch(clearMatches());
    }, []);

    useEffect(() => {
        if (id) {
            setLeagueValue(id);
        }
    }, [id]);

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

        history.push(`/calendar_league/${leagueValue}${newUrl}`);
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

    const printMatches = useMemo(() => {
        const matchDay = { day: "", printed: false };
        const matchTour = { tour: "", printed: false };

        return matches.map((item) => {
            if (matchDay.day !== item.utcDate.split("T")[0]) {
                matchDay.day = item.utcDate.split("T")[0];
                matchDay.printed = false;
            } else {
                matchDay.printed = true;
            }

            if (matchTour.tour !== item.matchday) {
                matchTour.tour = item.matchday;
                matchTour.printed = false;
            } else {
                matchTour.printed = true;
            }

            return (
                <div key={item.id} className={styles.match}>
                    {!matchTour.printed && (
                        <p className={styles.tour}>{matchTour.tour} тур</p>
                    )}
                    {!matchDay.printed && (
                        <p className={styles.day}>{matchDay.day}</p>
                    )}
                    {item.status === "FINISHED" ? (
                        <p className={styles.finished}>
                            {item.homeTeam.name}
                            {item.score.fullTime.homeTeam}
                            {item.score.fullTime.awayTeam}
                            {item.awayTeam.name}
                        </p>
                    ) : (
                        <p className={styles.versus}>
                            {item.homeTeam.name} : {item.awayTeam.name}
                        </p>
                    )}
                </div>
            );
        });
    }, [matches]);
    console.log(printMatches);
    return (
        <div className={styles.content}>
            <h2 className={styles.centerTitle}>Календарь лиг</h2>
            <form className={styles.form} onSubmit={formSubmitHandler}>
                <SelectList
                    name="Лиги"
                    items={leagues}
                    value={leagueValue}
                    setValue={(event) => setLeagueValue(event.target.value)}
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
                        !(leagueValue && (seasonValue || (dateFrom && dateTo)))
                    }
                    type="submit"
                >
                    Показать подходящие матчи
                </button>
            </form>
            <TextField
                label="Поиск..."
                value={searchValue}
                onChange={inputChangeHandler}
                fullWidth
            />
            <div>{printMatches}</div>
        </div>
    );
};
