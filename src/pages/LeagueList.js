import { TextField } from "@material-ui/core";
import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import { LeagueItem } from "../components/LeagueItem/LeagueItem";
import { SelectList } from "../components/SelectList/SelectList";
import { filterLeagueList } from "../redux/actions";
import styles from "./pages.module.scss";

export const LeagueList = ({ seasons }) => {
    const [searchValue, setSearchValue] = useState("");
    const [seasonValue, setSeasonValue] = useState("");
    const leagues = useSelector((state) => state.league.filteredLeagues);
    const dispatch = useDispatch();

    const inputChangeHandler = (event) => {
        const { value } = event.target;
        setSearchValue(value);
        dispatch(filterLeagueList(value));
    };

    return (
        <div>
            <h1 className={styles.title}>Список ведущих Европейских лиг </h1>
            <form class={styles.simpleForm}>
                <SelectList
                    name="сезоны"
                    items={seasons}
                    value={seasonValue}
                    setValue={(event) => setSeasonValue(event.target.value)}
                />
            </form>
            <TextField
                label="Поиск по названию"
                value={searchValue}
                onChange={inputChangeHandler}
                fullWidth
            />
            <div className={styles.wrapper}>
                {leagues.map((item) => (
                    <LeagueItem
                        league={item}
                        key={item.id}
                        currentSeason={seasonValue}
                    />
                ))}
            </div>
        </div>
    );
};
