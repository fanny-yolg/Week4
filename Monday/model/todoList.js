const fs = require('fs');

class Todo {
    constructor(id, task, status, tag, created_at, completed_at){
        this.id = id;
        this.task = task;
        this.status = status;
        this.tag = tag;
        this.created_at = created_at;
        this.completed_at = completed_at;
    };

    static help(){
        let arr = ['node todo.js', 'node todo.js help', 'node todo.js list', 'node todo.js add <task>', 'node todo.js update <id> <task>', 'node todo.js delete <id>', 'node todo.js complete <id>', 'node todo.js uncomplete <id>'];
        return arr;
    };

    static datas(){
        const data = fs.readFileSync('./data.json', 'utf8')
        const parseData = JSON.parse(data);

        let tempData = [];
        parseData.forEach(element => {
            const { id, task, status, tag, created_at, completed_at } = element
            tempData.push(new Todo (id, task, status, tag, new Date(created_at), completed_at))
        })
        return tempData;
    };

    static list(){
        const todoList = this.datas();
        todoList.forEach(elm => {
            if (elm.status === false){
                elm.tag = '[X]'
            } else {
                elm.tag = '[ ]'
            }
        });
        return todoList;
    };

    static add(params){
        const todoList = this.datas();
        const [task] = params;

        let nextId = todoList[todoList.length-1].id + 1;
        let tempObj = {
            id : nextId,
            task : task,
            status : false,
            tag : [],
            created_at: new Date(),
            completed_at: null
        };
        todoList.push(tempObj);
        this.save(todoList);
        return `${task} has been created`
    };

    static delete(params){
        const todoList = this.datas();
        const id = Number(params[0]);

        const tempData = todoList.filter(todo => todo.id !== id)
        let check = false
        if (todoList.length === tempData.length){ 
            check = true;
        } if (check) {
            return `id ${id} has not found`
        } else {
            let tempObj = '';
            todoList.forEach(el => {
                if (el.id === id ){
                    tempObj = el.task;
                }
            })
            this.save(tempData);
            return `${tempObj} has been removed` 
        }        
    };
    static update(params){
        const todoList = this.datas();
        const id = Number(params[0]);
        const task = params[1];
        const beforeUpdate = todoList[id-1].task

        todoList.forEach(todo => {
            if(todo.id === id){
                todo.task = task
            }  
        })
        this.save(todoList);
        return `${beforeUpdate} has been change to ${task}`;     
    };

    static complete(params){
        const todoList = this.datas();
        const id = Number(params[0]);
        
        const beforeComplete = todoList[id-1].task

        todoList.forEach(todo => {
            if (todo.id === id){
                todo.status = true;
                todo.completed_at = new Date();
            }
        })
        this.save(todoList);
        return `${beforeComplete} has been completed`;
    };
    static uncomplete(params){
        const todoList = this.datas();
        const id = Number(params[0]);

        const beforeUncomplete = todoList[id-1].task
        todoList.forEach(todo => {
            if (todo.id === id){
                todo.status = false;
                todo.completed_at = null;
            };
        });
        this.save(todoList);
        return `${beforeUncomplete} has been uncompleted`;
    };

    static save(data){
        fs.writeFileSync('./data.json', JSON.stringify(data, null,2));
    };
};

module.exports = Todo;