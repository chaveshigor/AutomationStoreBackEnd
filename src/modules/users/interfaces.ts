interface IRequestCreateUser {
    first_name: string
    last_name: string
    email: string
    password: string
    company_id: string
    admin: boolean
}

interface IRequestChangeRole {
    user_changer: string
    user_to_change_role: string
}

export { IRequestCreateUser, IRequestChangeRole };
