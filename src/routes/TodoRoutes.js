import express from 'express'
import { addTodo, getTodos, deleteTodo, todoCompleted, updateTodo, deleteAllTodos } from '../Controller/todoController.js';

const route = express.Router();

route.post('/addtodo', addTodo);
route.get('/getTodos/:username', getTodos);
route.delete('/deleteTodo/:id', deleteTodo);
route.put('/todoCompleted/:id', todoCompleted);
route.put('/updateTodo/:id', updateTodo);
route.delete('/deleteAllTodos/:username', deleteAllTodos);

export default route;