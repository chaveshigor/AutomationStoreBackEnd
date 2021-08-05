interface IRequestCreateClient {
    first_name: string
    last_name?: string
    email: string
    phone: string
    cpf?: string
    company_id: string
}

interface IFindOne {
    id?: string
    first_name?: string
    last_name?: string
    email?: string
    phone?: string
    cpf?: string
    company_id?: string
}

interface IUpdate {
    first_name?: string
    last_name?: string
    email?: string
    phone?: string
}

export { IRequestCreateClient, IFindOne, IUpdate };
