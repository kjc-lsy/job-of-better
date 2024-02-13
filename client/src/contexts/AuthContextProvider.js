import React, {createContext, useContext, useState} from 'react';
import api from '../apis/api';
import Cookies from 'js-cookie';
import * as auth from '../apis/auth';
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


    const loginSetting = (userData, accessToken) => {
        const {no, username, authList} = userData;
        const roleList = authList.map((auth) => auth.auth);

        // axios 객체(api.js 에서 정의됨)의 기본 헤더 설정
        api.defaults.headers.common.Authorization = `Bearer ${accessToken}`

        // 로그인 여부
        setIsLogin(true);

        // 유저 정보 세팅
        setUser({no, username, authList});

        // 권한 정보 세팅
        const updatedRoles = {isUser : false, isAdmin : false};
        roleList.forEach((role)=> {
            if(role == 'ROLE_USER') updatedRoles.isUser = true;
            if(role == 'ROLE_ADMIN') updatedRoles.isAdmin = true;
        });
        setRoles(updatedRoles);

    }

    const logout = () => {
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

    const login = async (username, password) => {
        const response = await auth.login(username, password) // 로그인 axios 요청
        const status = response.status
        const headers = response.headers
        const authorization = headers.authorization;
        const accessToken = authorization.replace("Bearer ", "")

        console.log(response)

        if( status == 200 ) {
            // 로그인 성공시 쿠키에 JWT 저장
            Cookies.set("accessToken", accessToken);

            // 로그인 유저 정보 받기
            let response  = await auth.info()
            let data = response.data

            loginSetting(data, Cookies.get("accessToken"))

            alert('로그인 성공')
        }

    };

    const value = { user, isLogin, login, logout}; // 전역으로 넘길 함수들

    return(
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )

};

// 다른 컴포넌트에서 const {isLogin, login, logout} = useContext(AuthContext); 대신 const {isLogin, login, logout} = useAuth();
export const useAuth = () => useContext(AuthContext);