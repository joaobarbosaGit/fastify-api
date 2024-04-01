import mongoose, { Schema } from "mongoose";

export interface IToDo {
    _id: string;
    body: string;
    completed: boolean;
    completedAt: Date;
    createdAt: Date;
    updatedAt: Date;
}

const toDoSchema = new Schema<IToDo>({
    body: {
        type: String,
        required: true
    },
    completed: {
        type: Boolean,
        required: true
    },
    completedAt: {
        type: Date,
        require: true,
        default: null
    }
}, {
    timestamps: true,
    toJSON: {
        virtuals: true,
        transform: (obj, ret) => { delete ret.id }
    }
});

toDoSchema.methods = {
    show() {
        return {
            id: this.id,
            completed: this.completed,
            completedAt: this.completedAt,
            createdAt: this.createdAt,
            updatedAt: this.updatedAt,
        }
    }
}

const model = mongoose.model('ToDo', toDoSchema)
export const schema = model.schema
export default model