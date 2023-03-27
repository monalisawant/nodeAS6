const express = require('express')
const mongoose = require('mongoose')
const router = express.Router()
const Blog = require('../models/blogModel')


//get data 
router.get('/search/:key', async (req, res) => {
    const data = await Blog.find({
        "$or": [
            { "topic": { $regex: req.params.key } }
        ]
    })
    res.json({
        status: "Success",
        result: data
    })
})


//save data
router.post('/', async (req, res) => {
    const blog = new Blog(req.body)
    const data = await blog.save()
    res.json({
        status: "Success",
        result: data
    })
})


//update data 
router.put('/:id', async (req, res) => {
    const { id } = req.params
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'No such workout' })
    }
    const data = await Blog.findOneAndUpdate({ _id: id }, { ...req.body })
    if (!data) {
        return res.status(404).json({ error: "No such workout" })
    }
    res.json({
        status: "Success",
        result: data
    })
})

router.delete('/:id', async (req, res) => {
    const { id } = req.params
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'No such workout' })
    }

    const data = await Blog.findOneAndDelete({ _id: id })
    if (!data) {
        return res.status(404).json({ error: "No such workout" })
    }
    res.json({
        status: "Success",
        result: data
    })
})

module.exports = router  