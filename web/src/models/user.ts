import UserRoles from "./userRoles"

interface IUser {
    id: string
    displayName: string
    email: string
    role: UserRoles
}

export default IUser
