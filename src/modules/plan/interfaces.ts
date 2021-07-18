interface IRequestEditPlan {
    id: string
    name: string
    price: number
}

interface IRequestCreatePlan {
    name: string,
    price: number
}

export { IRequestEditPlan, IRequestCreatePlan };
