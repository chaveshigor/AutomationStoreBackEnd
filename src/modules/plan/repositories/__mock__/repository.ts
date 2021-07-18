import { v4 as uuid } from 'uuid';

interface IRequest {
    name: string
    price: number
}

interface IPlan {
    id: string
    name: string
    price: number
    created_at: Date
    updated_at: Date
}

interface IName {
    name?: string
    id?: string
}

interface IWhere {
    where: IName
}

class MockPlansRepository {
  private repository: IPlan[]

  constructor() {
    this.repository = [];
  }

  create({ name, price }: IRequest): IPlan {
    const newPlan = {
      id: uuid(),
      name,
      price,
      created_at: new Date(),
      updated_at: new Date(),
    };

    return newPlan;
  }

  save(newPlan: IPlan): Promise<IPlan> {
    return new Promise((resolve, reject) => {
      this.repository.push(newPlan);
      resolve(newPlan);
    });
  }

  findOne(params: IWhere): Promise<IPlan | undefined> {
    const { where: { name } } = params;

    return new Promise((resolve, reject) => {
      const plan = this.repository.find((plan) => plan.name === name);
      resolve(plan);
    });
  }
}

export { MockPlansRepository };
