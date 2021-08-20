interface IRequestCreateUser {
    first_name: string
    last_name: string
    email: string
    password: string
    plan_id: string
}

interface IRequestChangePlan {
    user_id: string
    new_plan_id: string
}

export { IRequestCreateUser, IRequestChangePlan };
