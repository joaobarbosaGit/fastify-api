import { IToDo } from "entities";
import { IToDoDTO } from "interfaces";
import { CreateOneToDoUseCase } from "useCases";

class CreateOneToDoController {
    async handle(data: IToDoDTO): Promise<IToDo> {
        const createToDoUseCase = new CreateOneToDoUseCase();
        return createToDoUseCase.execute(data);
    }
}

export { CreateOneToDoController };