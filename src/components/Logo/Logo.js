import React from "react";
import { NavLink } from "react-router-dom";

import styles from "./logo.module.scss";

export const Logo = () => {
    return (
        <div className={styles.logo}>
            <NavLink to="/" className={styles.link}>
                <span className={styles.name}>SoccerStat</span>
            </NavLink>
        </div>
    );
};
