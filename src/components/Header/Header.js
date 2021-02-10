import { IconButton } from "@material-ui/core";
import React from "react";
import { Logo } from "../Logo/Logo";
import { Navigation } from "../Navigation/Navigation";
import styles from "./header.module.scss";
import MenuIcon from "@material-ui/icons/Menu";

export const Header = ({ toggleMenu, navigation }) => {
    return (
        <header className={styles.header}>
            <div className="container">
                <div className={styles.burger}>
                    <IconButton
                        edge="start"
                        color="success.main"
                        aria-label="menu"
                        onClick={toggleMenu}
                    >
                        <MenuIcon />
                    </IconButton>
                </div>
                <div className={styles.wrapper}>
                    <Logo />
                    <Navigation navigation={navigation} />
                </div>
            </div>
        </header>
    );
};
