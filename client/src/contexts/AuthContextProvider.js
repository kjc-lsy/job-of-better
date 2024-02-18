import React, {createContext, useContext, useState, useEffect} from 'react';
import api from '../apis/api';
import Cookies from 'js-cookie';
import * as auth from '../apis/auth';
import {Exception} from "sass";
import {useLocation} from "react-router-dom";
const AuthContext = createContext(null);

/**
 * 로그인 기능 세팅하기
 */

export const AuthContextProvider = ({children}) => {
    // 로그인 여부
    const [isLogin, setIsLogin] = useState(false);
    // 로그인 유저 정보
    const [user, setUser] = useState(null);
    // 권한 정보
    const [roles, setRoles] = useState({isUser : false, isAdmin : false});
    // 이메일값 저장
    const [email, setEmail] = useState(null);
    // 현재 페이지 위치 저장
    const location = useLocation();

    // useEffect를 통해 AuthContextProvider가 마운트된 모든 컴포넌트에서 이 함수를 한번 실행
    useEffect(()=>{
        console.log("로그인 유저 정보 가져오는 중")
        setLoginUser();
    }, [])

    const login = async (username, password) => {
        try {
            const response = await auth.login(username, password) // 로그인 axios 요청
            const status = response.status
            const headers = response.headers
            const authorization = headers.authorization;
            const accessToken = authorization.replace("Bearer ", "")

            // 로그인 성공시 쿠키에 JWT 저장
            Cookies.set("accessToken", accessToken);

            // axios 객체(api.js 에서 정의됨)의 기본 헤더 설정
            api.defaults.headers.common.Authorization = `Bearer ${accessToken}`

            await setLoginUser() // 로그인 설정이 완료 될 때 까지 기다림
        } catch (error) {
            alert(error.response.status + " : 로그인에 실패하였습니다")
        }
    };

    const logoutSetting = () => {
        // axios 헤더 초기화
        api.defaults.headers.common.Authorization = undefined;

        // 쿠키 초기화
        Cookies.remove("accessToken");

        // 로그인 여부
        setIsLogin(false);

        // 유저 정보 초기화
        setUser(null);

        // 권한 정보 초기화
        setRoles(null);
    };

    const setLoginUser = async () => {
        // 로그인 성공시 쿠키에 있던 JWT 토큰 가져옴
        let accessToken = Cookies.get("accessToken");
        if(!accessToken) { // 토큰이 없을 시 로그아웃 처리하고 함수 실행 종료
            logoutSetting();
            return;
        }

        try {
            // axios 객체(api.js 에서 정의됨)의 기본 헤더 설정
            api.defaults.headers.common.Authorization = `Bearer ${accessToken}`

            // 현재 로그인한 유저 정보 axios 요청
            let response = await auth.info()

            let data = response.data

            loginSetting(data) // 로그인 유저 정보를 변수에 세팅

        }catch (error) {
            console.log(error.response.status + " : 로그인 유저 정보 불러오기 실패")
        }
    }

    const loginSetting = (userData) => {
        const {idx, username, roleList} = userData
        const authList = roleList.map((auth) => auth.roleName)

        // 로그인 여부
        setIsLogin(true)

        // 유저 정보 세팅
        setUser({idx, username, authList})

        // 권한 정보 세팅
        const updatedRoles = {isUser : false, isAdmin : false};
        roleList.forEach((role)=> {
            if(role.roleName == 'ROLE_USER') updatedRoles.isUser = true
            if(role.roleName == 'ROLE_ADMIN') updatedRoles.isAdmin = true
        });
        setRoles(updatedRoles);
    }

    const value = { user, isLogin, roles, login, logoutSetting}; // 전역으로 넘길 함수들

    return(
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )

};

// 다른 컴포넌트에서 const {isLogin, login, logout} = useContext(AuthContext); 대신 const {isLogin, login, logout} = useAuth(); 가능
export const useAuth = () => useContext(AuthContext);