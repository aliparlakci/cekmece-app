import IOrderItem from "./orderItem"

interface IRefundRequest {
    id: number
    isApproved: boolean
    isRejected: boolean
    orderItem: IOrderItem
}

export default IRefundRequest