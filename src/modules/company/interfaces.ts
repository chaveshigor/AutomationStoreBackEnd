interface IRequestCreateCompany {
    name: string
    fantasy_name: string
    cnpj: string
    phone: string
    adress: string
    email: string
    plan_id: string
}

interface IRequestEditCompany {
    name?: string
    fantasy_name?: string
    cnpj?: string
    phone?: string
    adress?: string
    email?: string
    plan_id?: string
}

interface IRequestChangePlan {
    cnpj: string
    plan_id: string
}

export { IRequestCreateCompany, IRequestEditCompany, IRequestChangePlan };
