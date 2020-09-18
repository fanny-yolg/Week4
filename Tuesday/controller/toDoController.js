const Todo = require('../model/todoList');
const View = require('../view/View');

class TodoController{
    static help(){
        Todo.help((err,data) => {
            if(err){
                View.error(err);
            } else {
                View.message(data)
            }
        })
    };
    static list(){
        Todo.list((err, data) => {
            if(err) {
                View.error(err);
            } else {
                View.list(data)
            }
        })
    };
    static add(params){
        Todo.add(params, (err,data) => {
            if(err){
                View.error(err);
            } else {
                View.message(data)
            }
        })
    };
    static delete(params){
        Todo.delete(params, (err,data) => {
            if(err){
                View.error(err);
            } else {
                View.message(data)
            }
        })
    };
    static update(params){
        Todo.update(params, (err,data) => {
            if(err){
                View.error(err);
            } else {
                View.message(data)
            }
        })
    };
    static complete(params){
        Todo.complete(params, (err,data) => {
            if(err){
                View.error(err);
            } else {
                View.message(data)
            }
        })
    }
    static uncomplete(params){
        Todo.uncomplete(params, (err,data) => {
            if(err){
                View.error(err);
            } else {
                View.message(data);
            }
        })
    }
}

module.exports = TodoController;