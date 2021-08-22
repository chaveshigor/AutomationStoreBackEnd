import { inject } from 'tsyringe';

import { IShippedRepository } from '../../repositories/IShippedProducts';

class AnalyzeChangesUseCase {
  constructor(
        @inject('ShippedProductsRepository')
        private repo: IShippedRepository,
  ) {}

  async execute() {

  }
}

export { AnalyzeChangesUseCase };
