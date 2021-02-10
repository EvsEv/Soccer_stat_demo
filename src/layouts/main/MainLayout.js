import React, { useEffect, useState } from "react";
import { NavLink, Switch } from "react-router-dom";
import { useDispatch } from "react-redux";

import { getLeagueList } from "../../redux/actions";
import { Routes } from "../../routes";
import { Header } from "../../components/Header/Header";
import { Footer } from "../../components/Footer/Footer";
import styles from "./main-layout.module.scss";
import { Drawer, List, ListItem, ListItemText } from "@material-ui/core";

function MainLayout() {
    const navigation = [
        { id: 1, title: "Список лиг", url: "/", exact: true },
        { id: 2, title: "Список команд", url: "/team_list" },
        { id: 3, title: "Календарь лиг", url: "/calendar_league" },
        { id: 4, title: "Календарь команд", url: "/calendar_team" },
    ];

    const [seasons, setSeasons] = useState([]);
    const [isOpenMenu, setIsOpenMenu] = useState(false);
    const dispatch = useDispatch();

    useEffect(() => {
        const current = new Date().getFullYear();
        const newSeasons = [];
        for (let i = 2018; i < current; i++) {
            const season = `${i}/${i + 1}`;
            newSeasons.push({ id: i, value: season });
        }
        setSeasons(newSeasons);
        dispatch(getLeagueList());
    }, []);

    const toggleMenu = (isOpen) => (event) => {
        if (
            event.type === "keydown" &&
            (event.key === "Tab" || event.key === "Shift")
        ) {
            return;
        }
        setIsOpenMenu(isOpen);
    };

    return (
        <div className={styles["main-layout"]}>
            <Header toggleMenu={toggleMenu(true)} navigation={navigation} />

            <main className="main">
                <div className="container">
                    <Switch>
                        <Routes seasons={seasons} />
                    </Switch>
                </div>
            </main>
            <Drawer anchor="left" open={isOpenMenu} onClose={toggleMenu(false)}>
                <div
                    role="presentation"
                    onClick={toggleMenu(false)}
                    onKeyDown={toggleMenu(false)}
                >
                    <List>
                        {navigation.map((text) => (
                            <ListItem button key={text}>
                                <NavLink to={text.url} exact={text.exact}>
                                    {text.title}
                                </NavLink>
                            </ListItem>
                        ))}
                    </List>
                </div>
            </Drawer>
            <Footer />
        </div>
    );
}

export default MainLayout;
