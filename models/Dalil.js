import { Schema, model } from "mongoose";

const DalilSchema = new Schema({
    type: {
        type: String,
        required: true,
        trim: true,
    },
    content: {
        type: String,
        required: true,
        trim: true,
    },
    origin: {
        type: String,
        required: true,
        trim: true,
    },
    person: {
        type: String,
        trim: true,
    },
    tag: {
        type: [String],
        required: true,
        default: undefined
    }
});

export default model('Dalil', DalilSchema);