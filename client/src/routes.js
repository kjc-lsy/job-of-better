import Home from "./views/Home.js"
import Register from "views/Register.js";
import Login from "views/Login.js";
import UserProfile from "./views/UserProfile";
import TableList from "./views/TableList";
import Map from "./views/Map";
import Icons from "./views/Icons";
import Rtl from "./views/Rtl";
import Typography from "./views/Typography";
import MemberList from "./views/MemberList";
import ComCoverLetter from "./views/admin/ComCoverLetter";

var routes = [
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
    path: "/member-list",
    name: "학생목록",
    icon: "tim-icons icon-bullet-list-67",
    component: <MemberList />,
    layout: "/admin",
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
    path: "/home",
    name: "Home",
    icon: "tim-icons icon-chart-pie-36",
    component: <Home />,
    layout: "/user",
  },
  {
    path: "/user-profile",
    name: "User Profile",
    rtlName: "ملف تعريفي للمستخدم",
    icon: "tim-icons icon-single-02",
    component: <UserProfile />,
    layout: "/user",
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
  {
    path: "/comcoverletter",
    name: "자소서 항목",
    icon: "tim-icons icon-puzzle-10",
    component: <ComCoverLetter />,
    layout: "/admin",
  },
];

export default routes;