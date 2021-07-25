import { Product } from '../../../models/Product';
import { IRequestCreateProduct } from '../interfaces';

interface IParams {
    id?: string
    name?: string
    company_id?: string
}

interface IUpdate {
    name?: string
    price?: number
    description?: string
    id?: string
    company_id?: string
}

interface IProducsRepository {
    findOne({ id, name, company_id }: IParams): Promise<Product | undefined>
    findAllByCompanyId(company_id: string): Promise<Product[]>
    create({
      company_id, name, price, description,
    }: IRequestCreateProduct): Promise<Product>
    updateById(id: string, productData: IUpdate): Promise<Product>
    deleteById(id: string): Promise<void>
}

export { IProducsRepository, IParams, IUpdate };
