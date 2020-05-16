const express = require('express');
const Book = require('../models').Book;
const router= express.Router();
const Sequelize = require('sequelize');
const paginate = require('express-paginate');
const Op = Sequelize.Op;

function asyncHandler(cb){
    return async(req, res, next) => {
      try {
        await cb(req, res, next)
      } catch(error){
        res.status(500).send(error);
      }
    }
  }

router.get('/',(req,res)=>{
    res.redirect("/books");
});

router.get('/books',asyncHandler(async (req,res)=>{
    const books = await Book.findAll({
        order:[["title"]]
      });
    const bookCount = await Book.count();
    const pageCount = Math.ceil(bookCount / req.query.limit);
    console.log(pageCount);
    //const itemCount = results.count;
    //const pageCount = Math.ceil(books.count / req.query.limit);
    res.render("index",{books,
        //pageCount,
        //itemCount,
        //pages:paginate.getArrayPages(req)(3, pageCount, req.query.page)
    });
}));

router.get('/books/search/:value',asyncHandler(async(req,res,next)=>{
    let value = req.params.value;
    const books = await Book.findAll({
        where:{
            [Op.or]:{
                title:{
                    [Op.substring]:value
                },
                author:{
                    [Op.substring]:value
                },
                genre:{
                    [Op.eq]:value
                },
                year:{
                    [Op.eq]:value
                },
            }

        },
        order:[["title"]]
      });
    res.render("index",{books});
}));

router.get('/books/new',(req,res,next)=>{
    res.render("new-book",{book:{}});
});

router.post('/books/new',asyncHandler(async (req,res)=>{

    let book;
    try{
        book = await Book.create(req.body);
        res.redirect("/books");
    }
    catch(error){
        if(error.name === "SequelizeValidationError"){
            book = await Book.build(req.body);
            res.render("new-book",{book,errors:error.errors});
        }
        else{
            throw error;
        }

    }
    //res.render("new-book");
}));

router.get('/books/:id',asyncHandler(async (req,res)=>{
    const book = await Book.findByPk(req.params.id);
    if(book){
        res.render("update-book",{book});
    }
    else{
        res.status(404).send("Not Found");
        //next();
        console.log("Status send");
    }
}));

router.post('/books/:id',asyncHandler(async (req,res)=>{
    let book;
    try{
        book = await Book.findByPk(req.params.id);
        if(book){
            await book.update(req.body);
            res.redirect("/books");
        }
        else{
            res.sendStatus(404);
            //next();
        }
    }
    catch(error){
        //console.log("In the error");
        if(error.name === "SequelizeValidationError"){
            book = await Book.build(req.body);
            book.id = req.params.id;
            res.render("update-book",{book,errors:error.errors});
        }
        else{
            throw error;
        }
    }
}));

router.post('/books/:id/delete',asyncHandler(async (req,res)=>{
    const book = await Book.findByPk(req.params.id);
    if(book){
    await book.destroy();
        res.redirect("/books");
    }
    else{
        res.sendStatus(404);
    }
}));

module.exports = router;