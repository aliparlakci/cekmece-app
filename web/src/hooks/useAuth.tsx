import React, { createContext, useContext, useEffect, useState } from "react"
import IUser from "../models/user"

interface IUseAuth {
    user: IUser | null
    refresh: CallableFunction
    logout: CallableFunction
}

const context = createContext<IUseAuth>({ user: null, refresh: () => null, logout: () => null })

function AuthProvider({ children }) {
    const [user, setUser] = useState<IUser|null>(null)

    const refresh = async () => {
        try {
            const response = await fetch("/api/auth/me")
            if (response.status !== 200) throw `Logout`
            const data = await response.json()
            setUser(data)
        } catch (e) {
            setUser(null)
        }
    }

    useEffect(() => {
        refresh()
    }, [])


    const logout = async () => {
        await fetch("/api/auth/logout", {
            method: "POST"
        })
        refresh()
    }

    return <context.Provider value={{ user, refresh, logout }}>
        {children}
    </context.Provider>
}

const useAuth = () => useContext(context)

export { AuthProvider }
export default useAuth
