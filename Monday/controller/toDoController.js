const Todo = require('../model/todoList');
const View = require('../view/View');

class TodoController{
    static help(){
        const result = Todo.help();
        View.message(result);
    };
    static list(){
        const list = Todo.list();
        View.list(list);
    };
    static add(params){
        const result = Todo.add(params);
        View.message(result);
    }
    static delete(params){
        const result = Todo.delete(params);
        View.message(result);
    };
    static update(params){
        const result = Todo.update(params);
        View.message(result);
    };
    static complete(params){
        const result = Todo.complete(params);
        View.message(result);
    };
    static uncomplete(params){
        const result = Todo.uncomplete(params);
        View.message(result);
    };
}
module.exports = TodoController;