import React from "react";
import { Link } from "react-router-dom";

import styles from "./league-item.module.scss";

export const LeagueItem = ({ league, currentSeason }) => {
    return (
        <div className={styles.item}>
            <picture className={styles.background}>
                <img src={league.area.ensignUrl} alt={league.area.name} />
            </picture>
            <h3 className={styles.name}>{league.name}</h3>
            <p className={styles.country}>{league.area.name}</p>
            <div className={styles.more}>
                <Link
                    to={
                        currentSeason
                            ? `/team_list/${league.code}?season=${currentSeason}`
                            : `/team_list/${league.code}`
                    }
                    className={styles.link}
                    title="Посмотреть список команд"
                >
                    Команды
                </Link>
                <Link
                    to={
                        currentSeason
                            ? `/calendar_league/${league.code}?season=${currentSeason}`
                            : `/calendar_league/${league.code}`
                    }
                    className={styles.link}
                    title="Посмотреть календарь сезона лиги"
                >
                    Календарь
                </Link>
            </div>
        </div>
    );
};
