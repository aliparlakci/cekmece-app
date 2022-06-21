import React, { createContext, useContext, useEffect, useState } from "react"

import ICar from "../models/car"
import useNotification, { NOTIFICATON_TYPES } from "./useNotification"
import useAuth from "./useAuth"

interface IUseWishlist {
    add: (id: number) => Promise<void>
    remove: (id: number) => void
    wishlist: IWishlist
    toggle: (id: number) => Promise<void>
    exists: (carId: number) => boolean
    refresh: () => Promise<void>
}

const context = createContext<IUseWishlist>({
    add: () => new Promise(() => null),
    wishlist: [],
    remove: () => null,
    toggle: () => new Promise(() => null),
    exists: () => false,
    refresh: () => new Promise(() => null),
})

type IWishlist = IWishlistItem[]

export interface IWishlistItem {
    id: number
    item: ICar
}

async function fetchCarDetail(id) {
    const response = await fetch(`/api/cars/${id}`)
    if (response.status !== 200) throw `Cannot add car to cart!`
    const carDetail: ICar = await response.json()
    return carDetail
}

function WishlistProvider({ children }: { children: any }) {
    const [wishlist, setWishlist] = useState<IWishlist>([])
    const { user } = useAuth()
    const notification = useNotification()

    const refreshWishlist = async () => {
        try {
            const response = await fetch(`/api/wishlist/${user?.id}`)
            const data: { wishlist: IWishlistItem[] } = await response.json()

            setWishlist(data.wishlist.map((item) => {
                return {
                    id: item.id,
                    item: item.item,
                }
            }))
        } catch (e) {
            console.error(e)
            notification(NOTIFICATON_TYPES.ERROR, "Something happened")
        }
    }

    useEffect(() => {
        refreshWishlist()
    }, [user])

    const add = async (id: number) => {
        let car: ICar
        try {
            car = await fetchCarDetail(id)
        } catch (e) {
            notification(NOTIFICATON_TYPES.ERROR, "Something happened")
            return
        }

        try {
            const response = await fetch(`/api/wishlist/${user?.id}/add/${id}`, {
                method: "POST"
            })
            if (response.status !== 200) {
                throw `Something happened!`
            }
        } catch (e) {
            notification(NOTIFICATON_TYPES.ERROR, JSON.stringify(e))
        }

        await refreshWishlist()
    }

    const remove = async (wishlistItemId: number) => {
        try {
            const response = await fetch(`/api/wishlist/${user?.id}/remove/${wishlistItemId}`, {
                method: "POST"
            })
            if (response.status !== 200) {
                throw `Cannot delete the item!`
            }
        } catch (e) {
            notification(NOTIFICATON_TYPES.ERROR, JSON.stringify(e))
        }

        await refreshWishlist()
    }

    const toggle = async (carId: number) => {
        const wishlistId = wishlist.reduce((prev, item) => {
            if (prev === 0) {
                return item.item.id === carId ? item.id : 0
            }
            return prev
        }, 0)
        console.log({id: wishlistId})
        if (wishlistId) {
            await remove(wishlistId)
        } else {
            await add(carId)
        }
    }

    const exists = (carId: number) => {
        return wishlist.reduce((prev, item) => prev || item.item.id === carId, false)
    }

    return <context.Provider value={{ add, remove, wishlist, toggle, exists, refresh: refreshWishlist }}>
        {children}
    </context.Provider>
}

const useWishlist = () => useContext(context)

export { WishlistProvider }
export default useWishlist
