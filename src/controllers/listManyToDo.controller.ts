import { IToDo } from "entities";
import { IQuery } from "interfaces";
import { ListManyToDoUseCase } from "useCases";

class ListManyToDoController {
    async handle(query: IQuery): Promise<IToDo[]> {
        const listManyToDoUseCase = new ListManyToDoUseCase();
        return listManyToDoUseCase.execute(query);
    }
}

export { ListManyToDoController };