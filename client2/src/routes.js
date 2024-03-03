
import Home from "./views/Home.js"
import Register from "views/Register.js";
import Login from "views/Login.js";
import UserProfile from "./views/UserProfile";
import TableList from "./views/TableList";
import Map from "./views/Map";
import Icons from "./views/Icons";


var routes = [
  {
    path: "/home",
    name: "Home",
    icon: "tim-icons icon-chart-pie-36",
    component: <Home />,
    layout: "/user",
  },
  {
    path: "/login",
    name: "Login",
    icon: "ni ni-key-25 text-info",
    component: <Login />,
    layout: "/auth",
  },
  {
    path: "/register",
    name: "Register",
    icon: "ni ni-circle-08 text-pink",
    component: <Register />,
    layout: "/auth",
  },
  {
    path: "/map",
    name: "Map",
    rtlName: "خرائط",
    icon: "tim-icons icon-pin",
    component: <Map />,
    layout: "/admin",
  },
  {
    path: "/user-profile",
    name: "User Profile",
    rtlName: "ملف تعريفي للمستخدم",
    icon: "tim-icons icon-single-02",
    component: <UserProfile />,
    layout: "/admin",
  },
  {
    path: "/tables",
    name: "Table List",
    rtlName: "قائمة الجدول",
    icon: "tim-icons icon-puzzle-10",
    component: <TableList />,
    layout: "/admin",
  },
  {
    path: "/icons",
    name: "Icons",
    rtlName: "قائمة الجدول",
    icon: "tim-icons icon-puzzle-10",
    component: <Icons />,
    layout: "/user",
  },
];
export default routes;
