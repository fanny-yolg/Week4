const command = process.argv[2];
const params = process.argv.slice(3);
const toDoController = require('./controller/toDoController')

switch(command) {
    case 'help':
        toDoController.help()
        break;
    case 'list':
        toDoController.list();
        break;
    case 'add':
        toDoController.add(params);
        break;
    case 'update':
        toDoController.update(params);
        break;
    case 'delete':
        toDoController.delete(params)
        break;
    case 'complete':
        toDoController.complete(params)
        break;
    case 'uncomplete':
        toDoController.uncomplete(params)
        break;

    default: 
        console.log('Input the right format');
        break;
}

