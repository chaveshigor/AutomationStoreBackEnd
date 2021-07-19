interface IRequestCreateUser {
    first_name: string
    last_name: string
    email: string
    password: string
    company_id: string
    admin: boolean
}

export { IRequestCreateUser };
