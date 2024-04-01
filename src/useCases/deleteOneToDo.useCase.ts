import { IToDo } from "entities";
import { WebSocketServer } from "adapters";
import { ToDoRepository } from "repositories";

class DeleteOneToDoUseCase {
    private toDoRepository: ToDoRepository;
    constructor() {
        this.toDoRepository = new ToDoRepository();
    }

    async execute(id: string): Promise<IToDo> {
        const toDo = await this.toDoRepository.deleteOne(id);
        const webSocket = new WebSocketServer();
        webSocket.sendMessage({
            message: "new toDo deleted",
            data: { id: id }
        });
        return toDo;
    }
}

export { DeleteOneToDoUseCase };