// const book = require('../../db/models/book');
const book = require('../db/models/book');
const AppError = require('../utils/apperror');
const catchAsync = require('../utils/catchAsync');


const addbook = catchAsync(async(req,res,next)=>{

        console.log(req.body);
        // const {name,subject,auther,publisher,copies} = req.body;
        // const data = Object.entries(req.body);
        const data = req.body;
        if( data == undefined || data == null){
            return res.render('pages/books',{message:"please give a book details"});
            // return next(new AppError("please enter they all body value",401));
        }
        const bookname_exist = await book.findAll({where:{bookname:data.bookname}});
        if(bookname_exist){
            return res.render('pages/books',{message:"Book name already exsiste"});
            // return next(new AppError("this book is already present",401));
        }

        // console.log(data.copies);
        const result = await book.create({
            isbn:data.isbn,
            bookname:data.bookname,
            subject:data.subject,
            auther:data.auther,
            publisher:data.publisher,
            copies:data.copies
        });
        console.log(result);

        if(!result){
            res.render('pages/books',{result,message:"fail to create new book"});
            return next(new AppError("failed to create ther new book",400));
        }

        return res.render('pages/books',{result,message:"Book added successfully :"});

});

const showbook = async(req,res)=>{
        try{
            const books = await book.findAll();
            const data = Object.entries(books);
            res.json(books);
        }catch(err){

        }
}

module.exports = {
    addbook,
    showbook

}