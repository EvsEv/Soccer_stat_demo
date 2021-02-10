import React from "react";
import { HashRouter } from "react-router-dom";
import { Scrollbars } from "react-custom-scrollbars";

import MainLayout from "../../layouts/main/MainLayout";
import { ScrollToTop } from "../ScrollToTop/ScrollToTop";

export const App = () => {
  return (
    <HashRouter basename="/">
      <Scrollbars style={{ width: "100vw", height: "100vh" }}>
        <ScrollToTop />
        <MainLayout />
      </Scrollbars>
    </HashRouter>
  );
};
