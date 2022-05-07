import React, { createContext, useContext, useEffect, useState } from "react"
import ICar from "../models/car"
import useNotification, { NOTIFICATON_TYPES } from "./useNotification"
import useAuth from "./useAuth"

interface IUseCart {
    add: (id: number, times: number) => Promise<void>
    decrease: (id: number) => void
    remove: (id: number) => void
    cart: ICart
}

const context = createContext<IUseCart>({
    add: () => new Promise(() => null),
    cart: {},
    remove: () => null,
    decrease: () => null,
})

interface ICart {
    [key: string]: ICartItem
}

export interface ICartItem {
    item: ICar,
    amount: number
}

const fetchCarDetail = async (id) => {
    const response = await fetch(`/api/cars/${id}`)
    if (response.status !== 200) throw `Cannot add car to cart!`
    const carDetail: ICar = await response.json()
    return carDetail
}


function CartProvider({ children }: { children: any }) {
    const [cart, setCart] = useState<ICart>({})
    const [isLocal, setIsLocal] = useState(true)

    const notification = useNotification()

    const { user } = useAuth()
    useEffect(() => {
        setIsLocal(user === null)
    }, [user])

    useEffect(() => {
        const retrieveCart = async () => {
            const rawCart = localStorage.getItem("cart")
            const oldCart: any = JSON.parse(rawCart || "[]")
            if (oldCart) {
                const newCart = oldCart.map(async ({ id, amount }): Promise<ICartItem> => {
                    const response = await fetch(`/api/cars/${id}`)
                    if (response.status !== 200) throw ``
                    const data: ICar = await response.json()
                    return { item: data, amount: amount as number }
                })
                try {
                    const cart: ICart = {}
                    const resolvedCart: ICartItem[] = await Promise.all(newCart)
                    resolvedCart.forEach(item => {
                        if (item.item.id)
                            cart[item.item.id] = item
                    })
                    setCart(cart)
                } catch (e) {
                    notification(NOTIFICATON_TYPES.ERROR, "Something happened while fetching cart")
                }
            }
        }

        retrieveCart()
    }, [])

    const add = async (id: number, times = 1) => {
        try {
            if (Object.hasOwn(cart, id)) addExisting(id, times)
            else addNew(id)
        } catch (e) {
            notification(NOTIFICATON_TYPES.ERROR, JSON.stringify(e))
        }
    }

    const addExisting = (id, amount) => {
        setCart(old => ({
            ...old,
            [id]: {
                item: old[id].item,
                amount: old[id].amount + amount,
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

    const decrease = async (id) => {
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

    const remove = async (id) => {
        setCart(old => ({
            ...old,
            [id]: undefined,
        }))
    }

    useEffect(() => {
        localStorage.setItem("cart", JSON.stringify(Object.keys(cart).map(id => ({ id, amount: cart[id].amount }))))
    }, [cart])

    return <context.Provider value={{ add, cart, remove, decrease }}>
        {children}
    </context.Provider>
}

const useCart = () => useContext(context)

export { CartProvider }
export default useCart
