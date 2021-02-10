import React from "react";
import { Link } from "react-router-dom";
import styles from "./team-item.module.scss";

export const TeamItem = ({ team, leagueValue, seasonValue }) => {
    return (
        <li className={styles.team}>
            <div className={styles.wrapper}>
                <picture className={styles.logo}>
                    <img src={team.crestUrl} alt={team.name} />
                </picture>
                <p className={styles.name}>{team.name}</p>
            </div>
            <Link
                to={`/calendar_team/${leagueValue}/${team.id}?season=${seasonValue}`}
                className={styles.link}
            >
                Календарь команды
            </Link>
        </li>
    );
};
