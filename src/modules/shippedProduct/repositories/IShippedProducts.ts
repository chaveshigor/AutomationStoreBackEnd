import { ShippedProduct } from '../../../models/ShippedProduct';

interface IShippedRepository {
    create({
      name, transporter_id, user_id, mail_code, purchase_date,
    }: ShippedProduct): Promise<ShippedProduct>
    findByMailCode(name: string): Promise<ShippedProduct | undefined>
    findById(user_id: string): Promise<ShippedProduct | undefined>
    findAllByUser(user_id: string): Promise<ShippedProduct[]>
    updateProductName(product_id: string, new_name: string): Promise<ShippedProduct>
    updateProductMailCode(product_id: string, new_code: string): Promise<ShippedProduct>
    deleteProductById(product_id: string): Promise<void>
}

export { IShippedRepository };
