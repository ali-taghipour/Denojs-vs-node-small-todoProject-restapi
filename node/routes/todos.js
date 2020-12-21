const express = require("express");

const router = express.Router();

let todos = [];

router.get("/todo",(req,res,next) => {
    res.status(200).json({
        todos: todos
    })
});


router.post("/todo",(req,res,next) => {
    const newTodo = {id: new Date().toISOString(), text: req.body.text};
    todos.push(newTodo);
    res.status(200).json({
        message:"created successfully",
        todo: newTodo,
        todos: todos
    })
});


router.put("/todo/:todoId",(req,res,next) => {
    const todoId = req.params.todoId;
    todoIndex = todos.findIndex(todo => {
        return todo.id === todoId
    });
    if(todoIndex >= 0){
        todos[todoIndex] = {id: todos[todoIndex].id, text: req.body.text};
        return res.status(201).json({
            message: "updated successfully",
            todos: todos
        })
    }
    res.status(404).json({
        message: "todo not found!"
    })
});


router.delete("/todo/:todoId",(req,res,next) => {
    const todoId = req.params.todoId;
    todos = todos.filter(todo => {
        return todo.id !== todoId
    });
    res.status(200).json({
        message: "deleted sucessfully"
    });
});


module.exports = router;