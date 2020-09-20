const { Books } = require('../models');

class BookController {
    static getList(req, res) {
        Books.findAll()
            .then(result => {
                // console.log(result);
                res.render('book.ejs', { books : result })
            })
            .catch(err => {
                console.log(err);
            })
    }
    static addFormBook(req, res) {
        res.render('addBook.ejs');
    }

    static addBook(req,res) {
        const { title, author, release_date, pages, genre } = req.body
        Books.create({
            title,
            author,
            release_date,
            pages,
            genre
        })
        .then(result => {
            res.redirect('/books')
        })
        .catch(err => {
            res.send(err)
        })
    }

    static deleteBook(req, res) {
        const id = req.params.id;
        Books.destroy({
            where: { id }
        })
        .then(() => {
            // res.send("Deleted")
            res.redirect('/books')
        })
        .catch(err => {
            res.send(err)
        })
    }
    static updateBook(req, res) {
        const id = req.params.id;
        const { title, author, pages } = req.body
        Books.update({
            title,
            author,
            pages,
        }, {
            where: { id }
        })
        .then(result => {
            res.redirect('/books')
        })
        .catch(err => {
            res.send(err)
        })
    }
}

module.exports = BookController