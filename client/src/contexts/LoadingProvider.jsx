import {createContext, useEffect, useState} from "react";

export const LoadingContext = createContext({
    loading : false,
    setLoading : () => {}
})
export default function LoadingProvider(props) {
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        setLoading(loading);
    }, [loading]);
    return (
        <LoadingContext.Provider value={{loading, setLoading}}>
            {props.children}
        </LoadingContext.Provider>
    )
}
