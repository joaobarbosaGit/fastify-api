import { IUpdateStatusManyDTO } from "interfaces";
import { UpdateManyStatusToDoUseCase } from "useCases";

class UpdateManyStatusToDoController {
    async handle(data: IUpdateStatusManyDTO): Promise<void> {
        const updateManyStatusToDoUseCase = new UpdateManyStatusToDoUseCase();
        return updateManyStatusToDoUseCase.execute(data);
    }
}

export { UpdateManyStatusToDoController };