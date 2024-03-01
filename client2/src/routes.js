
import Home from "./views/Home.js"
import Register from "views/examples/Register.js";
import Login from "views/examples/Login.js";
import StudentList from "./views/examples/StudentList";
import MyPage from "./views/examples/MyPage.js";
import Dashboard from "./views/Dashboard.js";
import UserProfile from "./views/UserProfile";
import TableList from "./views/TableList";
import Map from "./views/Map";


var routes = [
  {
    path: "/index",
    name: "Dashboard",
    icon: "ni ni-tv-2 text-primary",
    component: <Dashboard />,
    layout: "/admin",
  },
  {
    path: "/home",
    name: "Home",
    icon: "ni ni-bullet-list-67 text-red",
    component: <Home />,
    layout: "/user",
  },
  {
    path: "/mypage",
    name: "Mypage",
    icon: "ni ni-bullet-list-67 text-red",
    component: <MyPage />,
    layout: "/user",
  },
  {
    path: "/studentList",
    name: "StudentList",
    icon: "ni ni-bullet-list-67 text-red",
    component: <StudentList />,
    layout: "/admin",
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
];
export default routes;
