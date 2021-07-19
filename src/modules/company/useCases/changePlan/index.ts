import { ChangePlanController } from './changePlanController';
import { ChangePlanUseCase } from './changePlanUseCase';

const changePlanUseCase = new ChangePlanUseCase();
const changePlanController = new ChangePlanController(changePlanUseCase);

export { changePlanController };
