import React, { createContext, useContext, useEffect, useState } from "react"
import ICar from "../models/car"
import useNotification, { NOTIFICATON_TYPES } from "./useNotification"
import useAuth from "./useAuth"

interface IUseCart {
    add: (id: number) => Promise<void>
    decrease: (id: number) => void
    cart: ICart
}

const context = createContext<IUseCart>({
    add: () => new Promise(() => null),
    cart: {},
    decrease: () => null
})

interface ICart {
    [key: string]: ICartItem
}

interface ICartItem {
    item: ICar,
    amount: number
}

const fetchCarDetail = async (id) => {
    const response = await fetch(`/api/cars/${id}`)
    if (response.status !== 200) throw `Cannot add car to cart!`
    const carDetail: ICar = await response.json()
    return carDetail
}

function CartProvider({ children }) {
    const [cart, setCart] = useState<ICart>({})
    const [isLocal, setIsLocal] = useState(true)

    const notification = useNotification()

    const { user } = useAuth()
    useEffect(() => {
        setIsLocal(user === null)
    }, [user])

    useEffect(() => {
        const oldCart = localStorage.getItem("cart")
        if (oldCart)
            setCart(JSON.parse(oldCart))
    }, [])

    const add = async (id: number) => {
        try {
            if (Object.hasOwn(cart, id)) addExisting(id)
            else addNew(id)
        } catch (e) {
            notification(NOTIFICATON_TYPES.ERROR, JSON.stringify(e))
        }
    }

    const addExisting = (id) => {
        setCart(old => ({
            ...old,
            [id]: {
                item: old[id].item,
                amount: old[id].amount + 1,
            },
        }))
    }

    const addNew = async (id) => {
        const carDetails = await fetchCarDetail(id)
        setCart(old => ({
            ...old,
            [id]: {
                item: carDetails,
                amount: 1,
            },
        }))
    }

    const decrease = (id) => {
        if (Object.hasOwn(cart, id)) {
            if (cart[id].amount <= 1) {
                setCart(old => ({
                    ...old,
                    [id]: undefined,
                }))
            } else {
                setCart(old => ({
                    ...old,
                    [id]: {
                        ...cart[id],
                        amount: cart[id].amount - 1,
                    },
                }))
            }
        }
    }

    useEffect(() => {
        localStorage.setItem("cart", JSON.stringify(cart))
    }, [cart])

    return <context.Provider value={{ add, cart, decrease }}>
        {children}
    </context.Provider>
}

const useCart = () => useContext(context)

export { CartProvider }
export default useCart
