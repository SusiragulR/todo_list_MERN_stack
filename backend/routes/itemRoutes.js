const express = require('express')
const router = express.Router()

const { createItem, getAllItems, getSingleItem, updateItem, deleteItem } = require('../controllers/itemController')

router.post('/',createItem)
router.get('/',getAllItems)
router.get('/:id',getSingleItem)
router.patch('/:id',updateItem)
router.delete('/:id',deleteItem)

module.exports = router;