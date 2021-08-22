import { Plan } from '../../models/Plan';
import { Transporter } from '../../models/Transporter';
import { User } from '../../models/User';
import { PlansRepositoryInMemory } from '../../modules/plan/repositories/plansRepositoryInMemory';
import { ShippedProductsRepositoryInMemory } from '../../modules/shippedProduct/repositories/shippedProductsRepositoryInMemory';
import { CreateProductUseCase } from '../../modules/shippedProduct/useCases/createProduct/createProductUseCase';
import { DeleteProductUseCase } from '../../modules/shippedProduct/useCases/deleteProduct/deleteProductUseCase';
import { ListUserProductsUseCase } from '../../modules/shippedProduct/useCases/listUserProducts/listUserProducsUseCase';
import { TransportersRepositoryInMemory } from '../../modules/transporter/repositories/TransporterRepositoryInMemory';
import { UsersRepositoryInMemory } from '../../modules/users/repositories/UsersRepositoryInMemory';
import {
  planSeed, productSeed, transporterSeed, userSeed,
} from '../utils/seeds';

// Repositories
let shippedProductRepository: ShippedProductsRepositoryInMemory;
let plansRepository: PlansRepositoryInMemory;
let transportersRepository: TransportersRepositoryInMemory;
let usersRepository: UsersRepositoryInMemory;

// UseCases
let createProductUseCase: CreateProductUseCase;
let listUserProducts: ListUserProductsUseCase;
let deleteProductUseCase: DeleteProductUseCase;

// Models
let plan: Plan;
let transporter: Transporter;
let user: User;

describe('shipped products features', () => {
  beforeEach(async () => {
    // Repositories
    shippedProductRepository = new ShippedProductsRepositoryInMemory();
    plansRepository = new PlansRepositoryInMemory();
    usersRepository = new UsersRepositoryInMemory();
    transportersRepository = new TransportersRepositoryInMemory();

    // Use Cases
    createProductUseCase = new CreateProductUseCase(shippedProductRepository);
    listUserProducts = new ListUserProductsUseCase(shippedProductRepository, usersRepository);
    deleteProductUseCase = new DeleteProductUseCase(shippedProductRepository);

    // Seeds
    plan = await planSeed(plansRepository, true);
    transporter = await transporterSeed(transportersRepository, 'Correios', true);
    user = await userSeed(usersRepository, plan.id as string, true);
  });

  it('should create a new shipped product', async () => {
    const product = await productSeed(
      shippedProductRepository, transporter.id as string, user.id as string,
    );
    const new_product = await createProductUseCase.execute(product);

    expect(new_product).toHaveProperty('id');
    expect(new_product.name).toBe('taco de sinuca');
  });

  it('should not create a product that already exists', async () => {
    const product = await productSeed(
      shippedProductRepository, transporter.id as string, user.id as string,
    );
    await createProductUseCase.execute(product);
    let status = false;
    let errorMessage = '';
    try {
      await createProductUseCase.execute(product);
      status = true;
    } catch (error) {
      errorMessage = error.message;
    }

    expect(status).toBe(false);
    expect(errorMessage).toBe('product already exists');
  });

  it('should list all products from user', async () => {
    const product = await productSeed(
      shippedProductRepository, transporter.id as string, user.id as string,
    );
    await createProductUseCase.execute(product);
    const products = await listUserProducts.execute(user.id as string);

    expect(products.length).toBe(1);
  });

  it('should delete a product', async () => {
    const product = await productSeed(
      shippedProductRepository, transporter.id as string, user.id as string, true,
    );
    await deleteProductUseCase.execute(product.id as string, user.id as string);
    const listOfProducts = await shippedProductRepository.findAllByUser(user.id as string);

    expect(listOfProducts.length).toBe(0);
  });

  it('should not delete a product that not exists', async () => {
    const status = false;
    let errorMessage = '';

    try {
      await deleteProductUseCase.execute('wrong id', user.id as string);
    } catch (error) {
      errorMessage = error.message;
    }

    expect(status).toBe(false);
    expect(errorMessage).toBe('product not found');
  });
});
