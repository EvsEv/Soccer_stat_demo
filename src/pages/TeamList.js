import { TextField } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory, useParams } from "react-router-dom";
import { SelectList } from "../components/SelectList/SelectList";
import { TeamItem } from "../components/TeamItem/TeamItem";
import { clearTeams, filterTeamList, getTeamList } from "../redux/actions";
import styles from "./pages.module.scss";

export const TeamList = ({ seasons }) => {
    const [leagueValue, setLeagueValue] = useState("");
    const [seasonValue, setSeasonValue] = useState("");
    const [searchValue, setSearchValue] = useState("");
    const { id } = useParams();
    const history = useHistory();
    const dispatch = useDispatch();
    const leagues = useSelector((state) => state.league.leagues);
    const teams = useSelector((state) => state.team.filteredTeams);

    useEffect(() => {
        dispatch(clearTeams());
    }, []);

    useEffect(() => {
        if (id) {
            setLeagueValue(id);
        }
    }, [id]);

    useEffect(() => {
        let season = history.location.search.split("?season=")[1];

        if (!season) {
            setSeasonValue(new Date().getFullYear() - 1);
            season = new Date().getFullYear() - 1;
        } else {
            setSeasonValue(season);
        }

        if (id) {
            dispatch(getTeamList(id, season));
        }
    }, [history]);

    const formSubmitHandler = () => {
        history.push(`/team_list/${leagueValue}?season=${seasonValue}`);
        dispatch(getTeamList(leagueValue, seasonValue));
    };

    const inputChangeHandler = (event) => {
        const { value } = event.target;
        setSearchValue(value);
        dispatch(filterTeamList(value));
    };

    return (
        <div>
            <h2>Список команд</h2>
            <form class={styles.simpleForm} onSubmit={formSubmitHandler}>
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
                    setValue={(event) => setSeasonValue(event.target.value)}
                />
                <button disabled={!(leagueValue && seasonValue)}>
                    Показать команды
                </button>
            </form>
            <TextField
                label="Поиск по названию"
                value={searchValue}
                onChange={inputChangeHandler}
                fullWidth
            />
            <ul className={styles.wrapper}>
                {teams.map((team) => (
                    <TeamItem
                        key={team.id}
                        team={team}
                        leagueValue={leagueValue}
                        seasonValue={seasonValue}
                    />
                ))}
            </ul>
        </div>
    );
};
