import { IToDo } from "entities";
import { IUpdateStatusOneDTO } from "interfaces";
import { UpdateOneBodyToDoUseCase } from "useCases";

class UpdateOneBodyToDoController {
    async handle(data: IUpdateStatusOneDTO): Promise<IToDo> {
        const updateOneBodyToDoUseCase = new UpdateOneBodyToDoUseCase();
        return updateOneBodyToDoUseCase.execute(data);
    }
}

export { UpdateOneBodyToDoController };