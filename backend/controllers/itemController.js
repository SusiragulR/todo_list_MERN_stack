const mongoose = require('mongoose');
const itemModel = require('../models/ItemModel')

const createItem = async(req, res) =>{

    const {id, checked, todo} = req.body;

    try {
        const newItem = await itemModel.create({checked, todo})
        res.status(200).json(newItem)
    } catch (err) {
        res.status(400).json({error: err.message })
    }
}

const getAllItems = async(req, res) =>{

    try {
        const items = await itemModel.find({})
        res.status(200).json(items)
    } catch (err) {
        res.status(400).json({error: err.message })
    }
}

const getSingleItem = async(req, res) =>{

    const {id} = req.params

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({message: 'Item not found....'})
    }
    try {
        const item = await itemModel.findById(id)
        res.status(200).json(item)
    } catch (err) {
        res.status(400).json({error: err.message })
    }
}

const updateItem =  async(req, res) =>{
    const {id} = req.params

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({message: 'Item not found....'})
    }
    try {
        const item = await itemModel.findByIdAndUpdate(id,{...req.body})
    } catch (err) {
        res.status(400).json({error: err.message })
    }
}

const deleteItem = async(req, res)=>{
    const {id} = req.params

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({message: 'Item not found....'})
    }
    try {
        const item = await itemModel.findByIdAndDelete(id)
    } catch (err) {
        res.status(400).json({error: err.message })
    }

}

module.exports = { createItem, getAllItems, getSingleItem, updateItem, deleteItem }