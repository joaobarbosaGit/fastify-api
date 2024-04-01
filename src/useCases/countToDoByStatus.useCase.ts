import { ToDoRepository } from "repositories";

class CountToDoByStatusUseCase {
    private toDoRepository: ToDoRepository;
    constructor() {
        this.toDoRepository = new ToDoRepository();
    }

    async execute(completed: boolean): Promise<number> {
        const toDos = await this.toDoRepository.countByStatus(completed);
        return toDos;
    }
}

export { CountToDoByStatusUseCase };