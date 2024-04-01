import { IToDo } from "entities";
import { WebSocketServer } from "adapters";
import { ToDoRepository } from "repositories";
import { IUpdateStatusOneDTO } from "interfaces";

class UpdateOneBodyToDoUseCase {
    private toDoRepository: ToDoRepository;
    constructor() {
        this.toDoRepository = new ToDoRepository();
    }

    async execute(data: IUpdateStatusOneDTO): Promise<IToDo> {
        const toDo = await this.toDoRepository.updateBodyOne(data);
        const webSocket = new WebSocketServer();
        webSocket.sendMessage({
            message: "new toDo body updated",
            data: data
        });
        return toDo;
    }
}

export { UpdateOneBodyToDoUseCase };