import React, { createContext, useContext, useEffect, useState } from "react"
import IUser from "../models/user"
import useSWR, { mutate } from "swr"

interface IUseAuth {
    user?: IUser | null
    loading: boolean
    refresh: CallableFunction
    logout: CallableFunction
}

const defaultValue = Object.freeze({ user: null, refresh: () => null, logout: () => null, loading: false })

const context = createContext<IUseAuth>(defaultValue)

function AuthProvider({ children }) {
    const { data: user, isValidating: loading } = useSWR<IUser | null>("/api/auth/me", async (endpoint) => {
        try {
            const response = await fetch(endpoint)
            if (response.status !== 200) throw `Logout`
            const data = await response.json()
            console.info(data)
            return data
        } catch (e) {
            console.error(e)
            return null
        }
    })

    const logout = async () => {
        await fetch("/api/auth/logout", {
            method: "POST",
        })
        mutate("/api/auth/me")
    }

    return <context.Provider value={{ user, refresh: () => mutate("/api/auth/me"), logout, loading }}>
        {children}
    </context.Provider>
}

const useAuth = () => useContext(context)

export { AuthProvider }
export default useAuth
