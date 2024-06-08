import mongoose from 'mongoose';

const todoSchema = mongoose.Schema({
    todoData : {
        type : String,
        required : true,
    },
    username : {
        type : String,
        required : true,
    },
    completed : {
        type : Boolean,
        default : false
    }
}, {timestamps : true})

const todo = mongoose.model('todo', todoSchema);

export default todo;