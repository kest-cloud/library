const express = require('express');
const libController = require ('../controllers/libcontroller');


//routes
const router  = express.Router();

//router.param('id', tourController.checkID);


router
.route('/')
.get(libController.getAllBooks)
.post(libController.createBook);

router
.route('/:id')
.get(libController.getBooks)
.patch(libController.updateBook)
.delete(libController.deleteBook);



module.exports = router;