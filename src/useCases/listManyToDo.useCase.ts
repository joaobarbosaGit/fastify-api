import { IToDo } from "entities";
import { IQuery } from "interfaces";
import { ToDoRepository } from "repositories";

class ListManyToDoUseCase {
    private toDoRepository: ToDoRepository;
    constructor() {
        this.toDoRepository = new ToDoRepository();
    }

    async execute(query: IQuery): Promise<IToDo[]> {
        const toDos = await this.toDoRepository.showAll(query);
        return toDos;
    }
}

export { ListManyToDoUseCase };