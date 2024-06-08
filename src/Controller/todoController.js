import Todo from '../Model/Todo.js'

export const addTodo = async (req, res) => {
    try {
        const todo = req.body;
        const newTodo = new Todo(todo);
    
        await newTodo.save();
    
        return res.status(200).json({newTodo, message : "Todo saved Successfully"})
    } catch (error) {
        return res.status(500).json({message : error.message})
    }
}

export const getTodos = async (req, res) => {
    try {
        const username = req.params.username;
        console.log(username)

        const Todos = await Todo.find({username : username})

        return res.status(200).json({todos : Todos, message : "Sent successfully"})
    } catch (error) {
        return res.status(500).json({message : error.message})
    }
}

export const deleteTodo = async (req, res) => {
    try {
        const todo = await Todo.findByIdAndDelete(req.params.id);

        if(!todo){
            return res.status(400).json({Message : "Todo doesn't exist"});
        }
        return res.status(200).json({Message : "Todo Deleted", todo : req.params.id});
    } catch (error) {
        return res.status(200).json({message : error.message})
    }
}

export const todoCompleted = async (req, res) => {
    try {
        const todo = await Todo.findById(req.params.id);
        if(!todo){
            return res.status(400).json({message : "Todo not found"});
        }
        const updatedtodo = await Todo.findByIdAndUpdate(req.params.id, {$set :  { completed: req.body.completed } })
        
        return res.status(200).json({updatedtodo, message : "Todo updated!"})
    } catch (error) {
        return res.status(200).json({message : error.message})
    }
}

export const updateTodo = async (req, res) => {
    try {
        const todo = await Todo.findById(req.params.id);
        if(!todo){
            return res.status(400).json({message : "Todo not found"});
        }
        const updatedtodo = await Todo.findByIdAndUpdate(req.params.id, {$set :  { todoData: req.body.todoData } })
        
        return res.status(200).json({updatedtodo, message : "Todo updated!"})
    } catch (error) {
        return res.status(200).json({message : error.message})
    }
}

export const deleteAllTodos = async (req, res) => {
    const user_username = req.params.username;
    try {
        await Todo.deleteMany({ username : user_username });

        res.status(200).json({ message: 'All user todos deleted on signout' });
    } catch (error) {
        console.error('Error deleting user todos:', error);
        res.status(500).json({ error: 'An error occurred while deleting user todos', message : "Couldn't delete todos" });
    }

}