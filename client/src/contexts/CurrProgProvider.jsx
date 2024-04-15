import React, {createContext, useContext, useState} from 'react';

const CurrProgContext = createContext(null);

export const CurrProgProvider = ({children}) => {
    const [currProg, setCurrProg] = useState(localStorage.getItem("program"));

    return (
        <CurrProgContext.Provider value={{currProg, setCurrProg}}>
            {children}
        </CurrProgContext.Provider>
    );
};

export default CurrProgProvider;

export const useCurrProg = () => useContext(CurrProgContext)