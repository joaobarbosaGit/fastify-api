import { CountToDoByStatusUseCase } from "useCases";

class CountToDoByStatusController {
    async handle(completed: boolean): Promise<Object> {
        const countToDoByStatusUseCase = new CountToDoByStatusUseCase();
        return { count: await countToDoByStatusUseCase.execute(completed) };
    }
}

export { CountToDoByStatusController };