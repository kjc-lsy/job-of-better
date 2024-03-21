import routes from "../routes";
import {Route, useLocation} from "react-router-dom";
import React from "react";

export const getRoutes = (routes,location) => {
    const pathname = (location.pathname).split("/")[1];
    //console.log(pathname);
    return routes.map((prop, key) => {
        if (prop.layout === "/"+pathname) {
            return (
                <Route path={prop.path} element={prop.component} key={key} exact/>
            );
        } else {
            return null;
        }
    });
};

export const getBrandText = (location) => {
    for (let i = 0; i < routes.length; i++) {
        if (location.pathname.indexOf(routes[i].layout + routes[i].path) !== -1) {
            return routes[i].name;
        }
    }
    return "Brand";
};

export const getPathname = (location) => {
    for (let i = 0; i < routes.length; i++) {
        if (location.pathname.indexOf(routes[i].layout + routes[i].path) !== -1) {
            return (routes[i].path).slice(1);
        }
    }
    return "";
};