import { Transporter } from '../../models/Transporter';
import { TransportersRepositoryInMemory } from '../../modules/transporter/repositories/TransporterRepositoryInMemory';
import { CreateTransporterUseCase } from '../../modules/transporter/useCases/createTransporter/createTransporterUseCase';
import { EditTransporterNameUseCase } from '../../modules/transporter/useCases/editTransporterName/editTransporterNameUseCase';
import { transporterSeed } from '../utils/seeds';

let transportersRepository: TransportersRepositoryInMemory;
let createTransporter: CreateTransporterUseCase;
let editTransporterName: EditTransporterNameUseCase;
let transporter: Transporter;

describe('transporters features', () => {
  beforeEach(async () => {
    transportersRepository = new TransportersRepositoryInMemory();
    createTransporter = new CreateTransporterUseCase(transportersRepository);
    editTransporterName = new EditTransporterNameUseCase(transportersRepository);
    transporter = await transporterSeed(transportersRepository, 'Correios', true);
  });

  it('should create a new transporter', async () => {
    const new_transporter = await createTransporter.execute('Log');

    expect(new_transporter.name).toBe('Log');
  });

  it('should change the transporter name', async () => {
    const updated_transporter = await editTransporterName.execute(transporter.id as string, 'Log');

    expect(updated_transporter.name).toBe('Log');
  });

  it('should not change the transporter name of a transporter that dont exists', async () => {
    let status = false;
    let errorMessage = '';
    try {
      await editTransporterName.execute('random id', 'Log');
      status = true;
    } catch (error) {
      errorMessage = error.message;
    }

    expect(status).toBe(false);
    expect(errorMessage).toBe('transporter dont exists');
  });
});
