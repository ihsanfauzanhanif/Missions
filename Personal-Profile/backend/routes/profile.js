const express = require('express')
const router = express.Router()
const multer = require('multer')

const ProfileController = require('../controller/ProfileController')

router.get('/all', ProfileController.all)
router.get('/:id', ProfileController.getById)
router.post('/create' , ProfileController.create)
router.patch('/edit/:id' , ProfileController.updateById)
router.delete('/delete/:id' , ProfileController.deleteById)

module.exports = router