const fs = require ('fs');
const Book = require('../models/bookModel');



exports.getAllBooks =  async (req, res) => {
try {
    //Build the query
    //1.filtering

    const queryObj ={ ...req.query };
    const excludedFields = ['page', 'sort', 'limit', 'fields'];
    excludedFields.forEach(el => delete queryObj[el]);


    //2.Advanced Fiitering
    let queryStr =JSON.stringify(queryObj);
    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, match => `$${match}`);
    console.log(JSON.parse(queryStr));

    const query =  Book.find(JSON.parse(queryStr));

   //execute the query...
   const books = await query;

    //send response...
    res.status(200).json({
        status: 'success',
        results: books.length,
        data: {
            books
        }
    });
  } catch (err) {
      res.status(404).json({
        status: 'fail',
        message: err
      });
  }
};

exports.getBooks =  async (req, res) => {
   try {
     const book =  await Book.findById(req.params.id);
     

    res.status(200).json({
        status: 'success',
            data: {
           book
        }
    });
 } catch (err) {
     res.status(404).json({
        status:'fail',
     message: err
     });
    }
};

exports.createBook = async (req, res) => {
 
try {
   const  newBook =  await Book.create(req.body);

        res.status(201).json({
            status: 'success',
            data: {
                book: newBook
            }
        });
    } catch(err) {
        res.status(400).json({
            status: 'fail',
            message: err
        });
    };
};

exports.updateBook =  async (req, res) => {
try {

   const book = await Book.findByIdAndUpdate(req.params.id, req.body, {
       new: true,
       runValidators :true
   });

     res.status(200).json({
        status: 'success',
        data: {
            book
        }
    });
  }catch (err) {
    res.status(400).json({
        status: 'fail',
        message:'Invalid data sent!'
    });
  };
};

exports.deleteBook = async (req, res) => {    
    try {
        await Book.findByIdAndDelete(req.params.id);

    res.status(204).json({
        status: 'success',
        data: null
    })
 } catch(err) {
    res.status(400).json({
        status: 'fail',
        message:'Invalid data sent!'
    });
 };
};


