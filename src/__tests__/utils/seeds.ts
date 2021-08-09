import { Company } from '../../models/Company';
import { Plan } from '../../models/Plan';

const planSeed = (): Plan => ({
  name: 'rd-d2',
  price: 50,
});

const companySeed = (plan_id: string):Company => ({
  name: 'automation store s.a',
  CNPJ: '123.456.789-10',
  fantasy_name: 'a-s s.a',
  adress: 'rua 10',
  phone: '21123654879',
  email: 'automationstore@mail.com',
  plan_id,
});

export { planSeed, companySeed };
