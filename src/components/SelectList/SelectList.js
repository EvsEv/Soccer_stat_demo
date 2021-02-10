import React from "react";
import { MenuItem, Select } from "@material-ui/core";
import styles from "./select-list.module.scss";

export const SelectList = ({ items, value, setValue, name }) => {
    return (
        <div className={styles.select}>
            <p>Выберите доступные {name}:</p>
            <Select value={value} onChange={setValue}>
                {items.map((item) => (
                    <MenuItem value={item.code || item.id} key={item.id}>
                        {item.value || item.name}
                    </MenuItem>
                ))}
            </Select>
        </div>
    );
};
