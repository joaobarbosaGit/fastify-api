import { DeleteManyToDoUseCase } from "useCases";

class DeleteManyToDoController {
    async handle(ids: string[]): Promise<void> {
        const deleteManyToDoUseCase = new DeleteManyToDoUseCase();
        return deleteManyToDoUseCase.execute(ids);
    }
}

export { DeleteManyToDoController };