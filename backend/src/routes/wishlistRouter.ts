import { RequestHandler, Router } from "express"
import { StatusCodes } from "http-status-codes"
import CarService from "../services/carService"
import CategoryService from "../services/categoryService"
import UserService from "../services/userService"
import Context from "../utils/context"
import WishlistService from "../services/wishlistService"

function getWishlist(userService: UserService,  wlService: WishlistService) {
    return async function (req, res, next) {
        const userId = req.params.userId
        const wishlist = await wlService.getWishlist(userId)

        if (wishlist) {
            res.status(200).json({ user: userId, wishlist })
        } else {
            res.status(404).json({})
        }
    }
}

function addToWishlist(userService: UserService, wlService: WishlistService) {
    return async function (req, res, next) {
        const carId = parseInt(req.params.carId)
        const userId = req.params.userId

        const ctx: Context | null = Context.get(req)
        if (ctx === null) {
            res.status(StatusCodes.NOT_FOUND).json()
            return
        }

        const user = ctx.user
        if (user === null) {
            res.status(StatusCodes.NOT_FOUND).json()
            return
        }

        if (user.id !== userId) {
            res.status(StatusCodes.UNAUTHORIZED).json({})
            return
        }

        const wishlistItem = await wlService.addToWishlist(carId, user);

        if (wishlistItem === 404) {
            res.status(404).json({ wishlistItem: {}, message: "An error happened" })
        } else {
            res.status(200).json({ wishlistItem, message: "Success" })
        }
    }
}

function removeFromWishlist(userService: UserService, wlService: WishlistService) {
    return async function (req, res, next) {
        const wishlistItemEID = req.params.wishlistItemEID

        const removeResult = await wlService.removeFromWishlist(wishlistItemEID)

        if (removeResult.affected !== 0) {
            res.status(200).json({ message: "Success" })
        } else {
            res.status(404).json({ message: "Error" })
        }
    }
}

function wishlistRouter() {
    const router = Router()

    const userService = new UserService()
    const categoryService = new CategoryService()
    const carService = new CarService(categoryService)
    const wishlistService = new WishlistService(userService,carService);

    router.get("/:userId",getWishlist(userService,wishlistService));
    router.post("/:userId/add/:carId", addToWishlist(userService, wishlistService))
    router.post("/:userId/remove/:wishlistItemEID", removeFromWishlist(userService, wishlistService))


    return router
}

export default wishlistRouter
