import {createContext, useContext, useEffect, useState} from "react";

export const LoadingContext = createContext({
    loading : false,
    setLoading : () => {}
})

export const useLoading = () => useContext(LoadingContext)
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
