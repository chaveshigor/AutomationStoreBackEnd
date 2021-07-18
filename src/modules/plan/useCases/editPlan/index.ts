import { EditPlanController } from './editPlanController';
import { EditPlanUseCase } from './editPlanUseCase';

const editPlanUseCase = new EditPlanUseCase();
const editPlanController = new EditPlanController(editPlanUseCase);

export { editPlanController };
