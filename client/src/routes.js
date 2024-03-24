import Login from "./views/auth/Login";
import Register from "./views/auth/Register";
import MemberList from "./views/company/MemberList";
import ComCoverLetter from "./views/company/ComCoverLetter";
import Icons from "./views/common/Icons";
import Home from "./views/common/Home";
import UserProfile from "./views/user/UserProfile";
import React from "react";
import Typography from "./views/common/Typography";
import RegisterChoice from "./views/auth/RegisterChoice";
import CompanyRegister from "./views/auth/RegisterCompany";
import CoverLetter from "./views/user/CoverLetter";
import UserProgram from "./views/user/program/Program";
import CompanyProgram from "./views/company/program/Program";


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
    path: "/register-company",
    name: "RegisterCompany",
    icon: "ni ni-circle-08 text-pink",
    component: <CompanyRegister />,
    layout: "/auth",
  },
  {
    path: "/register-choice",
    name: "RegisterChoice",
    icon: "ni ni-circle-08 text-pink",
    component: <RegisterChoice />,
    layout: "/auth",
  },
  {
    path: "/home",
    name: "Home",
    icon: "tim-icons icon-chart-pie-36",
    component: <Home />,
    layout: "/company",
  },
  {
    path: "/member-list",
    name: "학생목록",
    icon: "tim-icons icon-bullet-list-67",
    component: <MemberList />,
    layout: "/company",
  },
  {
    path: "/program",
    name: "교육 프로그램",
    icon: "tim-icons icon-components",
    component: <CompanyProgram />,
    layout: "/company",
  },
  {
    path: "/com-cover-letter",
    name: "자소서 항목",
    icon: "tim-icons icon-notes",
    component: <ComCoverLetter />,
    layout: "/company",
  },
  {
    path: "/icons",
    name: "Icons",
    icon: "tim-icons icon-zoom-split",
    component: <Icons />,
    layout: "/company",
  },
  {
    path: "/typo",
    name: "Typography",
    icon: "tim-icons icon-zoom-split",
    component: <Typography />,
    layout: "/company",
  },
  {
    path: "/user-profile",
    name: "회사 프로필",
    icon: "tim-icons icon-single-02",
    component: <UserProfile />,
    layout: "/company",
  },
  {
    path: "/user-profile",
    name: "유저 프로필",
    icon: "tim-icons icon-single-02",
    component: <UserProfile />,
    layout: "/user",
  },
  {
    path: "/program",
    name: "교육 프로그램",
    icon: "tim-icons icon-components",
    component: <UserProgram />,
    layout: "/user",
  },
  {
    path: "/cover-letter",
    name: "자기소개서",
    icon: "tim-icons icon-single-copy-04",
    component: <CoverLetter />,
    layout: "/user",
  },

  {
    path: "/icons",
    name: "Icons",
    icon: "tim-icons icon-puzzle-10",
    component: <Icons />,
    layout: "/user",
  },
];

export default routes;