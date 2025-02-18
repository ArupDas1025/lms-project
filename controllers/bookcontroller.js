// const book = require('../../db/models/book');
const book = require('../db/models/book');
const AppError = require('../utils/apperror');
const catchAsync = require('../utils/catchAsync');
const { Op, where } = require('sequelize');



const addbook = catchAsync(async(req,res,next)=>{

        console.log(req.body);
        // const {name,subject,auther,publisher,copies} = req.body;
        // const data = Object.entries(req.body);
        const data = req.body;
        if( data == undefined || data == null){
            return res.render('pages/books',{message:"please give a book details"});
            // return next(new AppError("please enter they all body value",401));
        }
        const bookname_exist = await book.findAll({where: {
            [Op.or]: [
                { bookname: data.bookname },
                { isbn: data.isbn }
            ]
        }
        });
        if(bookname_exist.length > 0){
            return res.render('pages/books',{message:"Book already exsiste"});
            // return next(new AppError("this book is already present",401));
        }

        // console.log(data.copies);
        const result = await book.create({
            isbn:data.isbn,
            bookname:data.bookname,
            subject:data.subject,
            author:data.author,
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

const showbook = catchAsync(async(req,res)=>{
        try{
            const result = await book.findAll();
            // const data = Object.entries(books);
            // console.log(books);
            return res.render('pages/showbooks',{result,message:"Show Book successfully :"});


            // res.json(books);
        }catch(err){

        }
});

const updatebookpage = catchAsync(async(req,res,next)=>{
    try{
        console.log(req.body.bin);

        const data = req.body;
        if(!data || !data.bin) {
            return res.render('pages/books',{message:"Please give a book details to update."});
        }
        // return res.render('pages/books',{message:"please give a book details"});
        const existingbook = await book.findOne({
            where:{
                [Op.or]:[
                            {bookname:data.bin},
                            {isbn:data.bin}
                        ]
                        }
        });
        console.log(existingbook)

        if(!existingbook){
            return res.render('pages/books',{message: "Book not found to update."});
        }

        console.log(existingbook);
        return res.render('form/update',{ title: 'UPDATE BOOK:' ,message : '* Edit Book Details Carefully ' , book:existingbook});

    }catch(err){
        console.error(err);
        res.render('pages/sh', { message: "Error loading book details." });
    }
});



// Controller to handle form submission
// const updatebook = catchAsync(async (req, res, next) => {
//     try {
//         // const bookname = req.params.bookname;
//         const data = req.body;
//         console.log(data);

//         // Find book by name
//         // const existingBook = await book.findOne({ where: { bookname } });

//         // if (!existingBook) {
//         //     return res.render('pages/update', { message: "Book not found." });
//         // }

//         // Update the book details
//         const updatedata={
//             isbn: data.isbn,
//             bookname:data.bookname ,
//             subject: data.subject ,
//             auther: data.auther ,
//             publisher: data.publisher ,
//             copies: data.copies
//         };

//         await book.update(updatedata,{
//             where:{
//                 [Op.or]:[
//                             {bookname:data.isbn},
//                             {isbn:data.bookname}
//                         ]
//                         }
//         });

//         return res.render('pages/books', {message: "Book updated successfully!" });
//     } catch (err) {
//         console.error(err);
//         res.render('pages/books', { message: "Failed to update book." });
//     }
// });

const updatebook = catchAsync(async (req, res, next) => {
    try {
        // Extract data from request body
        const data = req.body;
        console.log(data);

        // Check if bookname or ISBN is provided
        if (!data.bookname && !data.isbn) {
            return res.render('pages/update', { message: "Please provide either a Book Name or ISBN to update." });
        }

        // Find the book by bookname or isbn
        const existingBook = await book.findOne({
            where: {
                [Op.or]: [
                    { bookname: data.bookname },
                    { isbn: data.isbn }
                ]
            }
        });

        // If the book does not exist
        if (!existingBook) {
            return res.render('pages/books', { message: "Book not found for update." });
        }

        console.log("Existing Book found:", existingBook);
        console.log(existingBook.author)

        // Prepare update data (if any field is missing, we use existing book data)
        const updateData = {
            isbn: data.isbn || existingBook.isbn,
            bookname: data.bookname || existingBook.bookname,
            subject: data.subject || existingBook.subject,
            author: data.author || existingBook.author,
            publisher: data.publisher || existingBook.publisher,
            copies: data.copies || existingBook.copies
        };

        // Perform the update
        await book.update(updateData, {
            where: {
                [Op.or]: [
                    { bookname: data.bookname },
                    { isbn: data.isbn }
                ]
            }
        });

        // Render the updated book details and success message
        return res.render('pages/books', {
            message: "Book updated successfully!",
            book: updateData // passing the updated data to the form for display
        });

    } catch (err) {
        console.error(err);
        res.render('pages/books', { message: "Failed to update book." });
    }
});

const deletepage = catchAsync(async(req,res,next)=>{
    try{
    console.log(req.body.bin);

    const data = req.body;
    if(!data || !data.bin ){
        return res.render('pages/book',{message:"please give book details for delete ."});
    };

    const existingBook = await book.findOne({
        where :{
            [Op.or]:[
                {bookname:data.bin},
                {isbn:data.bin}
            ]
        }
    });

    console.log(existingBook);

    if(!existingBook){
        return res.render('pages/books',{message:"Book not found to delete ."})
    }
    return res.render('form/deletepage',{title :'DELETE BOOK :', message : '* Check carefully Before delete the book .',book:existingBook});
    }catch(err){
        console.error(err);
        res.render('pages/books', { message: "Failed to DELETE book." });
    }

});

const deletebook = catchAsync(async(req,res,next)=>{
    try{
    console.log(req.body.isbn);

    const isbn = req.body.isbn;

    const deleted = await book.destroy({
        where:{isbn:isbn}
    });

    if(!deleted){
        return res.render('pages/books',{message:'Book not found and not delelted sucessfully'});
    };

    // return res.render('form/deletepage',{title :'DELETE BOOK', message : '* Check carefully Before delete the book .',book:existingBook});
    return res.render('pages/books',{message : 'Book Deleted Successfully .'});
    }catch(err){
        console.error(err);
        res.render('pages/books', { message: "Failed to DELETE book." });
    }

});



module.exports = {
    addbook,
    showbook,
    updatebookpage,
    updatebook,
    deletepage,
    deletebook

}