import { WebSocketServer } from "adapters";
import { ToDoRepository } from "repositories";

class DeleteManyToDoUseCase {
    private toDoRepository: ToDoRepository;
    constructor() {
        this.toDoRepository = new ToDoRepository();
    }

    async execute(ids: string[]): Promise<void> {
        const toDo = await this.toDoRepository.deleteMany(ids);
        const webSocket = new WebSocketServer();
        webSocket.sendMessage({
            message: "new toDo(s) deleted",
            data: ids
        });
        return toDo;
    }
}

export { DeleteManyToDoUseCase };