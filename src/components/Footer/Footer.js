import React from "react";
import Icon from "@material-ui/core/Icon";
import TwitterIcon from "@material-ui/icons/Twitter";
import FacebookIcon from "@material-ui/icons/Facebook";
import InstagramIcon from "@material-ui/icons/Instagram";

import styles from "./footer.module.scss";

const siteName = "SoccerStat";

const socialLinks = [
  {
    id: 1,
    title: "instagram",
    url: "#",
    icon: <InstagramIcon />,
  },
  {
    id: 2,
    title: "facebook",
    url: "#",
    icon: <FacebookIcon />,
  },
  {
    id: 3,
    title: "twitter",
    url: "#",
    icon: <TwitterIcon />,
  },
];

export const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className="container">
        <div className={styles.wrapper}>
          <p className={styles.sign} title={siteName}>
            &copy; {new Date().getFullYear()} {siteName}
          </p>
          <ul className={styles.social}>
            {socialLinks.map((socialItem) => {
              return (
                <li key={socialItem.id}>
                  <a
                    className={styles.link}
                    href={socialItem.url}
                    target="_blank"
                    rel="noreferrer noopener"
                  >
                    <Icon>{socialItem.icon}</Icon>
                  </a>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </footer>
  );
};
