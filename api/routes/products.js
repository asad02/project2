const express = require('express');
const router = express.Router();
const multer = require('multer');
const checkAuth = require('../middleware/check-auth')
const ProductsController = require('../controllers/products');

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, './uploads/')
    },
    filename: function(req, file, cb) {
        cb(null, new Date().toISOString() + file.originalname)
    }
});

const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
        cb(null, true);
    } else {
        cb(null, false);
    }
}

const upload = multer({ 
    storage: storage, 
    limits: {
        fileSize: 1024 * 1024 * 5
    },
    fileFilter:  fileFilter
});

router.get('/', ProductsController.get_product_all);

router.post('/', checkAuth, upload.single('productImage'), ProductsController.create_a_product);

router.get('/:productId', ProductsController.get_a_product);

router.patch('/:productId', checkAuth, ProductsController.update_a_product);

router.delete('/:productId', checkAuth, ProductsController.delete_a_product);

// delete all products - just for fun
router.delete('/', ProductsController.delete_all_product);

module.exports = router;
