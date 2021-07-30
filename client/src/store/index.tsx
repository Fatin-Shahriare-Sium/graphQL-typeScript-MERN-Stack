import React, { useEffect, useState } from 'react'

interface DataContextValue {
    auth: authState | undefined
}

let DataContext = React.createContext<DataContextValue | null>(null)

interface authState {
    token: string | null,
    user: {
        id: string,
        email: string,
        profilePic: string
    }
}

const DataProvider: React.FC = ({ children }) => {
    let [auth, setAuth] = useState<authState>()

    useEffect(() => {
        let jsonUserx: any = localStorage.getItem("__userx")
        let userx = JSON.parse(jsonUserx)
        let token = localStorage.getItem('__tokenx')

        console.log();
        setAuth({
            token,
            user: {
                id: userx.id,
                email: userx.email,
                profilePic: userx.profilePic
            }
        })






        // localStorage.setItem("__tokenx", login.token)
        // localStorage.setItem("", JSON.stringify(login.user))
    }, [localStorage.getItem('__userx')])

    let value = {
        auth
    }
    return (
        <DataContext.Provider value={value}>
            {children}
        </DataContext.Provider>
    )
}

export default DataProvider;
