// withAuthorization.js
import React, {useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import {useAuth} from "../../contexts/AuthContextProvider";
import {useAlert} from "../Alert/useAlert";

function withAuthorization(WrappedComponent, requiredRoles) {
    return function(props) {
        const { roles, isLogin } = useAuth();
        const navigate = useNavigate();
        const sendAlert = useAlert();

        useEffect(() => {
            if(isLogin) {
                if (!requiredRoles.some(role => roles[role])) {
                    sendAlert("error", "접근 권한이 없습니다.");
                    navigate('/auth/login');
                }
            }

        }, [isLogin]);

        return <WrappedComponent {...props} />;
    };
}

export default withAuthorization;