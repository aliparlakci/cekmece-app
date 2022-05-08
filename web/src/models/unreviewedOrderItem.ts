interface IUnreviewedOrderItem {
    id: string
    order: {
        id: number
        createdDate: Date
        updatedDate: Date
    }
}

export default IUnreviewedOrderItem
