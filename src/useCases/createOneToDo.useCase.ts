import { IToDo } from "entities";
import { IToDoDTO } from "interfaces";
import { WebSocketServer } from "adapters";
import { ToDoRepository } from "repositories";

class CreateOneToDoUseCase {
    private toDoRepository: ToDoRepository;
    constructor() {
        this.toDoRepository = new ToDoRepository();
    }

    async execute(data: IToDoDTO): Promise<IToDo> {
        const toDo = await this.toDoRepository.createOne(data);
        const webSocket = new WebSocketServer();
        webSocket.sendMessage({
            message: "new toDo created",
            data: toDo
        });
        return toDo;
    }
}

export { CreateOneToDoUseCase };