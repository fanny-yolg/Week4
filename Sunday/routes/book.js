const { Router } = require('express');
const router = Router();
const BookController = require('../controllers/Book')

router.get('/', BookController.getList)
router.get('/add', BookController.addFormBook)
router.post('/add', BookController.addBook)
router.get('/delete/:id', BookController.deleteBook)
router.get('/edit/:id', BookController.updateBook)

module.exports = router;
