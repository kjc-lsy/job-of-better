import React, {createContext, useContext, useState} from 'react';

const AuthContext = createContext(null);

export const AuthContextProvider = ({children}) => {
    const [isLogin, setIsLogin] = useState(false);
    const [user, setUser] = useState(null);

    const login = (email, password) => { // api에서 응답을 받고 context를 업데이트만 한다.
        const response = '이곳에 axios로 api 사용하기';

        setUser(''); // context에 유저 정보 저장
        setIsLogin(true); // 로그인 성공
    };

    const logout = () => {
        setIsLogin(false);
    };

    const value = { user, isLogin, login, logout};

    return(
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )

};

// 다른 컴포넌트에서 const {isLogin, login, logout} = useContext(AuthContext); 대신 const {isLogin, login, logout} = useAuth();
export const useAuth = () => useContext(AuthContext);