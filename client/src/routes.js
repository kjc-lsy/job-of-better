import Login from "./views/auth/Login";
import Register from "./views/auth/Register";
import MemberList from "./views/company/memberList/MemberList";
import ComCoverLetter from "./views/company/ComCoverLetter";
import Home from "./views/company/Home";
import UserProfile from "./views/user/UserProfile";
import UserModify from "./views/user/UserModify";
import React from "react";
import RegisterChoice from "./views/auth/RegisterChoice";
import CompanyRegister from "./views/auth/RegisterCompany";
import CoverLetter from "./views/user/CoverLetter";
import UserProgram from "./views/user/program/Program";
import CompanyProgram from "./views/company/program/Program";
import Icons from "./views/common/Icons";
import CompanyProfile from "./views/company/CompanyProfile";
import ProgramInfo from "./views/user/ProgramInfo";
import InterviewManager from "./views/company/InterviewManager";

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
    component: <Register/>,
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
    cate: "",
    icon: "tim-icons icon-chart-pie-36",
    component: <Home />,
    layout: "/company",
  },
  {
    path: "/program/:search?",
    name: "교육 프로그램",
    cate: "program",
    icon: "tim-icons icon-components",
    component: <CompanyProgram />,
    layout: "/company",
  },
  {
    path: "/member-list",
    name: "학생목록",
    cate: "student",
    icon: "tim-icons icon-bullet-list-67",
    component: <MemberList />,
    layout: "/company",
  },
  {
    path: "/com-cover-letter",
    name: "자소서 항목",
    cate: "student",
    icon: "tim-icons icon-notes",
    component: <ComCoverLetter />,
    layout: "/company",
  },
  // {
  //   path: "/icons",
  //   name: "Icons",
  //   icon: "tim-icons icon-zoom-split",
  //   component: <Icons />,
  //   layout: "/company",
  // },
  // {
  //   path: "/typo",
  //   name: "Typography",
  //   icon: "tim-icons icon-zoom-split",
  //   component: <Typography />,
  //   layout: "/company",
  // },
  {
    path: "/company-profile",
    name: "회사 프로필",
    cate: "",
    icon: "ni ni-building",
    component: <CompanyProfile />,
    layout: "/company",
  },
  {
    path: "/interview-manager",
    name: "면접 관리",
    cate: "student",
    icon: "tim-icons icon-badge",
    component: <InterviewManager />,
    layout: "/company",
  },
  /*{
    path: "/home",
    name: "Home",
    cate: "",
    icon: "tim-icons icon-chart-pie-36",
    component: <Home />,
    layout: "/user",
  },*/
  {
    path: "/program",
    name: "교육 프로그램",
    cate: "",
    icon: "tim-icons icon-components",
    component: <UserProgram />,
    layout: "/user",
  },
  {
    path: "/user-profile",
    name: "my Home",
    cate: "mypg",
    icon: "tim-icons icon-single-02",
    component: <UserProfile />,
    layout: "/user",
  },
  {
    path: "/user-modify",
    name: "내 정보 수정",
    cate: "mypg",
    icon: "tim-icons icon-single-02",
    component: <UserModify />,
    layout: "/user",
  },
  {
    path: "/cover-letter",
    name: "자기소개서",
    cate: "myJobInfo",
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
  {
    path: "/program-info",
    name: "내 프로그램",
    cate: "myJobInfo",
    icon: "tim-icons icon-components",
    component: <ProgramInfo/>,
    layout: "/user",
  }

];

export default routes;
