import React, {createContext, useContext, useEffect, useState} from 'react';
import api from '../apis/api';
import Cookies from 'js-cookie';
import * as auth from '../apis/auth';
import {useAlert} from "../components/Alert/useAlert";

const AuthContext = createContext(null);

export const AuthContextProvider = ({children}) => {

    // 로그인 여부
    const [isLogin, setIsLogin] = useState(false);
    // 로그인 유저 정보
    const [user, setUser] = useState(null);
    // 권한 정보
    const [roles, setRoles] = useState({user: false, company: false});
    const sendAlert = useAlert();

    // useEffect를 통해 AuthContextProvider가 마운트된 모든 컴포넌트에서 이 함수를 한번 실행
    useEffect(() => {
        setLoginUser();
    }, [])

    const login = async (username, password) => {
        try {
            const response = await auth.login(username, password) // 로그인 axios 요청
            const headers = response.headers
            const authorization = headers.authorization;
            const accessToken = authorization.replace("Bearer ", "")

            // 로그인 성공시 쿠키에 JWT 저장
            Cookies.set("accessToken", accessToken);

            // axios 객체(api.js 에서 정의됨)의 기본 헤더 설정
            api.defaults.headers.common.Authorization = `Bearer ${accessToken}`

            // 로그인 유저 세팅
            setLoginUser()
        } catch (error) {
            sendAlert("error", error.response.status + " : 로그인에 실패하였습니다")
        }
    };

    const logoutSetting = () => {
        // 서버 세션 초기화
        auth.logout()

        // axios 헤더 초기화
        api.defaults.headers.common.Authorization = undefined;

        // 쿠키 초기화
        Cookies.remove("accessToken");

        // 유저 정보 초기화
        setUser(null);

        // 권한 정보 초기화
        setRoles(null);

        // 로그인 여부
        setIsLogin(false);

    };

    const setLoginUser = async () => {

        let accessToken = Cookies.get("accessToken");

        if (!accessToken) { // 토큰이 없을 시 로그아웃 처리
            logoutSetting();
            return;
        }

        // axios 객체(api.js 에서 정의됨)의 기본 헤더 설정
        api.defaults.headers.common.Authorization = `Bearer ${accessToken}`

        try {
            // 현재 로그인한 유저 정보 axios 요청
            let response = await auth.info()

            let data = response.data

            loginSetting(data) // 로그인 유저 정보를 변수에 세팅

        } catch (error) {
            if (error.response) {
                console.log(error.response.status + " : 로그인 유저 정보 불러오기 실패")
            } else {
                console.log('서버에 응답이 없습니다')
            }
        }
    }

    const loginSetting = (userData) => {
        const {idx, username, roleList, pgRegStatus, pgIdx, profileImg, name, gender,phone,birthDate} = userData
        const authList = roleList.map((auth) => auth.roleName)

        // 유저 정보 세팅
        setUser({idx, username, authList, pgRegStatus, pgIdx, profileImg, name, gender,phone,birthDate})

        // 권한 정보 세팅
        const updatedRoles = {user: false, company: false};
        roleList.forEach((role) => {
            if (role.roleName === 'ROLE_USER') updatedRoles.user = true
            if (role.roleName === 'ROLE_COMPANY') updatedRoles.company = true
        });
        setRoles(updatedRoles);

        // 로그인 여부
        setIsLogin(true)
    }

    const value = {user, isLogin, roles, login, logoutSetting, setLoginUser}; // 전역으로 넘길 함수들

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
};

// 다른 컴포넌트에서 const {isLogin, login, logout} = useContext(AuthContext); 대신 const {isLogin, login, logout} = useAuth(); 가능
export const useAuth = () => useContext(AuthContext);