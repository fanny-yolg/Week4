const list = require('../model/todoList');

class View {
    static message(msg){
        console.log(msg);
    };
    static list(data){
        data.forEach(el =>
            console.log(`${el.id}. ${el.tag} ${el.task}`));
    };
};
module.exports = View;