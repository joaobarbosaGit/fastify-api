import { WebSocketServer } from "adapters";
import { ToDoRepository } from "repositories";
import { IUpdateStatusManyDTO } from "interfaces";

class UpdateManyStatusToDoUseCase {
    private toDoRepository: ToDoRepository;
    constructor() {
        this.toDoRepository = new ToDoRepository();
    }

    async execute(data: IUpdateStatusManyDTO): Promise<void> {
        const toDo = await this.toDoRepository.updateStatusMany(data);
        const webSocket = new WebSocketServer();
        webSocket.sendMessage({
            message: "new toDo(s) completed updated",
            data: data
        });
        return toDo;
    }
}

export { UpdateManyStatusToDoUseCase };