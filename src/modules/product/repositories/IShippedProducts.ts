import { ShippedProduct } from '../../../models/ShippedProduct';

interface IShippedRepository {
    create({
      product_name, sended_by, sended_date, status,
    }: ShippedProduct): Promise<ShippedProduct>
    findByTransporterCode(transporter_code: string): Promise<ShippedProduct | undefined>
    updateStatus(id: string, status: string): Promise<void>
    updateProduct(id: string, productData: ShippedProduct): Promise<ShippedProduct>
    listAllPending(): Promise<ShippedProduct[]>
}

export { IShippedRepository };
