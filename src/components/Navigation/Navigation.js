import { NavLink } from "react-router-dom";
import styles from "./navigation.module.scss";
import React from "react";

export const Navigation = ({ navigation }) => {
    return (
        <nav className={styles.menu}>
            <ul className={styles.list}>
                {navigation.map((navItem) => (
                    <li key={navItem.id}>
                        <NavLink
                            to={navItem.url}
                            className={styles.item}
                            activeClassName={styles.active}
                            exact={navItem.exact}
                        >
                            {navItem.title}
                        </NavLink>
                    </li>
                ))}
            </ul>
        </nav>
    );
};
