import React, { useContext, useEffect, useState } from 'react'

interface DataContextValue {
    auth: authState | undefined
}

interface authState {
    token: string | null,
    user: {
        id: string,
        email: string,
        profilePic: string
    }
}

let DataContext = React.createContext<DataContextValue>({ auth: undefined })

export let useData = () => {

    return useContext(DataContext)


}


const DataProvider: React.FC = ({ children }) => {
    let [auth, setAuth] = useState<authState>()
    let [loading, setLoading] = useState(true)

    useEffect(() => {
        let jsonUserx: any = localStorage.getItem("__userx")
        let userx = JSON.parse(jsonUserx)
        let token = localStorage.getItem('__tokenx')

        setAuth({
            token,
            user: {
                id: userx.id,
                email: userx.email,
                profilePic: userx.profilePic
            }
        })

        setLoading(false)





        // localStorage.setItem("__tokenx", login.token)
        // localStorage.setItem("", JSON.stringify(login.user))
    }, [localStorage.getItem('__userx')])

    let value = {
        auth
    }
    return (
        <DataContext.Provider value={value}>
            {!loading && children}
        </DataContext.Provider>
    )
}

export default DataProvider;
