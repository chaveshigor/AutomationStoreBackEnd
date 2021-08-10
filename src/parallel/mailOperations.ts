import { ITransporters } from './mailOperationsInterfaces';
import { Correios } from './transporters/correios';

const transporters: ITransporters = {
  correios: new Correios(),
};

export { transporters };
