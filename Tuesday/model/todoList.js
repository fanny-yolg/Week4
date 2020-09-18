const fs = require('fs');
class Todo {
    constructor(id, task, status, tag, created_at, completed_at){
        this.id = id;
        this.task = task;
        this.status = status;
        this.tag = tag;
        this.created_at = created_at;
        this.completed_at = completed_at;
    }
    static help(cb){
        callback((err,data) => {
            if (err){
                cb(err, null)
            } else {
                let arr = ['node todo.js', 'node todo.js help', 'node todo.js list', 'node todo.js add <task>', 'node todo.js update <id> <task>', 'node todo.js delete <id>', 'node todo.js complete <id>', 'node todo.js uncomplete <id>'];
                cb(null, arr);
            }
        })        
    }
    static datas(){
        fs.readFileSync('./data.json', 'utf8', (err, data) => {
            if (err){
                cb (err, null)
            } else {
                const parseData = JSON.parse(data);

                let tempData = [];
                parseData.forEach(element => {
                const { id, task, status, tag, created_at, completed_at } = element
                tempData.push(new Todo (id, task, status, tag, new Date(created_at), completed_at))
                });
            cb (null, tempData);
            }
        })  
    };
    static list(cb){
        this.datas((err,data) => {
            if(err){
                cb(err, null)
            } else {
                data.forEach(elm => {
                    if (elm.status === false){
                        elm.tag = '[X]'
                    } else {
                        elm.tag = '[ ]'
                    }
                })
            cb(null, data);
            }
        })
    };
    static add(params,cb){
        this.datas((err,data) => {
            if(err){
                cb(err,null)
            } else {
                const [task] = params;

                let nextId = data[data.length-1].id + 1;
                let tempObj = {
                    id : nextId,
                    task : task,
                    status : false,
                    tag : [],
                    created_at: new Date(),
                    completed_at: null
                    };
            data.push(tempObj);
            this.save(data);
            cb(null, `${task} has been created`);
            }
        })
    };
    static delete(params,cb){
        this.datas((err,data) => {
            if(err){
                cb(err,null)
            } else {
                const tempData = todoList.filter(todo => todo.id !== id)
                if (todoList.length === tempData.length){ 
                    cb(null,`id ${id} has not found`)
                } else {
                    let tempObj = '';
                    todoList.forEach(el => {
                        if (el.id === id ){
                            tempObj = el.task;
                        }
                    })
            this.save(tempData);
            cb(null,`${tempObj} has been removed`) 
                }        
            }
        });
    }
    static update(params,cb){     
        this.datas((err, data) => {
            if (err) {
                cb(err,null)
            } else {
                const id = Number(params[0]);
                const task = params[1];
                const beforeUpdate = todoList[id-1].task

                todoList.forEach(todo => {
                    if(todo.id === id){
                        todo.task = task
                    }  
                })
        this.save(todoList);
        cb(null,`${beforeUpdate} has been change to ${task}`);
            }
        })        
    }
    static complete(params,cb){
        this.datas((err,data) => {
            if(err) {
                cb(err,null)
            } else {
                const id = Number(params[0]);
        
                const beforeComplete = todoList[id-1].task

                todoList.forEach(todo => {
                    if (todo.id === id){
                        todo.status = true;
                        todo.completed_at = new Date();
                    }
                })
        this.save(todoList);
        cb(null, `${beforeComplete} has been completed`);
            }
        });
    }

    static uncomplete(params,cb){
        this.datas((err,data) => {
            if(err){
                cb(err,null)
            } else {
                const id = Number(params[0]);

                const beforeUncomplete = todoList[id-1].task
                todoList.forEach(todo => {
                    if (todo.id === id){
                        todo.status = false;
                        todo.completed_at = null;
                    };
                });
        this.save(todoList);
        cb(null, `${beforeUncomplete} has been uncompleted`); 
            }
        });
    }

    static save(data){
        fs.writeFileSync('./data.json', JSON.stringify(data, null,2));
    }
}

module.exports = Todo;