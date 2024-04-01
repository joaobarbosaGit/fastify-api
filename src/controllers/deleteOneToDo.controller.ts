import { IToDo } from "entities";
import { DeleteOneToDoUseCase } from "useCases";

class DeleteOneToDoController {
    async handle(ids: string): Promise<IToDo> {
        const deleteOneToDoUseCase = new DeleteOneToDoUseCase();
        return deleteOneToDoUseCase.execute(ids);
    }
}

export { DeleteOneToDoController };