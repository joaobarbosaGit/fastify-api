import { IToDo } from "entities";
import { IUpdateStatusOneDTO } from "interfaces";
import { UpdateOneStatusToDoUseCase } from "useCases";

class UpdateOneStatusToDoController {
    async handle(data: IUpdateStatusOneDTO): Promise<IToDo> {
        const updateOneStatusToDoUseCase = new UpdateOneStatusToDoUseCase();
        return updateOneStatusToDoUseCase.execute(data);
    }
}

export { UpdateOneStatusToDoController };