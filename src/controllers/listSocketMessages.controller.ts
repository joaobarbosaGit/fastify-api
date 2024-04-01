import { ListSocketMessagesUseCase } from "useCases";

class ListSocketMessagesController {
    async handle(): Promise<void> {
        const listSocketMessagesUseCase = new ListSocketMessagesUseCase();
        return listSocketMessagesUseCase.execute();
    }
}

export { ListSocketMessagesController };