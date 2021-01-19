const mongoose = require('mongoose');


const bookSchema = new mongoose.Schema ({
    name: {
        type: String,
        required: [true,  'A book must have a name'],
        unique: true,
        trim: true
    },
    author:{ 
        type:String,
        required:[true, 'A book must have an author']
    },
    pages:{
        type: Number,
        required:[true, 'A book must have pages']
    },
    genre: {
        type:  String,
    },
    
    rentFee: {
        type: Number,
        required: [true, 'A book must have a rent fee'] 
    },
    
    rentDates: [Date]
     
});

const Book = mongoose.model('Book', bookSchema);


module.exports = Book;