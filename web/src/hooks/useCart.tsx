import React, { createContext, useContext, useEffect, useState } from "react"
import ICar from "../models/car"
import useNotification, { NOTIFICATON_TYPES } from "./useNotification"
import useAuth from "./useAuth"
import ICart from "../models/cart"

interface IUseCart {
    add: (id: number, times: number) => Promise<void>
    decrease: (id: number) => void
    remove: (id: number) => void
    cart: ILocalCart
    pushCart: () => void
}

const context = createContext<IUseCart>({
    add: () => new Promise(() => null),
    cart: {},
    remove: () => null,
    decrease: () => null,
    pushCart: () => null
})

interface ILocalCart {
    [key: string]: ICartItem
}

export interface ICartItem {
    item: ICar,
    amount: number
}

async function fetchCarDetail(id) {
    const response = await fetch(`/api/cars/${id}`)
    if (response.status !== 200) throw `Cannot add car to cart!`
    const carDetail: ICar = await response.json()
    return carDetail
}

async function replaceCart(cart: ILocalCart) {
    const data = Object.keys(cart).map(id => ({ id: parseInt(id), amount: cart[id].amount }))
    if (!data.length) return
    const response = await fetch("/api/cart/replace", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            items: data
        }),
    })
    if (response.status !== 201) throw `Response status is ${response.status}`
}

async function getCar(id: number) {
    const response = await fetch(`/api/cars/${id}`)
    if (response.status !== 200) throw ``
    const data: ICar = await response.json()
    return data
}

function CartProvider({ children }: { children: any }) {
    const [cart, setCart] = useState<ILocalCart>({})
    const { user } = useAuth()
    const notification = useNotification()

    useEffect(() => {
        const retrieveCartFromLocalStorage = async () => {
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
                    const cart: ILocalCart = {}
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

        const retreiveCartFromBackend = async () => {
            try {
                const reponse = await fetch(`/api/cart/${user?.id}`)
                const data: { cart: ICart[] } = await reponse.json()

                const newCart: ILocalCart = {}
                data.cart.forEach((item) => {
                    if (Object.hasOwn(cart, item.id)) {
                        newCart[item.id].amount += item.quantity
                    } else {
                        newCart[item.id] = {
                            item: item.item,
                            amount: item.quantity,
                        }
                    }
                })
                setCart(newCart)
            } catch (e) {
                console.error(e)
                notification(NOTIFICATON_TYPES.ERROR, "Something happened")
            }
        }

        retrieveCartFromLocalStorage()
    }, [user])

    const add = async (id: number, times = 1) => {
        let car: ICar
        try {
            car = await getCar(id)
        } catch (e) {
            notification(NOTIFICATON_TYPES.ERROR, "Something happened")
            return
        }
        const currentAmount = cart[id] ? cart[id].amount : 0
        const quantity = car.quantity
        if (currentAmount + times > quantity) return

        try {
            if (Object.hasOwn(cart, id)) addExisting(id, times)
            else addNew(id, times)
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

    const addNew = async (id, amount) => {
        const carDetails = await fetchCarDetail(id)
        setCart(old => ({
            ...old,
            [id]: {
                item: carDetails,
                amount: amount,
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

    return <context.Provider value={{ add, cart, remove, decrease, pushCart: () => replaceCart(cart) }}>
        {children}
    </context.Provider>
}

const useCart = () => useContext(context)

export { CartProvider }
export default useCart
