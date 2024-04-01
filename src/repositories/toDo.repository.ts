import { IQuery, IToDoDTO, IToDoRepository, IUpdateStatusManyDTO, IUpdateStatusOneDTO } from "interfaces";
import ToDoSchema, { IToDo } from "../entities/ToDo";

class ToDoRepository implements IToDoRepository {
    async createOne(data: IToDoDTO): Promise<IToDo> {
        const result = await ToDoSchema.create({
            body: data.body,
            completed: data.completed,
            completedAt: data.completedAt,
        });
        return result;
    }

    async showAll(query: IQuery): Promise<IToDo[]> {
        // @ts-ignore
        return await ToDoSchema.find().sort(query.sort).limit(query.limit);
    }

    async updateBodyOne(data: IUpdateStatusOneDTO): Promise<IToDo> {
        const ToDo = await ToDoSchema.findOneAndUpdate({ _id: data.id }, { body: data.body })
        if (!ToDo) throw new Error("ToDo Not Found");
        return ToDo;
    }

    async updateStatusOne(data: IUpdateStatusOneDTO): Promise<IToDo> {
        const ToDo = await ToDoSchema.findOneAndUpdate({ _id: data.id }, { completed: data.completed })
        if (!ToDo) throw new Error("ToDo Not Found");
        return ToDo;
    }

    async updateStatusMany(data: IUpdateStatusManyDTO): Promise<void> {
        const ToDo = await ToDoSchema.find({ _id: { $in: data.ids } })
        if (!ToDo) throw new Error("ToDo(s) Not Found");
        await ToDoSchema.updateMany({ _id: { $in: data.ids } }, { completed: data.completed })
    }

    async countByStatus(completed: boolean): Promise<number> {
        const countToDo = await ToDoSchema.countDocuments({ completed: completed });
        if (!countToDo) throw new Error("ToDo(s) Not Found");
        return countToDo;
    }

    async deleteMany(ids: string[]): Promise<void> {
        const ToDo = await ToDoSchema.find({ _id: { $in: ids } })
        if (!ToDo) throw new Error("ToDo(s) Not Found");
        await ToDoSchema.deleteMany({ _id: { $in: ids } }, {})
    }

    async deleteOne(id: string): Promise<IToDo> {
        const ToDo = await ToDoSchema.findOneAndDelete({ _id: id })
        if (!ToDo) throw new Error("ToDo Not Found");
        return ToDo;
    }
}

export { ToDoRepository };