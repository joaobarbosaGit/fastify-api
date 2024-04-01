import { IToDo } from "entities";
import { IQuery } from "./IQuery";
import { IToDoDTO } from "./ToDo.DTO";
import { IUpdateStatusManyDTO } from "./updateStatusMany.DTO";
import { IUpdateStatusOneDTO } from "./updateOneMany.DTO";

export interface IToDoRepository {
    createOne(data: IToDoDTO): Promise<IToDo>;
    showAll(query: IQuery): Promise<IToDo[]>;
    updateBodyOne(data: IUpdateStatusOneDTO): Promise<IToDo>;
    updateStatusOne(data: IUpdateStatusOneDTO): Promise<IToDo>;
    updateStatusMany(data: IUpdateStatusManyDTO): Promise<void>;
    deleteOne(id: string): Promise<IToDo>;
    deleteMany(ids: string[]): Promise<void>;
    countByStatus(completed: boolean): Promise<number>;
}