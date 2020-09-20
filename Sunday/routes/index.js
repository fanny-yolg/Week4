const { Router } = require('express');
const router = Router();
const BookRoutes = require('./book')

router.get('/', (req,res)=>{
    res.render('index.ejs')
    // res.send("HOME PAGE")
});

router.use('/books', BookRoutes)

module.exports = router;
