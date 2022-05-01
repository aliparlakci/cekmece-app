import React, { createContext, useContext, useEffect, useState } from "react"
import IUser from "../models/user"

interface IUseAuth {
    user: IUser | null
    loading: boolean
    refresh: CallableFunction
    logout: CallableFunction
}

const defaultValue = Object.freeze({ user: null, refresh: () => null, logout: () => null, loading: false })

const context = createContext<IUseAuth>(defaultValue)

function AuthProvider({ children }) {
    const [user, setUser] = useState<IUser | null>(null)
    const [loading, setLoading] = useState(false)

    const refresh = async () => {
        setLoading(true)
        try {
            const response = await fetch("/api/auth/me")
            if (response.status !== 200) throw `Logout`
            const data = await response.json()
            setUser(data)
        } catch (e) {
            setUser(null)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        refresh()
    }, [])


    const logout = async () => {
        await fetch("/api/auth/logout", {
            method: "POST",
        })
        refresh()
    }

    return <context.Provider value={{ user, refresh, logout, loading }}>
        {children}
    </context.Provider>
}

const useAuth = () => useContext(context)

export { AuthProvider }
export default useAuth
